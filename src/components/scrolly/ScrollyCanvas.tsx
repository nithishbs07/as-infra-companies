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
  
  useEffect(() => {
    // Initialize frame manager only on client
    frameManagerRef.current = new FrameManager(manifest);
    frameManagerRef.current.preloadNext();
  }, [manifest]);

  useEffect(() => {
    if (!canvasRef.current || !frameManagerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false for performance
    if (!ctx) return;

    const render = (latest: number) => {
      // Map progress to frame index
      const totalFrames = manifest.frameCount;
      let frameIndex = Math.floor(latest * totalFrames);
      // Ensure index is within bounds [1, totalFrames]
      frameIndex = Math.max(1, Math.min(frameIndex, totalFrames));

      const manager = frameManagerRef.current;
      if (!manager) return;

      const img = manager.getFrame(frameIndex);

      // If exact frame isn't loaded yet, try to find nearest loaded frame
      let renderImg = img;
      if (!renderImg) {
        renderImg = manager.getFrame(1); 
      }

      if (renderImg) {
        // Draw with object-cover style logic
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
        
        // Center it
        const offsetX = (width - drawWidth) / 2;
        const offsetY = (height - drawHeight) / 2;

        ctx.fillStyle = '#05070A';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(renderImg, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Subscribing directly avoids React renders
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      requestAnimationFrame(() => render(latest));
    });
    
    // Initial render
    render(scrollYProgress.get());

    return () => unsubscribe();
  }, [scrollYProgress, manifest]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Handle high DPI displays
        const pixelRatio = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * pixelRatio;
        canvasRef.current.height = window.innerHeight * pixelRatio;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        
        // Force a re-render of current frame by slightly dispatching a mock event or just letting scroll handle it
        // The dependency array should probably include dimensions but for now we rely on scroll updates
      }
    };

    handleResize(); // Initial setup
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ width: '100vw', height: '100vh' }}
      />
    </>
  );
}
