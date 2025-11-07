import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Check, Gift } from 'lucide-react';
import { Button } from './ui/button';

interface ClaimRewardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scannedCount: number;
  totalCount: number;
  weekEndDate: string;
  rewardDescription: string;
  progressPercentage: number;
}

export function ClaimRewardModal({
  open,
  onOpenChange,
  scannedCount,
  totalCount,
  weekEndDate,
  rewardDescription,
  progressPercentage
}: ClaimRewardModalProps) {
  const isComplete = scannedCount === totalCount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-center">
          {isComplete ? 'Congratulations! 🎉' : 'Keep Going!'}
        </DialogTitle>
        <DialogDescription className="text-center">
          {isComplete
            ? 'You have completed your weekly bingo card!'
            : `You've scanned ${scannedCount} out of ${totalCount} products`}
        </DialogDescription>

        {/* Progress Circle */}
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(progressPercentage / 100) * 352} 352`}
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#ff9933', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#ffd700', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isComplete ? (
                <Gift className="w-12 h-12 text-[#ff9933]" />
              ) : (
                <>
                  <span className="text-3xl" style={{ fontWeight: '700' }}>
                    {scannedCount}
                  </span>
                  <span className="text-sm text-muted-foreground">of {totalCount}</span>
                </>
              )}
            </div>
          </div>

          {/* Reward Description */}
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            {rewardDescription}
          </p>

          {/* Week End Date */}
          <p className="text-xs text-muted-foreground">
            Ends: {weekEndDate}
          </p>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onOpenChange(false)}
          className="w-full h-12 rounded-[1.5rem]"
          style={{ background: '#ff9933' }}
        >
          {isComplete ? 'Claim Reward' : 'Continue Scanning'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
