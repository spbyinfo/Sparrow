import { Check, X, Info, ChevronRight, Calendar, Languages, HelpCircle, Flashlight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ReservationCircles, type Reservation } from './ReservationCircles';
import { ReservationDetailModal } from './ReservationDetailModal';
import { ScanModal } from './ScanModal';
import { ClaimRewardModal } from './ClaimRewardModal';
import { HowSparrowWorksModal } from './HowSparrowWorksModal';
import { LanguageSelector } from './LanguageSelector';
import { PickupPreferences } from './PickupPreferences';
import { BingoWalkthrough, WalkthroughHelpButton, type WalkthroughStep } from './BingoWalkthrough';
import { BingoInstructions } from './BingoInstructions';

interface BingoProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  brandLogo: string; // Logo shown on bingo card
  image: string; // Legacy support
  image3D: string; // 3D product image
  plasticType: string; // PETE, HDPE, etc.
  description: string;
  recyclable: boolean;
  scanned: boolean;
  credits: number;
}

interface BingoCardProps {
  bingoProducts: BingoProduct[];
  onProductScanned: (sku: string) => void;
  isWaiting?: boolean; // New prop for waiting state
  totalCredits?: number; // Total credits for progress tracking
  activeReservations?: Reservation[]; // Active reservations to display
}

