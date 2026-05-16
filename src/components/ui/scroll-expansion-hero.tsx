import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  id?: string;
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  backgroundElement?: ReactNode;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  id,
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  backgroundElement,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent]       = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [isMobileState, setIsMobileState]   = useState<boolean>(false);

  // Refs so event handlers always see current values without re-registering
  const progressRef        = useRef(0);
  const expandedRef        = useRef(false);
  const touchStartYRef     = useRef(0);
  const rafRef             = useRef<number | null>(null);

  useEffect(() => {
    progressRef.current = 0;
    expandedRef.current = false;
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  // Register event listeners ONCE — handlers read from refs, never stale
  useEffect(() => {
    const commit = (newProgress: number) => {
      progressRef.current = newProgress;
      // Throttle React re-renders to one per animation frame
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollProgress(progressRef.current);
          rafRef.current = null;
        });
      }
      if (newProgress >= 1) {
        expandedRef.current = true;
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        expandedRef.current = false;
        setMediaFullyExpanded(false);
        e.preventDefault();
        return;
      }
      if (!expandedRef.current) {
        e.preventDefault();
        const delta = e.deltaY * 0.0009;
        commit(Math.min(Math.max(progressRef.current + delta, 0), 1));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartYRef.current) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        expandedRef.current = false;
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        const factor = deltaY < 0 ? 0.008 : 0.005;
        commit(Math.min(Math.max(progressRef.current + deltaY * factor, 0), 1));
        touchStartYRef.current = touchY;
      }
    };

    const handleTouchEnd = () => { touchStartYRef.current = 0; };

    const handleScroll = () => {
      if (!expandedRef.current) window.scrollTo(0, 0);
    };

    window.addEventListener('wheel',      handleWheel,      { passive: false });
    window.addEventListener('scroll',     handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove',  handleTouchMove,  { passive: false });
    window.addEventListener('touchend',   handleTouchEnd);

    return () => {
      window.removeEventListener('wheel',      handleWheel);
      window.removeEventListener('scroll',     handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove',  handleTouchMove);
      window.removeEventListener('touchend',   handleTouchEnd);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []); // ← runs once, never re-registers

  useEffect(() => {
    const check = () => setIsMobileState(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mediaWidth     = 300 + scrollProgress * (isMobileState ? 650  : 1250);
  const mediaHeight    = 400 + scrollProgress * (isMobileState ? 200  : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  // Split title evenly: "Phan Ngoc" / "Phuoc Loc"
  const words       = title ? title.split(' ') : [];
  const half        = Math.ceil(words.length / 2);
  const firstHalf   = words.slice(0, half).join(' ');
  const secondHalf  = words.slice(half).join(' ');

  return (
    <div
      id={id}
      style={{ background: '#000' }}
      className='overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>

          {/* Background layer — fades out as video expands */}
          <motion.div
            className='absolute inset-0 z-0 h-full overflow-hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            {backgroundElement ?? (
              bgImageSrc ? (
                <>
                  <img
                    src={bgImageSrc}
                    alt='Background'
                    className='w-screen h-screen'
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div className='absolute inset-0 bg-black/40' />
                </>
              ) : null
            )}
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>

              {/* Media container */}
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl'
                style={{
                  width:     `${mediaWidth}px`,
                  height:    `${mediaHeight}px`,
                  maxWidth:  '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 60px rgba(0,0,0,0.5)',
                  transition: 'none',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%' height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc + (mediaSrc.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' + mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay muted loop playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <motion.div
                        className='absolute inset-0 bg-black/20 rounded-xl'
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: 0.4 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className='w-full h-full object-cover rounded-xl'
                    />
                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                {/* Subtitle row */}
                <div className='flex flex-col items-center text-center relative z-10 mt-4' style={{ transition: 'none' }}>
                  {date && (
                    <p
                      className='text-lg text-blue-200 font-light tracking-widest uppercase'
                      style={{ transform: `translateX(-${textTranslateX}vw)`, transition: 'none' }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-sm text-blue-200/60 font-medium tracking-wider mt-1'
                      style={{ transform: `translateX(${textTranslateX}vw)`, transition: 'none' }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Split title — even halves */}
              <div
                className={`flex items-center justify-center text-center gap-6 w-full relative z-10 flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
                style={{ transition: 'none' }}
              >
                <motion.h2
                  className='font-bold text-blue-200'
                  style={{
                    fontSize: 'clamp(40px, 7vw, 80px)',
                    letterSpacing: '-2px',
                    lineHeight: 1,
                    transform: `translateX(-${textTranslateX}vw)`,
                    transition: 'none',
                  }}
                >
                  {firstHalf}
                </motion.h2>
                <motion.h2
                  className='font-bold text-blue-200'
                  style={{
                    fontSize: 'clamp(40px, 7vw, 80px)',
                    letterSpacing: '-2px',
                    lineHeight: 1,
                    transform: `translateX(${textTranslateX}vw)`,
                    transition: 'none',
                  }}
                >
                  {secondHalf}
                </motion.h2>
              </div>
            </div>

            {/* Children — revealed after full expansion */}
            <motion.section
              className='flex flex-col w-full px-8 py-16 md:px-16 lg:py-24'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
