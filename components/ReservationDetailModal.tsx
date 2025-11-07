import { MapPin, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Reservation } from './ReservationCircles';

interface ReservationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
}

export function ReservationDetailModal({ isOpen, onClose, reservation }: ReservationDetailModalProps) {
  if (!reservation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[90%] p-0 gap-0 bg-white border-0 overflow-hidden [&>button]:hidden" style={{
        borderRadius: '1.5rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
      }}>
        {/* Accessibility */}
        <DialogTitle className="sr-only">
          Reservation at {reservation.partnerName}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Your active reservation details including location, time, and service information.
        </DialogDescription>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-all active:scale-95"
          aria-label="Close modal"
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Top Section - Logo & Heading */}
        <div className="px-8 pt-10 pb-6 space-y-4">
          {/* Square Logo Container with Gradient Background */}
          <div className="flex justify-center">
            <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-[#e8f5f1] via-[#fff5e6] to-[#e8f5f1] flex items-center justify-center">
              <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <ImageWithFallback 
                  src={reservation.partnerLogo}
                  alt={`${reservation.partnerName} Logo`}
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-1 px-2">
            <h2 className="text-foreground" style={{ fontSize: '22px', lineHeight: '1.2', fontWeight: 600 }}>
              {reservation.partnerName}
            </h2>
            <p className="text-[#059669]" style={{ fontSize: '15px', fontWeight: 600 }}>Active Reservation</p>
          </div>
        </div>

        {/* Bottom Section - Details */}
        <div className="px-6 py-6 space-y-4 border-t border-gray-200">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 pt-1.5">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-1">Location</p>
              <p className="text-sm text-gray-900 font-medium">{reservation.location}</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 pt-1.5">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-1">Time</p>
              <p className="text-sm text-gray-900 font-medium">{reservation.time}</p>
            </div>
          </div>

          {/* Service */}
          <div className="pt-3 border-t border-dashed border-gray-200">
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Service</p>
              <p className="text-sm text-gray-900 font-medium">{reservation.service}</p>
            </div>
          </div>

          {/* Confirmation Code - Prominent Display */}
          <div className="pt-4 border-t border-gray-200">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium text-center">Order ID - Show at Venue</p>
              <div className="bg-gradient-to-r from-[#ff9933] to-[#ffd700] p-4 rounded-2xl shadow-sm">
                <p className="text-center text-white font-mono tracking-wider" style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '2px' }}>
                  {reservation.confirmationCode}
                </p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center pt-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wide font-medium bg-secondary text-white">
              Confirmed
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}