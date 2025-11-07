import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Store, X, MapPin, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface SuggestBusinessFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuggestBusinessForm({ isOpen, onClose }: SuggestBusinessFormProps) {
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessName.trim() || !location.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast.success('Thank you!', {
        description: `We'll reach out to ${businessName} soon!`,
      });
      setBusinessName('');
      setLocation('');
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setBusinessName('');
    setLocation('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-[400px] p-0 gap-0 border-none bg-background overflow-hidden rounded-[1.5rem]"
      >
        <DialogTitle className="sr-only">Suggest a Business</DialogTitle>
        <DialogDescription className="sr-only">
          Suggest a business you use regularly and would love to get a deal from
        </DialogDescription>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-all active:scale-95"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Header */}
          <div className="flex flex-col items-center pt-8 pb-6 px-6">
            <div className="w-16 h-16 rounded-full bg-[#ff9933]/20 flex items-center justify-center mb-4">
              <Store className="w-7 h-7 text-[#ff9933]" />
            </div>
            <h2 className="text-foreground mb-2 text-center">Suggest a Business</h2>
            <p className="text-muted-foreground text-center" style={{ fontSize: '14px', lineHeight: '1.5' }}>
              Tell us about a business you love and we'll try to partner with them
            </p>
          </div>

          {/* Form Fields */}
          <div className="px-6 pb-6 space-y-5">
            {/* Business Name */}
            <div className="space-y-2">
              <Label 
                htmlFor="businessName" 
                className="text-foreground"
                style={{ fontSize: '14px', fontWeight: '500' }}
              >
                Business Name
              </Label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="businessName"
                  type="text"
                  placeholder="e.g., Starbucks, McDonald's"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="pl-11 h-12 min-h-[48px] rounded-[1.5rem] border-border bg-background"
                  style={{ fontSize: '16px' }}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label 
                htmlFor="location" 
                className="text-foreground"
                style={{ fontSize: '14px', fontWeight: '500' }}
              >
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., Bandra West, Mumbai"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-11 h-12 min-h-[48px] rounded-[1.5rem] border-border bg-background"
                  style={{ fontSize: '16px' }}
                  required
                />
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-[#ff9933]/10 border border-[#ff9933]/30 rounded-[1.5rem] p-4">
              <p className="text-[#ff9933] text-center" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                💡 We'll reach out to this business to explore partnership opportunities
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6 flex flex-col gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 min-h-[48px] rounded-[1.5rem] bg-[#ff9933] text-white hover:bg-[#ff9933]/90 shadow-lg shadow-[#ff9933]/20 transition-all active:scale-[0.98]"
              style={{ fontSize: '16px', fontWeight: '500' }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Submit Suggestion
                </span>
              )}
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="w-full h-12 min-h-[48px] rounded-[1.5rem] bg-background text-foreground border-border hover:bg-muted"
              style={{ fontSize: '16px', fontWeight: '500' }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
