// A small in-browser model of Raft leader election and heartbeats
// (Ongaro & Ousterhout, section 5.2), used by the hero demo.
// Time is virtual (ms) and slowed roughly 10x so messages are visible.
// The election timeout spread is kept wide relative to the latency spread
// so two followers rarely time out together and split the vote.

export const NODE_IDS = ['A', 'B', 'C', 'D', 'E']
const MAJORITY = Math.floor(NODE_IDS.length / 2) + 1

const HEARTBEAT_MS = 900
const ELECTION_MIN_MS = 2000
const ELECTION_MAX_MS = 4600
const LATENCY_MIN_MS = 380
const LATENCY_MAX_MS = 460
const LOG_LIMIT = 6

const between = (min, max) => min + Math.random() * (max - min)

export class RaftCluster {
  constructor() {
    this.listeners = new Set()
    this.reset()
  }

  reset() {
    this.now = 0
    this.nextId = 1
    this.messages = []
    this.log = []
    this.nodes = NODE_IDS.map((id) => ({
      id,
      role: 'follower',
      term: 0,
      votedFor: null,
      votes: new Set(),
      alive: true,
      deadline: 0,
      timeout: 1,
      nextHeartbeat: 0,
    }))
    // One node times out early so the first election is quick and clean.
    const first = Math.floor(Math.random() * this.nodes.length)
    this.nodes.forEach((n, i) => {
      this.setTimer(n, i === first ? between(500, 800) : between(2000, 3200))
    })
    this.emit()
  }

  subscribe(fn) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  emit() {
    for (const fn of this.listeners) fn()
  }

  record(text, kind, term) {
    this.log = [{ id: this.nextId++, text, kind, term }, ...this.log].slice(
      0,
      LOG_LIMIT,
    )
  }

  node(id) {
    return this.nodes.find((n) => n.id === id)
  }

  get leader() {
    return this.nodes.find((n) => n.alive && n.role === 'leader') ?? null
  }

  get aliveCount() {
    return this.nodes.filter((n) => n.alive).length
  }

  setTimer(node, ms = between(ELECTION_MIN_MS, ELECTION_MAX_MS)) {
    node.timeout = ms
    node.deadline = this.now + ms
  }

  // 0..1, how much of the election timeout is left.
  timerLeft(node) {
    return Math.min(1, Math.max(0, (node.deadline - this.now) / node.timeout))
  }

  send(from, to, type, payload) {
    const latency = between(LATENCY_MIN_MS, LATENCY_MAX_MS)
    this.messages.push({
      id: this.nextId++,
      type,
      from: from.id,
      to,
      term: from.term,
      sentAt: this.now,
      arriveAt: this.now + latency,
      ...payload,
    })
  }

  broadcast(from, type) {
    for (const peer of this.nodes) {
      if (peer.id !== from.id) this.send(from, peer.id, type)
    }
  }

  // Advance virtual time, processing timers and deliveries in order.
  advance(dt) {
    const end = this.now + dt
    let changed = false
    for (let guard = 0; guard < 400; guard++) {
      let at = end
      let next = null
      for (const m of this.messages) {
        if (m.arriveAt < at) {
          at = m.arriveAt
          next = () => this.deliver(m)
        }
      }
      for (const n of this.nodes) {
        if (!n.alive) continue
        if (n.role === 'leader') {
          if (n.nextHeartbeat < at) {
            at = n.nextHeartbeat
            next = () => this.heartbeat(n)
          }
        } else if (n.deadline < at) {
          at = n.deadline
          next = () => this.startElection(n)
        }
      }
      if (!next) break
      this.now = at
      if (next()) changed = true
    }
    this.now = end
    if (changed) this.emit()
  }

  heartbeat(leader) {
    this.broadcast(leader, 'append')
    leader.nextHeartbeat = this.now + HEARTBEAT_MS
    return false
  }

  startElection(n) {
    n.role = 'candidate'
    n.term += 1
    n.votedFor = n.id
    n.votes = new Set([n.id])
    this.setTimer(n)
    this.record(`${n.id} timed out and started an election`, 'election', n.term)
    this.broadcast(n, 'vote')
    return true
  }

  deliver(m) {
    this.messages = this.messages.filter((x) => x !== m)
    const to = this.node(m.to)
    if (!to.alive) return false // dropped: the receiver is down

    let changed = false
    if (m.term > to.term) {
      to.term = m.term
      to.votedFor = null
      if (to.role !== 'follower') {
        if (to.role === 'leader') {
          this.record(
            `${to.id} saw a newer term and stepped down`,
            'info',
            to.term,
          )
        }
        to.role = 'follower'
      }
      changed = true
    }

    if (m.type === 'vote') {
      const granted =
        m.term === to.term && (to.votedFor === null || to.votedFor === m.from)
      if (granted) {
        to.votedFor = m.from
        this.setTimer(to)
      }
      this.send(to, m.from, 'vote-reply', { granted })
    } else if (m.type === 'vote-reply') {
      if (to.role === 'candidate' && m.term === to.term && m.granted) {
        to.votes.add(m.from)
        if (to.votes.size >= MAJORITY) {
          to.role = 'leader'
          to.nextHeartbeat = this.now
          this.record(
            `${to.id} won with ${to.votes.size} of ${NODE_IDS.length} votes`,
            'leader',
            to.term,
          )
          changed = true
        }
      }
    } else if (m.type === 'append') {
      if (m.term < to.term) {
        this.send(to, m.from, 'append-reply', { success: false })
        return changed
      }
      if (to.role === 'candidate') {
        to.role = 'follower'
        changed = true
      }
      this.setTimer(to)
      this.send(to, m.from, 'append-reply', { success: true })
    }
    return changed
  }

  crash(id, reason = '') {
    const n = this.node(id)
    if (!n.alive) return
    const wasLeader = n.role === 'leader'
    n.alive = false
    n.role = 'follower'
    n.votes = new Set()
    this.record(
      `${wasLeader ? 'Leader ' : ''}${id} crashed${reason}`,
      wasLeader ? 'crash-leader' : 'crash',
      n.term,
    )
    this.emit()
  }

  restart(id) {
    const n = this.node(id)
    if (n.alive) return
    n.alive = true
    n.role = 'follower'
    this.setTimer(n)
    this.record(`${id} restarted and rejoined as a follower`, 'info', n.term)
    this.emit()
  }

  toggle(id) {
    if (this.node(id).alive) this.crash(id)
    else this.restart(id)
  }

  snapshot() {
    const leader = this.leader
    return {
      nodes: this.nodes.map(({ id, role, term, alive }) => ({
        id,
        role,
        term,
        alive,
      })),
      leader: leader ? { id: leader.id, term: leader.term } : null,
      alive: this.aliveCount,
      log: this.log,
    }
  }
}
