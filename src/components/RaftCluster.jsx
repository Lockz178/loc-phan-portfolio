import { ArrowCounterClockwise, Pause, Play } from '@phosphor-icons/react'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../lib/hooks'
import { RaftCluster as Cluster, NODE_IDS } from '../lib/raft-sim'
import './RaftCluster.css'

const SIZE = 440
const CENTER = SIZE / 2
const ORBIT = 150
const NODE_R = 27
const RING_R = 35
const RING_LEN = 2 * Math.PI * RING_R
const SVG_NS = 'http://www.w3.org/2000/svg'

const POS = Object.fromEntries(
  NODE_IDS.map((id, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / NODE_IDS.length
    return [
      id,
      {
        x: CENTER + ORBIT * Math.cos(angle),
        y: CENTER - 8 + ORBIT * Math.sin(angle),
      },
    ]
  }),
)

const PAIRS = NODE_IDS.flatMap((a, i) =>
  NODE_IDS.slice(i + 1).map((b) => [a, b]),
)

const DOT_RADIUS = { append: 4.5, 'append-reply': 2.5, vote: 4.5 }

// Idle visitors still get to see a failover: crash the leader once, then
// bring it back. Any click hands control to the visitor.
const DEMO_CRASH_AFTER_MS = 8000
const DEMO_RESTART_AFTER_MS = 7000

function describe(node) {
  if (!node.alive) return 'down'
  return `${node.role} · t${node.term}`
}

