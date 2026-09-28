'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { useScroll } from 'framer-motion';
import { FrameManifest } from '@/lib/types';
import ScrollyCanvas from './ScrollyCanvas';

interface Props {
  children: ReactNode;
}

export default function InfrastructureImpact({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [manifest, setManifest] = useState<FrameManifest | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '1000px 0px' }); 

    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      fetch('/sequence-impact/manifest.json')
        .then(res => res.json())
        .then(data => setManifest(data))
        .catch(err => console.error('Failed to load impact manifest:', err));
    }
  }, [isInView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full">
      {/* Sticky Video Background Layer */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-0">
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#05070A]">
          {/* Canvas Layer */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen">
            {manifest && <ScrollyCanvas scrollYProgress={scrollYProgress} manifest={manifest} />}
          </div>
          
          {/* Dark Vignette Overlay for premium cinematic feel and readability */}
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-20"></div>
        </div>
      </div>

      {/* Actual Page Content rendered on top */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
