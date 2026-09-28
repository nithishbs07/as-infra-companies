'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

interface HeroOverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroOverlay({ scrollYProgress }: HeroOverlayProps) {
  // Helper to map progress ranges to opacity and transform using Framer Motion
  const useStyle = (start: number, end: number, fadeLen = 0.05) => {
    // Ensure all values are within [0, 1] and strictly monotonically increasing
    const v1 = Math.max(0, start - fadeLen);
    const v2 = Math.max(v1 + 0.0001, start);
    const v3 = Math.max(v2 + 0.0001, Math.min(0.9998, end - fadeLen));
    const v4 = Math.max(v3 + 0.0001, Math.min(1, end));

    // Opacity mapping
    const opacity = useTransform(
      scrollYProgress,
      [v1, v2, v3, v4],
      [0, 1, 1, 0]
    );

    // Transform mapping
    const y = useTransform(
      scrollYProgress,
      [start, Math.max(start + 0.001, end)], // Ensure end > start slightly to avoid duplicate values in scale/y mappings
      [10, -10]
    );

    return { opacity, y };
  };

  const style1 = useStyle(0, 0.15);
  const style2 = useStyle(0.15, 0.35);
  const style3 = useStyle(0.35, 0.60);
  const style4 = useStyle(0.60, 0.80);
  const style5 = useStyle(0.80, 0.95);
  const style6 = useStyle(0.95, 1.0, 0.01);

  const phaseText = useTransform(scrollYProgress, v => `${Math.min(100, Math.round(v * 100))}% COMPLETED`);
  const scaleX = useTransform(scrollYProgress, v => v);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
      
      {/* 0-15% */}
      <motion.div className="absolute text-center px-4" style={style1}>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-wider max-w-4xl mx-auto">
          EVERYTHING STARTS<br/>WITH A FOUNDATION.
        </h2>
      </motion.div>

      {/* 15-35% */}
      <motion.div className="absolute text-center px-4" style={style2}>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-wider max-w-4xl mx-auto">
          ENGINEERED<br/>FROM THE GROUND UP.
        </h2>
      </motion.div>

      {/* 35-60% */}
      <motion.div className="absolute text-center px-4" style={style3}>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-wider max-w-4xl mx-auto flex flex-col gap-4">
          <span>STRUCTURE.</span>
          <span>PRECISION.</span>
          <span>PROGRESS.</span>
        </h2>
      </motion.div>

      {/* 60-80% */}
      <motion.div className="absolute text-center px-4" style={style4}>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-wider max-w-4xl mx-auto">
          BUILT<br/>TO REACH HIGHER.
        </h2>
      </motion.div>

      {/* 80-95% */}
      <motion.div className="absolute text-center px-4" style={style5}>
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-wider max-w-4xl mx-auto">
          BUILT TO LAST.
        </h2>
      </motion.div>

      {/* 95-100% */}
      <motion.div className="absolute text-center px-4" style={style6}>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-light text-white tracking-tighter mb-6">
          AS INFRA COMPANIES
        </h1>
        <p className="text-sm md:text-xl tracking-[0.2em] text-white/80 uppercase font-light">
          BUILDING TODAY<br/>FOR A BETTER TOMORROW.
        </p>
      </motion.div>

      {/* Architectural HUD Detail */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-12 mix-blend-difference text-white/70">
        <div className="flex justify-between items-start text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-mono mt-16 md:mt-20">
          <div className="flex flex-col gap-1">
            <span>CONSTRUCTION PHASE</span>
            <motion.span className="text-[var(--color-as-yellow)] opacity-80">{phaseText}</motion.span>
          </div>
          <div>01 / 04</div>
        </div>

        <div className="flex justify-between items-end pb-8">
          <div className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-mono origin-bottom-left -rotate-90 translate-x-4 mb-32 hidden md:block">
            SCROLL TO EXPLORE
          </div>
          
          <div className="flex-1 max-w-xs mx-auto md:max-w-md w-full flex flex-col items-center gap-4">
             <div className="flex justify-between w-full text-[9px] font-mono tracking-widest text-white/40">
                <span>FOUNDATION</span>
                <span>STRUCTURE</span>
                <span>COMPLETE</span>
             </div>
             <div className="w-full h-[1px] bg-white/10 relative">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-[var(--color-as-yellow)] origin-left"
                 style={{ scaleX }}
               />
             </div>
          </div>

          <div className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-mono origin-bottom-right rotate-90 -translate-x-4 mb-32 hidden md:block">
            AS INFRA HQ
          </div>
        </div>
      </div>

    </div>
  );
}
