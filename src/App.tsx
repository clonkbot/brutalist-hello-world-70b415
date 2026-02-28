import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="min-h-dvh bg-black text-white font-mono relative overflow-hidden flex flex-col">
      {/* Exposed Grid Structure */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full grid grid-cols-12 gap-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-white/5 h-full" />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12 gap-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-t border-white/5 w-full" />
          ))}
        </div>
      </div>

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top Bar - Exposed Meta */}
      <header className="border-b-4 border-white p-4 md:p-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <span className="text-xs tracking-[0.3em] uppercase text-white/50">
            SYS.INIT
          </span>
          <span className="text-xs tracking-[0.2em] font-bold text-[#FF0000]">
            {formatTime(time)}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-6xl">
          {/* Pre-text */}
          <div className="mb-4 md:mb-8">
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/30 block">
              OUTPUT_STREAM://
            </span>
          </div>

          {/* Main Hello World Text */}
          <div className="relative">
            {/* Shadow/Glitch layers */}
            <h1
              className={`absolute inset-0 text-[12vw] md:text-[10vw] lg:text-[8vw] font-black uppercase leading-none tracking-tighter text-[#FF0000] transition-transform duration-75 ${glitchActive ? 'translate-x-1 -translate-y-1' : ''}`}
              aria-hidden="true"
            >
              HELLO<br />WORLD
            </h1>
            <h1
              className={`absolute inset-0 text-[12vw] md:text-[10vw] lg:text-[8vw] font-black uppercase leading-none tracking-tighter text-[#00FFFF] transition-transform duration-75 ${glitchActive ? '-translate-x-1 translate-y-1' : ''}`}
              aria-hidden="true"
              style={{ mixBlendMode: 'difference' }}
            >
              HELLO<br />WORLD
            </h1>
            <h1 className="relative text-[12vw] md:text-[10vw] lg:text-[8vw] font-black uppercase leading-none tracking-tighter text-white">
              HELLO<br />WORLD
            </h1>
          </div>

          {/* Post-text metadata */}
          <div className="mt-6 md:mt-12 border-t-2 border-white/20 pt-4 md:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-[10px] md:text-xs tracking-wider">
              <div>
                <span className="text-white/30 block mb-1">STATUS</span>
                <span className="text-[#FF0000] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#FF0000] animate-pulse" />
                  ACTIVE
                </span>
              </div>
              <div>
                <span className="text-white/30 block mb-1">ITERATION</span>
                <span className="text-white font-bold">001</span>
              </div>
              <div>
                <span className="text-white/30 block mb-1">PROTOCOL</span>
                <span className="text-white font-bold">BRUTALIST.V1</span>
              </div>
            </div>
          </div>

          {/* Decorative Block */}
          <div className="mt-8 md:mt-16 flex gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-2 md:h-3 flex-1 bg-white"
                style={{
                  opacity: 1 - (i * 0.1),
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="border-t-4 border-white relative z-10">
        <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs tracking-wider">
            <span className="text-white/30">VIEWPORT:</span>
            <span className="text-white font-bold">{typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '---'}</span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span className="text-white/30">RENDER:</span>
            <span className="text-white font-bold">REACT.18</span>
          </div>
          <div className="text-[10px] md:text-xs text-white/20">
            NO_DECORATION
          </div>
        </div>

        {/* Attribution Footer */}
        <div className="border-t border-white/10 px-4 md:px-6 py-3 text-center">
          <span className="text-[10px] tracking-wider text-white/30">
            Requested by @web-user · Built by @clonkbot
          </span>
        </div>
      </footer>

      {/* Corner Markers */}
      <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-r-2 border-b-2 border-[#FF0000] pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-l-2 border-b-2 border-[#FF0000] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-r-2 border-t-2 border-[#FF0000] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-l-2 border-t-2 border-[#FF0000] pointer-events-none" />
    </div>
  );
}

export default App;
