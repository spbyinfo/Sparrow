import { useState, useRef, useEffect } from 'react';
import { X, MapPin, Clock, ChevronRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Partner {
  id: string;
  name: string;
  category: string;
  location: string;
  area: string;
  credits: number;
  servicesLeft: number;
  pickupTime: string;
  rating: number;
  distance: string;
  image: string;
  logo: string;
}

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: Partner | null;
  onPurchase: (partnerId: string, credits: number) => void;
  userCredits: number;
  hasPurchased?: boolean;
  userProfile?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  onNavigateToProfile?: () => void;
}

export function ReservationModal({ isOpen, onClose, partner, onPurchase, userCredits, hasPurchased = false, userProfile, onNavigateToProfile }: ReservationModalProps) {
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isArrivalConfirmed, setIsArrivalConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [isPurchased, setIsPurchased] = useState(hasPurchased);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setSwipeProgress(0);
      setIsArrivalConfirmed(false);
      setBookingId('');
      setIsPurchased(hasPurchased);
    } else {
      setIsPurchased(hasPurchased);
    }
  }, [isOpen, hasPurchased]);

  const generateBookingId = () => {
    // Generate a unique 8-character booking ID
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'SPR-';
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isArrivalConfirmed) return;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current || isArrivalConfirmed) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const maxWidth = rect.width - 64; // Subtract thumb width
    const progress = Math.max(0, Math.min(1, x / maxWidth));
    
    setSwipeProgress(progress);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || isArrivalConfirmed) return;
    isDragging.current = false;

    if (swipeProgress > 0.85) {
      // Check eKYC before confirming arrival
      if (!isProfileComplete) {
        setSwipeProgress(0);
        return;
      }
      setSwipeProgress(1);
      setIsArrivalConfirmed(true);
      const id = generateBookingId();
      setBookingId(id);
    } else {
      setSwipeProgress(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isArrivalConfirmed) return;
    isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current || isArrivalConfirmed) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const maxWidth = rect.width - 64;
    const progress = Math.max(0, Math.min(1, x / maxWidth));
    
    setSwipeProgress(progress);
  };

  const handleMouseUp = () => {
    if (!isDragging.current || isArrivalConfirmed) return;
    isDragging.current = false;

    if (swipeProgress > 0.85) {
      // Check eKYC before confirming arrival
      if (!isProfileComplete) {
        setSwipeProgress(0);
        return;
      }
      setSwipeProgress(1);
      setIsArrivalConfirmed(true);
      const id = generateBookingId();
      setBookingId(id);
    } else {
      setSwipeProgress(0);
    }
  };

  const handlePurchase = () => {
    if (!partner || userCredits < partner.credits) return;
    setIsPurchased(true);
    onPurchase(partner.id, partner.credits);
  };

  // Check if user profile is complete (eKYC verification)
  const isProfileComplete = userProfile 
    && userProfile.name.trim() !== '' 
    && userProfile.email.trim() !== '' 
    && userProfile.phone.trim() !== '' 
    && userProfile.address.trim() !== '';

  if (!isOpen || !partner) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-background rounded-[2rem_1rem_2rem_1rem] shadow-2xl w-full max-w-md overflow-hidden"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-90 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Partner Logo */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <div 
              className="w-20 h-20 rounded-[1.5rem] bg-card border-2 border-border flex items-center justify-center shadow-lg"
              style={{ fontSize: '40px' }}
            >
              {partner.logo}
            </div>
            <div className="text-center">
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                {partner.name}
              </h2>
              <div className={`inline-block px-3 py-1 rounded-full ${
                isArrivalConfirmed 
                  ? 'bg-[#059669] text-white' 
                  : 'bg-[#ff9933]/10 text-[#ff9933]'
              }`}>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>
                  {isArrivalConfirmed ? 'Confirmed Reservation' : 'Active Reservation'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mx-6" />

        {/* Details */}
        <div className="p-6 space-y-4">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 min-w-[40px] rounded-full bg-muted flex items-center justify-center">
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                Location
              </p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {partner.location}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 min-w-[40px] rounded-full bg-muted flex items-center justify-center">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                Time
              </p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>
                {partner.pickupTime}
              </p>
            </div>
          </div>

          {/* Service */}
          <div className="bg-muted rounded-[1.5rem] p-4">
            <p className="text-muted-foreground" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
              Service
            </p>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>
              1 surprise service
            </p>
          </div>

          {/* Booking ID - Only show after arrival confirmation */}
          {isArrivalConfirmed && bookingId && (
            <div className="bg-[#059669]/10 border-2 border-[#059669] rounded-[1.5rem] p-4">
              <p className="text-[#059669] text-center" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                Booking ID
              </p>
              <p className="text-center text-[#059669]" style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '2px' }}>
                {bookingId}
              </p>
              <p className="text-center text-muted-foreground mt-2" style={{ fontSize: '14px' }}>
                Show this to reception
              </p>
            </div>
          )}

          {/* Credits cost - Show before purchase */}
          {!isPurchased && (
            <div className="bg-[#ff9933]/10 border border-[#ff9933]/30 rounded-[1.5rem] p-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                  Cost
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[#ff9933]" style={{ fontSize: '24px', fontWeight: '700' }}>
                    {partner.credits}
                  </span>
                  <span className="text-muted-foreground" style={{ fontSize: '14px' }}>
                    credits
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                  Your balance
                </p>
                <span style={{ fontSize: '16px', fontWeight: '600' }}>
                  {userCredits} credits
                </span>
              </div>
            </div>
          )}

          {/* Already purchased message */}
          {isPurchased && !isArrivalConfirmed && !isProfileComplete && (
            <div className="bg-[#dc143c]/10 border-2 border-[#dc143c]/30 rounded-[1.5rem] p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 min-w-[40px] rounded-full bg-[#dc143c]/20 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="#dc143c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[#dc143c]" style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                    Profile verification required
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: '13px', lineHeight: '1.4' }}>
                    Complete your profile to confirm arrival and receive your booking ID.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isPurchased && !isArrivalConfirmed && isProfileComplete && (
            <div className="bg-[#059669]/10 border border-[#059669]/30 rounded-[1.5rem] p-4 text-center">
              <p className="text-[#059669]" style={{ fontSize: '14px', fontWeight: '600' }}>
                ✓ Reservation purchased
              </p>
              <p className="text-muted-foreground mt-1" style={{ fontSize: '12px' }}>
                Swipe below when you arrive at the location
              </p>
            </div>
          )}
        </div>

        {/* Purchase Button - Show before purchase */}
        {!isPurchased && (
          <div className="px-6 pb-6">
            <Button
              onClick={handlePurchase}
              disabled={userCredits < partner.credits}
              className="w-full h-14 min-h-[56px] rounded-[1.5rem] bg-[#ff9933] hover:bg-[#e68929] text-white shadow-md active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontSize: '18px', fontWeight: '700' }}
            >
              {userCredits < partner.credits ? 'Insufficient Credits' : 'Purchase Reservation'}
            </Button>
          </div>
        )}

        {/* Complete Profile Button - Show after purchase if profile incomplete */}
        {isPurchased && !isArrivalConfirmed && !isProfileComplete && onNavigateToProfile && (
          <div className="px-6 pb-6">
            <Button
              onClick={() => {
                onClose();
                onNavigateToProfile();
              }}
              className="w-full h-14 min-h-[56px] rounded-[1.5rem] bg-[#dc143c] hover:bg-[#c01230] text-white shadow-md active:scale-[0.98] transition-all"
              style={{ fontSize: '18px', fontWeight: '700' }}
            >
              Complete Profile to Confirm
            </Button>
          </div>
        )}

        {/* Swipe to Confirm - Show after purchase, before arrival confirmation */}
        {isPurchased && !isArrivalConfirmed && isProfileComplete && (
          <div className="px-6 pb-6">
            <div
              ref={containerRef}
              className="relative h-16 bg-muted rounded-[1.5rem] overflow-hidden select-none touch-none"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Progress background */}
              <div 
                className="absolute inset-0 bg-[#059669] transition-all"
                style={{ 
                  width: `${swipeProgress * 100}%`,
                  opacity: 0.2 + (swipeProgress * 0.3)
                }}
              />
              
              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span 
                  className="transition-opacity"
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: '600',
                    opacity: 1 - swipeProgress,
                    color: '#666'
                  }}
                >
                  Swipe to confirm arrival
                </span>
              </div>

              {/* Slider thumb */}
              <div
                ref={sliderRef}
                className="absolute top-1 left-1 w-14 h-14 bg-[#059669] rounded-[1.25rem] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg transition-transform active:scale-95"
                style={{ 
                  transform: `translateX(${swipeProgress * (containerRef.current ? containerRef.current.offsetWidth - 64 : 0)}px)`
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Confirmed State Button */}
        {isArrivalConfirmed && (
          <div className="px-6 pb-6">
            <div className="h-16 bg-[#059669] rounded-[1.5rem] flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Check className="w-5 h-5 text-[#059669]" />
              </div>
              <span className="text-white" style={{ fontSize: '18px', fontWeight: '700' }}>
                Arrival Confirmed
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}