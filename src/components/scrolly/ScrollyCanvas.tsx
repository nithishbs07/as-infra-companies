'use client';

import { useEffect, useRef } from 'react';
import { FrameManager } from './FrameManager';
import { FrameManifest } from '@/lib/types';
import { MotionValue } from 'framer-motion';

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
  manifest: FrameManifest;
}

export default function ScrollyCanvas({ scrollYProgress, manifest }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameManagerRef = useRef<FrameManager | null>(null);
  const renderRef = useRef<((latest: number) => void) | null>(null);
  
  useEffect(() => {
    frameManagerRef.current = new FrameManager(manifest);
    frameManagerRef.current.preloadNext();
  }, [manifest]);

  useEffect(() => {
    if (!canvasRef.current || !frameManagerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const render = (latest: number) => {
      const totalFrames = manifest.frameCount;
      let frameIndex = Math.floor(latest * totalFrames);
      frameIndex = Math.max(1, Math.min(frameIndex, totalFrames));

      const manager = frameManagerRef.current;
      if (!manager) return;

      const img = manager.getFrame(frameIndex);
      let renderImg = img;
      if (!renderImg) {
        renderImg = manager.getFrame(1); 
      }

      if (renderImg) {
        const { width, height } = canvas;
        const imgRatio = renderImg.width / renderImg.height;
        const canvasRatio = width / height;
        
        let drawWidth, drawHeight;

        if (canvasRatio > imgRatio) {
          drawWidth = width * 1.2;
          drawHeight = (width / imgRatio) * 1.2;
        } else {
          drawHeight = height * 1.2;
          drawWidth = (height * imgRatio) * 1.2;
        }
        
        const offsetX = (width - drawWidth) / 2;
        const offsetY = (height - drawHeight) / 2;

        ctx.fillStyle = '#05070A';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(renderImg, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    renderRef.current = render;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      requestAnimationFrame(() => render(latest));
    });
    
    render(scrollYProgress.get());

    return () => unsubscribe();
  }, [scrollYProgress, manifest]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (canvasRef.current) {
          const pixelRatio = window.devicePixelRatio || 1;
          canvasRef.current.width = window.innerWidth * pixelRatio;
          canvasRef.current.height = window.innerHeight * pixelRatio;
          canvasRef.current.style.width = `${window.innerWidth}px`;
          canvasRef.current.style.height = `${window.innerHeight}px`;
          
          if (renderRef.current) {
             requestAnimationFrame(() => renderRef.current!(scrollYProgress.get()));
          }
        }
      }, 100);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollYProgress]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ width: '100vw', height: '100dvh' }}
      />
    </>
  );
}
