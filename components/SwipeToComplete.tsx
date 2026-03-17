import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

interface SwipeToCompleteProps { onComplete: () => void; disabled?: boolean; }

export function SwipeToComplete({ onComplete, disabled = false }: SwipeToCompleteProps) {
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const swipeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => { if (disabled || isCompleting) return; isDragging.current = true; startX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { if (!isDragging.current || disabled || isCompleting) return; const currentX = e.touches[0].clientX; const diff = currentX - startX.current; const maxWidth = containerRef.current?.offsetWidth || 300; const handleWidth = 56; const availableWidth = maxWidth - handleWidth - 8; const progress = Math.max(0, Math.min(100, (diff / availableWidth) * 100)); setSwipeProgress(progress); };
  const handleTouchEnd = () => { if (disabled || isCompleting) return; isDragging.current = false; if (swipeProgress > 80) { setSwipeProgress(100); setIsCompleting(true); setTimeout(() => { onComplete(); }, 300); } else { setSwipeProgress(0); } };
  const handleMouseDown = (e: React.MouseEvent) => { if (disabled || isCompleting) return; isDragging.current = true; startX.current = e.clientX; };
  const handleMouseMove = (e: MouseEvent) => { if (!isDragging.current || disabled || isCompleting) return; const currentX = e.clientX; const diff = currentX - startX.current; const maxWidth = containerRef.current?.offsetWidth || 300; const handleWidth = 56; const availableWidth = maxWidth - handleWidth - 8; const progress = Math.max(0, Math.min(100, (diff / availableWidth) * 100)); setSwipeProgress(progress); };
  const handleMouseUp = () => { if (disabled || isCompleting) return; isDragging.current = false; if (swipeProgress > 80) { setSwipeProgress(100); setIsCompleting(true); setTimeout(() => { onComplete(); }, 300); } else { setSwipeProgress(0); } };

  useEffect(() => { if (isDragging.current) { document.addEventListener('mousemove', handleMouseMove); document.addEventListener('mouseup', handleMouseUp); return () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp); }; } }, [swipeProgress, isCompleting, disabled]);

  return (
    <div ref={containerRef} className="relative h-14 bg-gradient-to-r from-[#059669] to-[#047857] rounded-[1.5rem] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center"><span className="transition-all duration-300 flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '600', color: 'white', opacity: swipeProgress < 50 ? 1 : 0 }}><Sparkles className="w-4 h-4" />Swipe to Complete Service</span><span className="transition-all duration-300" style={{ fontSize: '16px', fontWeight: '700', color: 'white', opacity: swipeProgress >= 80 ? 1 : 0 }}>{isCompleting ? '✅ Completing...' : '✅ Release to Confirm'}</span></div>
      <div className="absolute inset-0 bg-[#059669]/30 transition-all" style={{ clipPath: `inset(0 ${100 - swipeProgress}% 0 0)` }} />
      <div ref={swipeRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown} className={`absolute left-1 top-1 bottom-1 w-14 bg-white rounded-[1.25rem] shadow-lg flex items-center justify-center transition-transform ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-grab active:cursor-grabbing'}`} style={{ transform: `translateX(${(swipeProgress / 100) * ((containerRef.current?.offsetWidth || 300) - 56 - 8)}px)`, transition: isDragging.current ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}><ChevronRight className={`w-6 h-6 transition-colors ${swipeProgress > 80 ? 'text-[#059669]' : 'text-[#ff9933]'}`} /></div>
    </div>
  );
}