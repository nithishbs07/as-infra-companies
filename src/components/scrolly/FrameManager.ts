import { FrameManifest } from '@/lib/types';

export class FrameManager {
  private frames: Map<number, HTMLImageElement> = new Map();
  private loadQueue: number[] = [];
  private isLoading: boolean = false;
  private manifest: FrameManifest;

  constructor(manifest: FrameManifest) {
    this.manifest = manifest;
    // Prioritize first, middle, last frames, then sequential
    this.queuePrioritizedFrames();
  }

  private queuePrioritizedFrames() {
    const total = this.manifest.frameCount;
    
    // Core frames for first render and initial scrub
    const priority = [
      1, 
      Math.floor(total * 0.25), 
      Math.floor(total * 0.5), 
      Math.floor(total * 0.75), 
      total
    ];

    priority.forEach(p => {
      if (!this.loadQueue.includes(p)) this.loadQueue.push(p);
    });

    // Queue the rest sequentially
    for (let i = 1; i <= total; i++) {
      if (!this.loadQueue.includes(i)) {
        this.loadQueue.push(i);
      }
    }
  }

  public preloadNext() {
    if (this.isLoading || this.loadQueue.length === 0) return;
    
    const frameIndex = this.loadQueue.shift()!;
    this.isLoading = true;

    const img = new Image();
    // format to 4 digits
    const paddedIndex = String(frameIndex).padStart(4, '0');
    img.src = this.manifest.pattern.replace('%04d', paddedIndex);
    
    img.onload = () => {
      this.frames.set(frameIndex, img);
      this.isLoading = false;
      // Continue loading
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(() => this.preloadNext());
      } else {
        this.preloadNext();
      }
    };
    
    img.onerror = () => {
      this.isLoading = false;
      this.preloadNext(); // skip broken frame
    };
  }

  public getFrame(index: number): HTMLImageElement | null {
    return this.frames.get(index) || null;
  }

  public get isLoaded(): boolean {
    return this.frames.has(1);
  }
  
  public get loadedCount(): number {
    return this.frames.size;
  }
}
