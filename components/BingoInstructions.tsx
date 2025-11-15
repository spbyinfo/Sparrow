import { X, Sparkles, Camera, Gift, RotateCcw, Trophy, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

interface BingoInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BingoInstructions({ isOpen, onClose }: BingoInstructionsProps) {
  if (!isOpen) return null;

  const steps = [
    {
      icon: Sparkles,
      title: 'Get Your Weekly Bingo Card',
      description: 'Every week, you receive a new 3×3 bingo grid with 9 different product SKUs to find and scan.',
      color: '#ff9933'
    },
    {
      icon: Camera,
      title: 'Scan Products',
      description: 'Tap any product cell to open the camera scanner. Scan the barcode or QR code on the matching product packaging.',
      color: '#059669'
    },
    {
      icon: Gift,
      title: 'Earn Green Credits',
      description: 'Each scanned product earns you green credits! Credits can be redeemed at partner businesses in the Pass tab. Know a great service from a fruit vendor to a dentist? Recommend them to join!',
      color: '#ffd700'
    },
    {
      icon: Trophy,
      title: 'Complete Your Card',
      description: 'Scan all 9 products to complete your bingo card and earn bonus credits. The more you scan, the more you earn!',
      color: '#ff9933'
    },
    {
      icon: RotateCcw,
      title: 'Fresh Start Every Week',
      description: 'Your bingo card resets every Monday at midnight. New products, new opportunities to earn credits!',
      color: '#059669'
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Instructions Sheet */}
      <div 
        className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-[2rem] shadow-2xl transition-transform duration-300 ease-out"
        style={{
          paddingBottom: 'max(env(safe-area-inset-bottom), 24px)',
          maxHeight: '85vh'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background rounded-t-[2rem] px-6 pt-6 pb-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#ff9933]/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#ff9933]" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700' }}>How to Play</h2>
              <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                Sparrow Bingo Guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-muted flex items-center justify-center active:scale-90 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-6 pt-6 pb-24" style={{ maxHeight: 'calc(85vh - 100px)' }}>
          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-4">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 min-w-[56px] min-h-[56px] rounded-[1rem] flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: `${step.color}15`, border: `2px solid ${step.color}30` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-start gap-2 mb-1">
                      <span 
                        className="text-sm px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: `${step.color}20`,
                          color: step.color,
                          fontWeight: '600'
                        }}
                      >
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground" style={{ fontSize: '14px', lineHeight: '1.5' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tips Section */}
          <div className="mt-8 p-4 bg-[#faf3e0] border-2 border-[#ff9933]/20 rounded-[1.5rem]">
            <h3 className="flex items-center gap-2 mb-3" style={{ fontSize: '16px', fontWeight: '600' }}>
              <span className="text-2xl">💡</span>
              Pro Tips
            </h3>
            <ul className="space-y-2 text-muted-foreground" style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <li className="flex gap-2">
                <span className="text-[#ff9933] flex-shrink-0">•</span>
                <span>Look for products while shopping or at home to complete your card faster</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#ff9933] flex-shrink-0">•</span>
                <span>Higher-value products (like dairy and juices) earn more credits</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#ff9933] flex-shrink-0">•</span>
                <span>Make sure packaging is recyclable to maximize your environmental impact</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#ff9933] flex-shrink-0">•</span>
                <span>Schedule pickups regularly to dispose of waste properly and keep earning</span>
              </li>
            </ul>
          </div>

          {/* Rewards Preview */}
          <div className="mt-6 p-5 bg-gradient-to-br from-[#059669]/10 to-[#ffd700]/10 border-2 border-[#059669]/20 rounded-[1.5rem]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white flex items-center justify-center shadow-md">
                <Gift className="w-8 h-8 text-[#059669]" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                Redeem Your Credits
              </h3>
              <p className="text-muted-foreground mb-4" style={{ fontSize: '14px', lineHeight: '1.5' }}>
                Use your earned credits at amazing partner locations across India
              </p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="px-3 py-1.5 bg-white rounded-full border border-border" style={{ fontSize: '13px' }}>
                  💇 Salons & Spas
                </span>
                <span className="px-3 py-1.5 bg-white rounded-full border border-border" style={{ fontSize: '13px' }}>
                  🎬 Entertainment
                </span>
                <span className="px-3 py-1.5 bg-white rounded-full border border-border" style={{ fontSize: '13px' }}>
                  🧘 Fitness
                </span>
                <span className="px-3 py-1.5 bg-white rounded-full border border-border" style={{ fontSize: '13px' }}>
                  🎨 Classes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="sticky bottom-0 bg-background px-6 pt-4 pb-4 border-t border-border">
          <Button
            onClick={onClose}
            className="w-full h-12 min-h-[48px] rounded-[1.5rem] bg-[#ff9933] hover:bg-[#ff9933]/90 text-white shadow-md active:scale-[0.98] transition-all"
            style={{ fontSize: '16px', fontWeight: '600' }}
          >
            Got it, let's play!
          </Button>
        </div>
      </div>
    </>
  );
}