export default function RaftCluster() {
  const clusterRef = useRef(null)
  if (!clusterRef.current) clusterRef.current = new Cluster()
  const cluster = clusterRef.current

  const [snap, setSnap] = useState(() => cluster.snapshot())
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  const figureRef = useRef(null)
  const dotLayerRef = useRef(null)
  const timerRefs = useRef({})
  const touchedRef = useRef(false)
  const demoRef = useRef({ phase: 'waiting', at: 0, node: null })

  useEffect(
    () => cluster.subscribe(() => setSnap(cluster.snapshot())),
    [cluster],
  )

  // Animation loop: runs only while the figure is on screen, the tab is
  // visible and the visitor has not paused it.
  useEffect(() => {
    const figure = figureRef.current
    const dotLayer = dotLayerRef.current
    const dots = new Map()
    let onScreen = false
    let frame = 0
    let last = 0

    const draw = () => {
      for (const node of cluster.nodes) {
        const ring = timerRefs.current[node.id]
        if (!ring) continue
        const left =
          node.alive && node.role !== 'leader' ? cluster.timerLeft(node) : 0
        ring.style.strokeDashoffset = String(RING_LEN * (1 - left))
      }
      const live = new Set()
      for (const m of cluster.messages) {
        live.add(m.id)
        let dot = dots.get(m.id)
        if (!dot) {
          dot = document.createElementNS(SVG_NS, 'circle')
          const denied =
            (m.type === 'vote-reply' && !m.granted) ||
            (m.type === 'append-reply' && !m.success)
          dot.setAttribute(
            'class',
            `dot dot--${m.type}${denied ? ' dot--denied' : ''}`,
          )
          dot.setAttribute('r', String(DOT_RADIUS[m.type] ?? 3.5))
          dotLayer.appendChild(dot)
          dots.set(m.id, dot)
        }
        const a = POS[m.from]
        const b = POS[m.to]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const len = Math.hypot(dx, dy)
        const inset = NODE_R + 5
        const p = Math.min(
          1,
          Math.max(0, (cluster.now - m.sentAt) / (m.arriveAt - m.sentAt)),
        )
        const d = inset + (len - 2 * inset) * p
        dot.setAttribute(
          'transform',
          `translate(${(a.x + (dx / len) * d).toFixed(1)} ${(a.y + (dy / len) * d).toFixed(1)})`,
        )
      }
      for (const [id, dot] of dots) {
        if (!live.has(id)) {
          dot.remove()
          dots.delete(id)
        }
      }
    }

    const runDemo = () => {
      const demo = demoRef.current
      if (touchedRef.current || reduced || demo.phase === 'done') return
      const leader = cluster.leader
      if (demo.phase === 'waiting') {
        if (!leader) return
        if (!demo.at) demo.at = cluster.now + DEMO_CRASH_AFTER_MS
        if (cluster.now >= demo.at) {
          cluster.crash(leader.id, ' (automatic demo)')
          demoRef.current = {
            phase: 'restarting',
            at: cluster.now + DEMO_RESTART_AFTER_MS,
            node: leader.id,
          }
        }
      } else if (demo.phase === 'restarting' && cluster.now >= demo.at) {
        cluster.restart(demo.node)
        demoRef.current = { phase: 'done', at: 0, node: null }
      }
    }

    const tick = (t) => {
      const dt = last ? Math.min(t - last, 64) : 16
      last = t
      cluster.advance(dt)
      runDemo()
      draw()
      frame = requestAnimationFrame(tick)
    }

    const sync = () => {
      const run = onScreen && !paused && document.visibilityState === 'visible'
      if (run && !frame) {
        last = 0
        frame = requestAnimationFrame(tick)
      } else if (!run && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    })
    io.observe(figure)
    document.addEventListener('visibilitychange', sync)
    draw()

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      cancelAnimationFrame(frame)
      for (const dot of dots.values()) dot.remove()
    }
  }, [cluster, paused, reduced])

  const toggleNode = useCallback(
    (id) => {
      touchedRef.current = true
      cluster.toggle(id)
    },
    [cluster],
  )

  const reset = () => {
    touchedRef.current = true
    cluster.reset()
  }

  const { leader, alive, log } = snap
  let status
  if (alive < 3) {
    status = `Only ${alive} of 5 nodes are up. Without a majority nothing can be committed.`
  } else if (leader) {
    status = `Healthy: ${leader.id} leads term ${leader.term}, ${alive} of 5 nodes up.`
  } else {
    status = 'No leader yet. Waiting for an election timeout.'
  }

  return (
    <figure className="cluster" ref={figureRef}>
      <svg className="cluster-graph" viewBox={`0 0 ${SIZE} ${SIZE - 24}`}>
        <title>Simulated five-node Raft cluster</title>
        <g>
          {PAIRS.map(([a, b]) => {
            const lit =
              leader &&
              (a === leader.id || b === leader.id) &&
              snap.nodes.find((n) => n.id === (a === leader.id ? b : a))?.alive
            return (
              <line
                key={a + b}
                className={lit ? 'edge edge--lit' : 'edge'}
                x1={POS[a].x}
                y1={POS[a].y}
                x2={POS[b].x}
                y2={POS[b].y}
              />
            )
          })}
        </g>
        <g ref={dotLayerRef} className="dots" />
        {snap.nodes.map((node) => {
          const { x, y } = POS[node.id]
          const state = node.alive ? node.role : 'down'
          const action = node.alive ? 'crash' : 'restart'
          return (
            <Fragment key={node.id}>
              {/* biome-ignore lint/a11y/useSemanticElements: SVG has no <button>; role + key handling make the node operable */}
              <g
                className={`node node--${state}`}
                transform={`translate(${x} ${y})`}
                role="button"
                tabIndex={0}
                aria-label={`Node ${node.id}, ${node.alive ? `${node.role}, term ${node.term}` : 'down'}. Press to ${action} it.`}
                onClick={() => toggleNode(node.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleNode(node.id)
                  }
                }}
              >
                <circle className="node-hit" r={RING_R + 8} />
                <circle className="node-track" r={RING_R} />
                <circle
                  ref={(el) => {
                    timerRefs.current[node.id] = el
                  }}
                  className="node-timer"
                  r={RING_R}
                  transform="rotate(-90)"
                  strokeDasharray={RING_LEN}
                  strokeDashoffset={RING_LEN}
                />
                <circle className="node-core" r={NODE_R} />
                <text className="node-id" dy="0.36em">
                  {node.id}
                </text>
                {!node.alive && (
                  <path className="node-strike" d="M-19 19 L19 -19" />
                )}
              </g>
              {/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: this <g> has no tabindex; labels sit outside the button so its accessible name stays descriptive */}
              <g
                className={`node-label node-label--${state}`}
                transform={`translate(${x} ${y})`}
                aria-hidden="true"
              >
                <text className="node-sub" y={RING_R + 20}>
                  {describe(node)}
                </text>
                <text className="node-action" y={RING_R + 20}>
                  {`${action} ${node.id}`}
                </text>
              </g>
            </Fragment>
          )
        })}
      </svg>

      <figcaption className="cluster-panel">
        <div className="cluster-head">
          <p className="cluster-title">
            Live Raft cluster
            <span className="cluster-hint">
              <span className="hint-pointer">Click</span>
              <span className="hint-touch">Tap</span> a node to crash it. Crash
              the leader and the others elect a new one.
            </span>
          </p>
          <div className="cluster-controls">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? 'Resume simulation' : 'Pause simulation'}
              title={paused ? 'Resume' : 'Pause'}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={reset}
              aria-label="Reset cluster"
              title="Reset"
            >
              <ArrowCounterClockwise size={16} />
            </button>
          </div>
        </div>
        <p className="cluster-status" aria-live="polite">
          <span
            className={`status-dot${alive < 3 ? ' status-dot--bad' : leader ? '' : ' status-dot--wait'}`}
            aria-hidden="true"
          />
          {status}
        </p>
        <ol className="cluster-log" aria-label="Recent cluster events">
          {log.slice(0, 3).map((entry) => (
            <li key={entry.id} className={`log-${entry.kind}`}>
              <span className="log-term">t{entry.term}</span>
              {entry.text}
            </li>
          ))}
          {log.length === 0 && (
            <li className="log-info">
              <span className="log-term">t0</span>
              All five nodes start as followers.
            </li>
          )}
        </ol>
      </figcaption>
    </figure>
  )
}
