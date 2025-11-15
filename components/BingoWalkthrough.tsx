import { useState, useEffect } from 'react';
import { X, ChevronRight, Sparkles, Flashlight } from 'lucide-react';
import { Button } from './ui/button';

export interface WalkthroughStep {
  id: string;
  target: string;
  title: string;
  description: string;
}

interface BingoWalkthroughProps {
  steps: WalkthroughStep[];
  onComplete: () => void;
  isActive: boolean;
}

export function BingoWalkthrough({ steps, onComplete, isActive }: BingoWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [arrowPosition, setArrowPosition] = useState({ left: '50%', display: 'none' });
  const [tooltipAtTop, setTooltipAtTop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isActive) {
      setMounted(true);
      setCurrentStep(0);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !mounted) return;

    const updatePositioning = () => {
      const step = steps[currentStep];
      const target = document.querySelector(`[data-walkthrough="${step.target}"]`);
      
      if (target) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const viewportHeight = window.innerHeight;
        
        // Determine if element is in top half or bottom half of viewport
        const isInTopHalf = centerY < viewportHeight / 2;
        
        setTooltipAtTop(!isInTopHalf); // If element is in top half, show tooltip at bottom
        setArrowPosition({
          left: `${centerX}px`,
          display: 'block'
        });
        
        // Clean up previous highlights
        document.querySelectorAll('.walkthrough-highlight').forEach(el => {
          el.classList.remove('walkthrough-highlight');
        });
        
        // Add highlight to current target
        target.classList.add('walkthrough-highlight');
      }
    };

    updatePositioning();
    window.addEventListener('resize', updatePositioning);
    window.addEventListener('scroll', updatePositioning, true);
    
    return () => {
      window.removeEventListener('resize', updatePositioning);
      window.removeEventListener('scroll', updatePositioning, true);
      document.querySelectorAll('.walkthrough-highlight').forEach(el => {
        el.classList.remove('walkthrough-highlight');
      });
    };
  }, [currentStep, isActive, mounted, steps]);

  if (!mounted) return null;

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)'
        }}
        onClick={handleSkip}
      />

      {/* Arrow Pointer - Dynamic direction based on tooltip position */}
      <div
        className={`fixed z-50 transition-all duration-300 ${
          tooltipAtTop ? 'rotate-180' : ''
        }`}
        style={
          tooltipAtTop
            ? {
                top: 'calc(env(safe-area-inset-top) + 280px)',
                left: arrowPosition.left,
                transform: 'translateX(-50%)',
                display: arrowPosition.display
              }
            : {
                bottom: 'calc(env(safe-area-inset-bottom) + 280px)',
                left: arrowPosition.left,
                transform: 'translateX(-50%)',
                display: arrowPosition.display
              }
        }
      >
        <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[16px] border-l-transparent border-r-transparent border-b-white drop-shadow-lg" />
      </div>

      {/* Tooltip Card - Dynamic positioning */}
      <div
        className={`fixed left-0 right-0 z-50 mx-4 transition-all duration-300 ${
          isActive ? 'opacity-100 translate-y-0' : tooltipAtTop ? 'opacity-0 -translate-y-8' : 'opacity-0 translate-y-8'
        }`}
        style={
          tooltipAtTop
            ? {
                top: 'calc(env(safe-area-inset-top) + 80px)'
              }
            : {
                bottom: 'calc(env(safe-area-inset-bottom) + 80px)'
              }
        }
      >
        <div className={`bg-white rounded-[1.5rem] border-2 border-[#ff9933] overflow-hidden ${
          tooltipAtTop 
            ? 'shadow-[0_4px_40px_rgba(0,0,0,0.3)]' 
            : 'shadow-[0_-4px_40px_rgba(0,0,0,0.3)]'
        }`}>
          {/* Progress Dots - Horizontal at top */}
          <div className="flex items-center justify-center gap-1.5 pt-4 pb-3">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-[#ff9933] w-8'
                    : index < currentStep
                    ? 'bg-[#059669] w-2'
                    : 'bg-border w-2'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <div className="flex items-start gap-4 mb-5">
              {/* Icon Circle */}
              <div className="min-w-[48px] w-12 h-12 rounded-full bg-[#ff9933]/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#ff9933]" />
              </div>
              
              {/* Title & Description */}
              <div className="flex-1 min-w-0 pt-1">
                <h3 className="text-foreground mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentStepData.description}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 mb-3">
              {!isFirstStep && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex-1 h-12 rounded-[1rem] border-2 border-[#ff9933] text-[#ff9933] hover:bg-[#ff9933]/5"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className={`h-12 rounded-[1rem] bg-[#ff9933] hover:bg-[#e67300] text-white shadow-[0_4px_12px_rgba(255,153,51,0.3)] active:scale-[0.98] transition-all ${
                  isFirstStep ? 'w-full' : 'flex-1'
                }`}
              >
                {isLastStep ? (
                  'Got it!'
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>

            {/* Footer - Step count & Skip */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{currentStep + 1} of {steps.length}</span>
              {!isLastStep && (
                <button
                  onClick={handleSkip}
                  className="hover:text-foreground transition-colors"
                >
                  Skip tour
                </button>
              )}
            </div>
          </div>

          {/* Close Button - Top Right */}
          <button
            onClick={handleSkip}
            className="absolute top-3 right-3 w-8 h-8 bg-[#dc143c] text-white rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 hover:bg-[#dc143c]/90"
            aria-label="Close walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

// Help Button Component
interface WalkthroughHelpButtonProps {
  onClick: () => void;
}

export function WalkthroughHelpButton({ onClick }: WalkthroughHelpButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 z-30 w-12 h-12 bg-[#4169e1] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(65,105,225,0.5)] transition-all active:scale-90 hover:shadow-[0_6px_24px_rgba(65,105,225,0.6)] hover:bg-[#3a5dd1] group"
      aria-label="Show tutorial"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom) + 6rem)'
      }}
    >
      <Flashlight className="w-5 h-5 transition-transform group-hover:rotate-12" />
    </button>
  );
}