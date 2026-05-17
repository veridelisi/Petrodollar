/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Users, 
  LineChart, 
  Info,
  Maximize2,
  Minimize2,
  LayoutGrid,
  Lightbulb,
  X,
  Keyboard
} from 'lucide-react';
import { slides, authors, SlideContent, Author } from './slides';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setDirection(1);
      setCurrentSlideIndex(prev => prev + 1);
      setShowInsights(false);
    }
  }, [currentSlideIndex]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex(prev => prev - 1);
      setShowInsights(false);
    }
  }, [currentSlideIndex]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlideIndex ? 1 : -1);
    setCurrentSlideIndex(index);
    setShowGrid(false);
    setShowInsights(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f') toggleFullscreen();
      if (e.key === 'g') setShowGrid(prev => !prev);
      if (e.key === 'Escape') {
        setShowGrid(false);
        setShowInsights(false);
        setShowShortcuts(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f0] font-sans text-[#1a1a1a]">
      {/* Navigation Top Bar */}
      <nav className="sticky top-0 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-black/5 z-[60] bg-[#f5f5f0]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowGrid(true)}
            className="p-2 hover:bg-black/5 rounded-xl transition-all flex items-center gap-2 group"
          >
            <LayoutGrid size={18} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 hidden sm:block">Slide Map</span>
          </button>
          <div className="h-4 w-[1px] bg-black/10 mx-2" />
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest">
              {String(currentSlideIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-mono opacity-20">/</span>
            <span className="text-[10px] font-mono opacity-40">
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowInsights(!showInsights)}
            className={`p-2 rounded-xl transition-all flex items-center gap-2 ${showInsights ? 'bg-black text-white' : 'hover:bg-black/5 text-black/60'}`}
          >
            <Lightbulb size={18} />
          </button>
          <button 
            onClick={() => setShowShortcuts(true)}
            className="p-2 hover:bg-black/5 text-black/60 rounded-xl transition-all"
          >
            <Keyboard size={18} />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="p-2 hover:bg-black/5 text-black/60 rounded-xl transition-all"
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <div className="w-[1px] h-4 bg-black/10 mx-2" />
          <div className="flex items-center gap-1 bg-white/50 p-1 rounded-xl border border-black/5">
            <button 
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="p-1.5 hover:bg-black/5 disabled:opacity-10 rounded-lg transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="p-1.5 hover:bg-black/5 disabled:opacity-10 rounded-lg transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Interactive Progress Bar */}
      <div className="w-full h-1.5 bg-black/5 relative z-50 group">
        <div className="absolute inset-0 flex">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="flex-1 h-full relative group/step"
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[8px] font-mono whitespace-nowrap rounded opacity-0 group-hover/step:opacity-100 transition-opacity pointer-events-none">
                {slides[i].title}
              </div>
            </button>
          ))}
        </div>
        <motion.div 
          className="h-full bg-black relative"
          initial={false}
          animate={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full scale-0 group-hover:scale-100 transition-transform" />
        </motion.div>
      </div>

      {/* Main Slide Area */}
      <main className="flex-1 relative flex items-center justify-center p-4 md:p-12 lg:p-16 overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) prevSlide();
              else if (info.offset.x < -100) nextSlide();
            }}
            variants={{
              enter: (d: number) => ({
                x: d > 0 ? '20%' : '-20%',
                opacity: 0,
                scale: 0.98,
                filter: 'blur(10px)'
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)'
              },
              exit: (d: number) => ({
                x: d < 0 ? '20%' : '-20%',
                opacity: 0,
                scale: 0.98,
                filter: 'blur(10px)'
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full max-w-7xl h-full flex flex-col justify-center relative z-10"
          >
            {currentSlide.layout === 'title' && <TitleSlide slide={currentSlide} />}
            {currentSlide.layout === 'authors' && <AuthorsSlide slide={currentSlide} />}
            {currentSlide.layout === 'content' && <ContentSlide slide={currentSlide} />}
            {currentSlide.layout === 'graph' && <GraphSlide slide={currentSlide} />}
          </motion.div>
        </AnimatePresence>

        {/* Insights Overlay */}
        <AnimatePresence>
          {showInsights && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="absolute right-8 top-8 bottom-8 w-80 bg-white/40 backdrop-blur-3xl border-l border-black/5 p-8 z-[70] flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-black">
                  <Lightbulb size={20} className="fill-current" />
                  <span className="font-bold tracking-tight">Key Insights</span>
                </div>
                <button onClick={() => setShowInsights(false)} className="p-1 hover:bg-black/5 rounded-full">
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest opacity-40">Context</h4>
                  <p className="text-sm leading-relaxed text-black/70">
                    Since the attack on Iran by Israel and the United States (US) that began on 28 February 2026, there
has been intense debate regarding petrodollar and dedollarisation. Our objective in this brief
note—based on publicly available data—is to show that there has been no such thing as the
petrodollar, and that although the US dollar's dominance has been eroding for some time, the world
has not yet reached a point of global dedollarisation. In what follows, we begin with the US return
to the gold standard in 1879, which laid the foundation for how the dollar overtook the pound
sterling to become the dominant reserve and trade currency. We then emphasise the significance
of the eurodollar market that emerged in the early 1950s, while tracing the evolution since 1879.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest opacity-40">Observation</h4>
                  <p className="text-sm leading-relaxed text-black/70 italic border-l-2 border-black/10 pl-4 font-serif">
                    "The dollar's share of global official reserves has indeed declined gradually over the past quarter century. However, no other currency has emerged to displace it. The euro has stagnated, the yuan remains marginal, and gold's rising share reflects a sanction hedge rather than a shift away from the dollar."
                  </p>
                </div>
                {currentSlide.graphExplanation && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest opacity-40">Technical Note</h4>
                    <p className="text-xs leading-relaxed text-black/50">
                      {currentSlide.graphExplanation}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-8 pt-6 border-t border-black/5">
                <div className="flex items-center gap-2 text-[10px] font-mono opacity-30">
                  <Info size={12} />
                  <span>Verified Research Data</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Grid View Modal */}
      <AnimatePresence>
        {showGrid && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#f5f5f0]/95 backdrop-blur-xl z-[100] p-12 overflow-y-auto custom-scrollbar"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-5xl font-black italic font-serif">Slide Map</h2>
                <button 
                  onClick={() => setShowGrid(false)}
                  className="p-4 bg-black text-white rounded-full hover:scale-110 transition-transform"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {slides.map((s, i) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => goToSlide(i)}
                    className={`aspect-video rounded-2xl p-6 text-left transition-all border group relative overflow-hidden ${
                      currentSlideIndex === i 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-black border-black/5 hover:border-black/20'
                    }`}
                  >
                    <span className="text-[10px] font-mono opacity-40 block mb-2">Slide {i + 1}</span>
                    <h3 className="font-bold leading-tight group-hover:scale-[1.02] transition-transform">{s.title}</h3>
                    <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      {s.layout === 'graph' ? <LineChart size={40} /> : <BookOpen size={40} />}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shortcuts Overlay */}
      <AnimatePresence>
        {showShortcuts && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm" onClick={() => setShowShortcuts(false)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl border border-black/5"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-8">
                <Keyboard className="text-black/40" />
                <h3 className="text-2xl font-black">Controls</h3>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'Right / Space', action: 'Next Slide' },
                  { key: 'Left', action: 'Previous Slide' },
                  { key: 'G', action: 'Toggle Slide Map' },
                  { key: 'F', action: 'Toggle Fullscreen' },
                  { key: 'Esc', action: 'Close Overlays' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-2 border-b border-black/5">
                    <span className="text-xs font-mono uppercase tracking-widest opacity-40">{item.action}</span>
                    <span className="px-2 py-1 bg-black/5 rounded font-mono text-xs">{item.key}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowShortcuts(false)}
                className="w-full mt-10 py-4 bg-black text-white rounded-2xl font-bold hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Minimal Footer */}
      <footer className="px-8 py-4 flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.4em] opacity-30 border-t border-black/5">
        <div className="flex gap-8">
          <span className="hover:opacity-100 transition-opacity cursor-default">Monetary Evolution Report</span>
          <span className="hidden sm:inline opacity-20 text-[6px]">✕</span>
          <span className="hidden sm:inline hover:opacity-100 transition-opacity cursor-default">Institutional Analysis</span>
        </div>
        <div className="text-right">
          Bodur • Öncü • Yılmaz
        </div>
      </footer>
    </div>
  );
}

function TitleSlide({ slide }: { slide: SlideContent }) {
  return (
    <div className="text-center space-y-8 md:space-y-12 max-w-5xl mx-auto px-4">
      <div className="space-y-4 md:space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-4xl sm:text-6xl md:text-8xl font-serif font-black leading-[0.95] text-balance tracking-tighter"
        >
          {slide.title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-3xl text-black/40 italic font-serif max-w-2xl mx-auto leading-relaxed"
        >
          {slide.subtitle}
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="pt-8 md:pt-16 flex flex-col items-center gap-4"
      >
        <div className="flex -space-x-4">
          {authors.map((_, i) => (
            <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-[#f5f5f0] bg-black/10 flex items-center justify-center text-[10px] md:text-xs font-mono font-bold">
              {authors[i].name.charAt(0)}
            </div>
          ))}
        </div>
        <div className="text-[8px] md:text-[10px] font-mono tracking-[0.3em] uppercase text-black/60 px-4">
          Presented by {slide.content}
        </div>
      </motion.div>
    </div>
  );
}

function AuthorsSlide({ slide }: { slide: SlideContent }) {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-0">
      <div className="space-y-8 md:space-y-12">
        <div className="space-y-4 md:space-y-6">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-7xl font-black italic tracking-tighter"
          >
            {slide.title}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            className="h-1 md:h-2 bg-black"
          />
        </div>
        <p className="text-lg md:text-xl leading-relaxed text-black/60 font-serif max-w-2xl">
          {slide.content}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {authors.map((author, index) => (
            <motion.div 
              key={author.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-6 p-6 transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-black/5 overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                <img 
                  src={author.photo} 
                  alt={author.name} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=141414&color=fff`;
                  }}
                />
              </div>
              <div>
                <h3 className="font-black text-xl leading-none mb-1">{author.name}</h3>
                <p className="text-xs opacity-50 font-medium">{author.bio}</p>
                <div className="text-[9px] font-mono mt-2 tracking-widest truncate max-w-[200px]">
                  {author.web ? (
                    <a href={author.web} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity underline decoration-black/10">
                      {author.web.replace('https://', '')}
                    </a>
                  ) : (
                    <span className="opacity-20">{author.email}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContentSlide({ slide }: { slide: SlideContent }) {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <div className="space-y-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-4"
        >
           <span className="w-8 h-[1px] bg-black/20" />
           <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40">{slide.subtitle}</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-8xl font-black tracking-tighter"
        >
          {slide.title}
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl font-serif italic text-black/80 leading-relaxed text-balance"
        >
          {slide.content}
        </motion.p>

        {slide.id === 'petrodollar-myth' && (
          <div className="relative h-64 p-8 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-between px-12">
              {/* USA Entity */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-white font-bold shadow-lg">
                  USA
                </div>
                <span className="text-[10px] font-mono uppercase opacity-40">Consumption</span>
              </div>

              {/* Saudi Arabia Entity */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#006C35] flex items-center justify-center text-white font-bold shadow-lg">
                  KSA
                </div>
                <span className="text-[10px] font-mono uppercase opacity-40">Energy Export</span>
              </div>
            </div>

            {/* Path: Dollars to Saudi */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path 
                d="M 120 128 Q 256 64 392 128" 
                fill="none" 
                stroke="black" 
                strokeWidth="1" 
                strokeDasharray="4 4" 
                className="opacity-10"
              />
              <motion.circle
                r="6"
                fill="black"
                animate={{
                  offsetDistance: ["0%", "100%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ offsetPath: "path('M 120 128 Q 256 64 392 128')" }}
              />
              <text dy="-10" className="text-[10px] font-mono fill-black/60">
                <textPath href="#topPath" startOffset="50%" textAnchor="middle">
                  $ for Oil
                </textPath>
              </text>
              <defs>
                <path id="topPath" d="M 120 128 Q 256 64 392 128" />
                <path id="bottomPath" d="M 392 128 Q 256 192 120 128" />
              </defs>
            </svg>

            {/* Path: Dollars back to USA */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path 
                d="M 392 128 Q 256 192 120 128" 
                fill="none" 
                stroke="black" 
                strokeWidth="1" 
                strokeDasharray="4 4" 
                className="opacity-10"
              />
              <motion.circle
                r="6"
                fill="#006C35"
                animate={{
                  offsetDistance: ["0%", "100%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.5
                }}
                style={{ offsetPath: "path('M 392 128 Q 256 192 120 128')" }}
              />
              <text dy="20" className="text-[10px] font-mono fill-black/60">
                <textPath href="#bottomPath" startOffset="50%" textAnchor="middle">
                  $ for Treasuries
                </textPath>
              </text>
            </svg>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono uppercase tracking-widest text-black/30">
              Structural Recycling Animation
            </div>
          </div>
        )}

        {slide.id === 'eurodollar-intro' && (
          <div className="relative p-8 overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-full max-w-sm">
              <div className="flex items-center justify-between mb-6">
                 <div className="text-[8px] font-mono tracking-widest opacity-30 uppercase">Offshore Bank</div>
                 <div className="h-[1px] flex-1 mx-3 bg-black/10" />
                 <div className="text-[8px] font-mono tracking-widest opacity-30 uppercase">T-Account</div>
              </div>
              
              <div className="grid grid-cols-2 gap-0 border border-black/20 rounded-xl overflow-hidden shadow-xl">
                 <div className="p-2 border-b border-r border-black/10 bg-black/5 text-[9px] font-mono uppercase font-bold text-center">Assets</div>
                 <div className="p-2 border-b border-black/10 bg-black/5 text-[9px] font-mono uppercase font-bold text-center">Liabilities</div>
                 
                 <div className="p-6 border-r border-black/10 flex flex-col items-center justify-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center"
                    >
                      <div className="text-xs font-black mb-1">Eurodollar</div>
                      <div className="text-[9px] font-mono opacity-40 uppercase">Credit</div>
                    </motion.div>
                 </div>
                 <div className="p-6 flex flex-col items-center justify-center">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center"
                    >
                      <div className="text-xs font-black mb-1">Eurodollar</div>
                      <div className="text-[9px] font-mono opacity-40 uppercase">Deposit</div>
                    </motion.div>
                 </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-6 flex items-center justify-center"
              >
                 <div className="px-3 py-1.5 bg-black text-white rounded-lg text-[10px] font-mono font-bold tracking-widest">
                    EURODOLLAR = DOLLAR
                 </div>
              </motion.div>
            </div>
            
            <div className="absolute top-2 right-4 text-[6px] font-mono opacity-20 uppercase tracking-tighter">
               Non-US Jurisdiction • Institutional Debt
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GraphSlide({ slide }: { slide: SlideContent }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 h-full items-center p-2 sm:p-0">
      <div className="lg:col-span-5 space-y-8 md:space-y-10">
        <div className="space-y-3 md:space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-lg text-[10px] font-mono uppercase tracking-widest"
          >
            {slide.figureNumber}
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter">{slide.title}</h2>
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] opacity-40">
            {slide.subtitle}
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-black/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="w-full bg-black"
            />
          </div>
          <p className="text-base sm:text-lg md:text-xl font-serif text-black/60 leading-relaxed pl-8 md:pl-10 italic">
            {slide.content}
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-6 p-4 md:p-0">
          <div className="p-2 md:p-3 opacity-20 text-black shrink-0">
            <Lightbulb size={18} />
          </div>
          <p className="text-[10px] md:text-[11px] leading-relaxed text-black/40 font-medium">
            {slide.graphExplanation}
          </p>
        </div>
      </div>

      <div className="lg:col-span-7 relative h-full flex items-center justify-center min-h-[300px] md:min-h-[400px]">
        <motion.div 
          layout
          onClick={() => setIsZoomed(!isZoomed)}
          className={`w-full relative overflow-visible group cursor-zoom-in transition-all duration-700 ${
            isZoomed ? 'scale-105 sm:scale-110 z-50 fixed inset-2 sm:relative sm:inset-auto flex items-center justify-center' : ''
          }`}
        >
          {isZoomed && (
            <button className="absolute top-4 right-4 p-2 bg-black text-white rounded-full z-10 sm:hidden shadow-lg">
              <X size={18} />
            </button>
          )}
          <div className={`flex flex-col items-center justify-center text-center relative ${
            isZoomed ? 'h-full w-full' : 'aspect-video w-full'
          }`}>
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-contain opacity-0 transition-opacity duration-700"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
              onLoad={(e) => {
                (e.target as HTMLImageElement).classList.remove('opacity-0');
                (e.target as HTMLImageElement).classList.add('opacity-100');
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