export function BingoCard({ bingoProducts, onProductScanned, isWaiting = false, totalCredits = 0, activeReservations = [] }: BingoCardProps) {
  const [selectedProduct, setSelectedProduct] = useState<BingoProduct | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isReservationDetailOpen, setIsReservationDetailOpen] = useState(false);
  
  // User preferences
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [pickupDays, setPickupDays] = useState<string[]>(['mon', 'wed', 'fri']);
  const [pickupTime, setPickupTime] = useState({ hour: 2, minute: 0, period: 'PM' as 'AM' | 'PM' });
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [isPickupPreferencesOpen, setIsPickupPreferencesOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isHowSparrowWorksOpen, setIsHowSparrowWorksOpen] = useState(false);
  const [isBingoInstructionsOpen, setIsBingoInstructionsOpen] = useState(false);

  // Walkthrough state
  const [isWalkthroughActive, setIsWalkthroughActive] = useState(false);
  const [hasSeenWalkthrough, setHasSeenWalkthrough] = useState(false);

  // Check if user has seen walkthrough before
  useEffect(() => {
    const seen = localStorage.getItem('sparrow_bingo_walkthrough_completed');
    if (!seen) {
      // First time user - show walkthrough after a short delay
      const timer = setTimeout(() => {
        setIsWalkthroughActive(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setHasSeenWalkthrough(true);
    }
  }, []);

  const handleWalkthroughComplete = () => {
    setIsWalkthroughActive(false);
    setHasSeenWalkthrough(true);
    localStorage.setItem('sparrow_bingo_walkthrough_completed', 'true');
  };

  const handleShowWalkthrough = () => {
    setIsWalkthroughActive(true);
  };

  // Define walkthrough steps
  const walkthroughSteps: WalkthroughStep[] = [
    {
      id: 'welcome',
      target: 'week-header',
      title: 'Welcome to Sparrow! 🐦',
      description: 'Every week you get a fresh bingo card. Complete it to unlock exclusive table or service reservations available for that day at partner cafes, restaurants & shops nearby.'
    },
    {
      id: 'grid',
      target: 'bingo-grid',
      title: 'Scan Products to Play',
      description: 'Tap any circle to see product details, then scan your product packaging to earn credits and fill your card!'
    },
    {
      id: 'progress',
      target: 'progress-bar',
      title: 'Track Your Progress',
      description: 'Complete your bingo card to unlock partner discounts! The more you scan, the more rewards you unlock.'
    },
    {
      id: 'info',
      target: 'info-icon',
      title: 'Learn Our Impact',
      description: 'Curious how Sparrow helps the planet and waste workers? Tap here to learn about our circular economy.'
    },
    {
      id: 'pickup',
      target: 'pickup-icon',
      title: 'Set Pickup Times',
      description: 'Choose when we collect your scanned items - we only come when you\'re home!'
    },
    {
      id: 'language',
      target: 'language-icon',
      title: 'Switch Languages',
      description: 'Prefer Hindi or another language? You can change it anytime here.'
    }
  ];

  const weekStartDate = 'Oct 20';
  const weekEndDate = 'Oct 26, 2025';

  // Calculate completed cells
  const scannedCount = bingoProducts.filter(p => p.scanned).length;
  const totalCount = bingoProducts.length;
  
  // Reward milestones based on bingo completion
  const progressPercentage = totalCount > 0 ? Math.min(100, (scannedCount / totalCount) * 100) : 0;
  const rewardDescription = 'Complete scanning all to unlock reservations';

  const handleCellClick = (product: BingoProduct) => {
    if (!product.scanned) {
      setSelectedProduct(product);
      setIsScanModalOpen(true);
    }
  };

  const handleScanComplete = (sku: string) => {
    onProductScanned(sku);
    setIsScanModalOpen(false);
    setSelectedProduct(null);
  };

  // Waiting State - Ultra Minimalist
  if (isWaiting || bingoProducts.length === 0) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto pb-6">
        {/* Waiting Message */}
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">Waiting for first number</p>
        </div>

        {/* Empty Grid - 3x3 Placeholder */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl bg-white border-2 border-border"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 max-w-2xl mx-auto pb-6 px-4 pt-safe" style={{ paddingTop: 'max(env(safe-area-inset-top), 24px)' }}>
        {/* Header with Settings Icons */}
        <div className="relative">
          {/* Left Icon - Pickup Preferences */}
          <button
            data-walkthrough="pickup-icon"
            onClick={() => setIsPickupPreferencesOpen(true)}
            className="absolute left-0 top-0 w-11 h-11 flex items-center justify-center transition-all active:scale-95 rounded-[1rem_0.3rem_1rem_0.3rem] bg-secondary text-white shadow-[2px_2px_0px_rgba(5,150,105,0.3)] hover:shadow-[3px_3px_0px_rgba(5,150,105,0.4)]"
          >
            <Calendar className="w-5 h-5" />
          </button>

          {/* Right Icon - Language Selector */}
          <button
            data-walkthrough="language-icon"
            onClick={() => setIsLanguageSelectorOpen(true)}
            className="absolute right-0 top-0 w-11 h-11 flex items-center justify-center transition-all active:scale-95 rounded-[1rem_0.3rem_1rem_0.3rem] shadow-[2px_2px_0px_rgba(255,215,0,0.3)] hover:shadow-[3px_3px_0px_rgba(255,215,0,0.4)]"
            style={{ background: 'linear-gradient(135deg, #ffd700 0%, #ffe44d 100%)' }}
          >
            <Languages className="w-5 h-5 text-foreground" />
          </button>

          {/* Week Header - Centered */}
          <div className="text-center space-y-1 pt-1" data-walkthrough="week-header">
            <div className="inline-flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-[0.8rem_0.3rem_0.8rem_0.3rem] bg-primary text-white shadow-[2px_2px_0px_rgba(255,153,51,0.3)]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{weekStartDate} - {weekEndDate}</span>
            </div>
          </div>
        </div>

        {/* Bingo Grid - Red, White & Orange Logo Theme */}
        <div className="bg-white p-6 rounded-[2rem_1rem_2rem_1rem] shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-border/50" data-walkthrough="bingo-grid">
          <div className="grid grid-cols-3 gap-3">
            {bingoProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleCellClick(product)}
                disabled={product.scanned}
                className={`relative aspect-square overflow-hidden transition-all rounded-2xl ${
                  product.scanned
                    ? 'border-2 border-black bg-black'
                    : 'bg-white border-2 border-border/60 active:scale-95'
                }`}
              >
                {product.scanned ? (
                  // Scanned State - Peachy orange background with white checkmark
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* White checkmark icon */}
                    <Check className="w-16 h-16 text-white drop-shadow-sm" strokeWidth={4} />
                  </div>
                ) : (
                  // Unscanned State - Concentric orange circles with dot
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Concentric circles */}
                    <div className="relative w-20 h-20">
                      {/* Outermost circle */}
                      <div className="absolute inset-0 rounded-full border-[3px] border-primary/25"></div>
                      {/* Middle-outer circle */}
                      <div className="absolute inset-[12%] rounded-full border-[3px] border-primary/35"></div>
                      {/* Middle-inner circle */}
                      <div className="absolute inset-[24%] rounded-full border-[3px] border-primary/45"></div>
                      {/* Inner circle */}
                      <div className="absolute inset-[36%] rounded-full border-[3px] border-primary/55"></div>
                      {/* Center dot */}
                      <div className="absolute inset-[48%] rounded-full bg-primary/70"></div>
                    </div>

                    {/* Orange dot indicator in top-right */}
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full shadow-sm"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground flex-1 text-center">
              Tap any to view product details and scan
            </p>
            <button
              onClick={() => setIsBingoInstructionsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[0.8rem] bg-[#ff9933]/10 border border-[#ff9933]/20 text-[#ff9933] active:scale-95 transition-all hover:bg-[#ff9933]/20"
              style={{ fontSize: '13px', fontWeight: '600' }}
            >
              <span>How to Play</span>
            </button>
          </div>
        </div>

        {/* Claim Reward Progress - Colorful & Clickable with Info Icon */}
        <div className="relative" data-walkthrough="progress-bar">
          <button
            onClick={() => setIsClaimModalOpen(true)}
            className="w-full bg-card p-6 border-2 rounded-[2rem_1rem_2rem_1rem] shadow-[4px_4px_0px_rgba(255,215,0,0.2),8px_8px_0px_rgba(255,153,51,0.1)] transition-all active:scale-[0.98] hover:shadow-[6px_6px_0px_rgba(255,215,0,0.3),10px_10px_0px_rgba(255,153,51,0.15)]"
          >
            {/* Header Row */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground">Sparrow Reservations</h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[0.8rem_0.3rem_0.8rem_0.3rem] bg-accent text-foreground shadow-[2px_2px_0px_rgba(255,215,0,0.3)]">
                <Check className="w-3.5 h-3.5" />
                <span className="text-sm">{scannedCount} of {totalCount}</span>
              </div>
            </div>

            {/* Progress Bar - Sparrow gradient (Saffron to Gold) */}
            <div className="relative h-3 bg-muted rounded-full overflow-hidden border-2 border-border">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progressPercentage}%`,
                  background: 'linear-gradient(90deg, #ff9933 0%, #ffd700 100%)'
                }}
              />
            </div>

            {/* Reward Description */}
            <p className="text-sm text-muted-foreground text-center mt-3">
              {rewardDescription}
            </p>
          </button>

          {/* Info Icon - Positioned at top right of progress card */}
          <button
            data-walkthrough="info-icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsHowSparrowWorksOpen(true);
            }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#4169e1] text-white flex items-center justify-center shadow-lg transition-all active:scale-95 hover:shadow-xl"
            aria-label="How Sparrow Works"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* How Sparrow Works Modal */}
        <HowSparrowWorksModal
          open={isHowSparrowWorksOpen}
          onOpenChange={setIsHowSparrowWorksOpen}
        />

        {/* Active Reservation Circles - Stacked vertically on left */}
        {activeReservations.length > 0 && (
          <div className="pl-4">
            <ReservationCircles
              reservations={activeReservations}
              onCircleClick={(reservation) => {
                setSelectedReservation(reservation);
                setIsReservationDetailOpen(true);
              }}
            />
          </div>
        )}
      </div>

      {/* Scan Modal */}
      {selectedProduct && (
        <ScanModal
          isOpen={isScanModalOpen}
          onClose={() => {
            setIsScanModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onScanComplete={handleScanComplete}
        />
      )}

      {/* Language Selector Modal */}
      <LanguageSelector
        isOpen={isLanguageSelectorOpen}
        onClose={() => setIsLanguageSelectorOpen(false)}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Pickup Preferences Modal */}
      <PickupPreferences
        isOpen={isPickupPreferencesOpen}
        onClose={() => setIsPickupPreferencesOpen(false)}
        currentDays={pickupDays}
        currentTime={pickupTime}
        onPreferencesChange={(days, time) => {
          setPickupDays(days);
          setPickupTime(time);
        }}
      />

      {/* Claim Reward Modal */}
      <ClaimRewardModal
        open={isClaimModalOpen}
        onOpenChange={setIsClaimModalOpen}
        scannedCount={scannedCount}
        totalCount={totalCount}
        weekEndDate={weekEndDate}
        rewardDescription={rewardDescription}
        progressPercentage={progressPercentage}
      />

      {/* Reservation Detail Modal */}
      <ReservationDetailModal
        isOpen={isReservationDetailOpen}
        onClose={() => setIsReservationDetailOpen(false)}
        reservation={selectedReservation}
      />

      {/* Bingo Walkthrough */}
      <BingoWalkthrough
        steps={walkthroughSteps}
        isActive={isWalkthroughActive}
        onComplete={handleWalkthroughComplete}
      />

      {/* Walkthrough Help Button */}
      {hasSeenWalkthrough && (
        <WalkthroughHelpButton
          onClick={handleShowWalkthrough}
        />
      )}

      {/* Bingo Instructions Modal */}
      <BingoInstructions
        isOpen={isBingoInstructionsOpen}
        onClose={() => setIsBingoInstructionsOpen(false)}
      />
    </>
  );
}