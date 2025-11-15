import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Calendar as CalendarIcon, X, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

interface PickupPreferencesProps {
  isOpen: boolean;
  onClose: () => void;
  currentDays: string[];
  currentTime: { hour: number; minute: number; period: 'AM' | 'PM' };
  onPreferencesChange: (days: string[], time: { hour: number; minute: number; period: 'AM' | 'PM' }) => void;
}

type TimeSlot = '7:30am' | '9:30am';

export function PickupPreferences({ 
  isOpen, 
  onClose, 
  currentDays, 
  currentTime, 
  onPreferencesChange 
}: PickupPreferencesProps) {
  // Convert current time to time slot
  const getInitialSlot = (): TimeSlot => {
    if (currentTime.hour === 7 && currentTime.minute === 30) {
      return '7:30am';
    }
    return '9:30am';
  };

  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>(getInitialSlot());

  const handleSave = () => {
    const time = selectedSlot === '7:30am' 
      ? { hour: 7, minute: 30, period: 'AM' as 'AM' | 'PM' }
      : { hour: 9, minute: 30, period: 'AM' as 'AM' | 'PM' };
    
    onPreferencesChange(currentDays, time);
    onClose();
  };

  const timeSlots: { value: TimeSlot; label: string; description: string }[] = [
    {
      value: '7:30am',
      label: 'Early Morning',
      description: 'Before 7:30 AM'
    },
    {
      value: '9:30am',
      label: 'Late Morning',
      description: 'Before 9:30 AM'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[400px] p-0 gap-0 border-none bg-[#1c1c1e] overflow-hidden"
      >
        <DialogTitle className="sr-only">Pickup Preferences</DialogTitle>
        <DialogDescription className="sr-only">
          Choose your preferred pickup time for automatic next-day collection
        </DialogDescription>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all active:scale-95"
        >
          <X className="w-4 h-4 text-white/60" />
        </button>

        <div className="flex flex-col">
          {/* Header */}
          <div className="flex flex-col items-center pt-6 pb-4 px-6">
            <div className="w-14 h-14 rounded-full bg-[#dc143c]/20 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-[#dc143c]" />
            </div>
            <h2 className="text-white mb-1">Pickup Preference</h2>
            <p className="text-sm text-white/50 text-center">
              Choose your preferred pickup window
            </p>
          </div>

          {/* Info Banner */}
          <div className="px-4 pb-4">
            <div className="bg-[#059669]/10 border border-[#059669]/30 rounded-2xl p-3 mb-4">
              <p className="text-xs text-[#059669] text-center leading-relaxed">
                All scans before 11:00 PM will be automatically picked up the next morning at your preferred time
              </p>
            </div>

            {/* Time Slot Options */}
            <div className="space-y-3">
              {timeSlots.map((slot) => {
                const isSelected = selectedSlot === slot.value;
                
                return (
                  <button
                    key={slot.value}
                    onClick={() => setSelectedSlot(slot.value)}
                    className={`
                      w-full p-4 rounded-2xl transition-all active:scale-[0.98]
                      flex items-center justify-between
                      ${isSelected 
                        ? 'bg-[#dc143c] border-2 border-[#dc143c]' 
                        : 'bg-[#2c2c2e] border-2 border-transparent hover:border-white/10'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${isSelected 
                          ? 'border-white bg-white' 
                          : 'border-white/30'
                        }
                      `}>
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#dc143c]" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className={`text-sm ${isSelected ? 'text-white' : 'text-white/90'}`}>
                          {slot.label}
                        </p>
                        <p className={`text-xs ${isSelected ? 'text-white/70' : 'text-white/50'}`}>
                          {slot.description}
                        </p>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 pb-6 pt-2 flex gap-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 rounded-xl bg-white/5 text-white border-white/10 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-12 rounded-xl bg-[#dc143c] text-white hover:bg-[#dc143c]/90 shadow-lg shadow-[#dc143c]/20 transition-all active:scale-[0.98]"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
