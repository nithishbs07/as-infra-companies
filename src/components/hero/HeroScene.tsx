'use client';

import { useRef } from 'react';
import { useScroll, useReducedMotion } from 'framer-motion';
import ScrollyCanvas from '../scrolly/ScrollyCanvas';
import HeroOverlay from './HeroOverlay';
import { FrameManifest } from '@/lib/types';
import Image from 'next/image';

interface HeroSceneProps {
  manifest: FrameManifest;
}

export default function HeroScene({ manifest }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  if (prefersReducedMotion) {
    return (
      <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center">
        <Image 
          src={manifest.pattern.replace('%04d', '0150')}
          alt="AS Infra Construction"
          fill
          className="object-cover opacity-60"
        />
        <div className="relative z-10 text-center text-white p-8">
           <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">AS INFRA COMPANIES</h1>
           <p className="text-xl md:text-2xl tracking-wide opacity-80">BUILDING TODAY FOR A BETTER TOMORROW.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[1000vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <ScrollyCanvas scrollYProgress={scrollYProgress} manifest={manifest} />
        <HeroOverlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
