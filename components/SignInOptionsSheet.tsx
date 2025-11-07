import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft } from 'lucide-react';

interface SignInOptionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

type SheetView = 'options' | 'phone' | 'otp';

export function SignInOptionsSheet({
  isOpen,
  onClose,
  onLoginSuccess
}: SignInOptionsSheetProps) {
  const [currentView, setCurrentView] = useState<SheetView>('options');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handlePhoneSubmit = () => {
    // Validate phone number (8 digits for demo)
    if (phoneNumber.length !== 8) {
      setError('Please enter a valid 8-digit phone number');
      return;
    }
    
    // Check demo phone number
    if (phoneNumber !== '25595396') {
      setError('For demo, use: 25595396');
      return;
    }
    
    setError('');
    setCurrentView('otp');
  };

  const handleOtpSubmit = () => {
    // Validate OTP
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    
    if (otp !== '123456') {
      setError('Invalid OTP. Use: 123456');
      return;
    }
    
    setError('');
    onLoginSuccess('Demo User');
  };

  const handleBack = () => {
    if (currentView === 'otp') {
      setCurrentView('phone');
      setOtp('');
      setError('');
    } else if (currentView === 'phone') {
      setCurrentView('options');
      setPhoneNumber('');
      setError('');
    } else {
      onClose();
    }
  };

  const handleClose = () => {
    setCurrentView('options');
    setPhoneNumber('');
    setOtp('');
    setError('');
    onClose();
  };

  const renderContent = () => {
    if (currentView === 'options') {
      return (
        <>
          {/* Helper Text */}
          <p 
            className="text-center text-muted-foreground mb-6" 
            style={{ 
              fontSize: '14px', 
              lineHeight: '1.5',
              margin: '0 0 24px 0'
            }}
          >
            Choose your sign in method
          </p>

          {/* Sign In Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {/* Apple */}
            <Button
              onClick={() => console.log('Apple sign-in')}
              variant="outline"
              className="w-full rounded-[1.5rem] bg-white hover:bg-gray-50 border-2 border-border active:scale-[0.98] transition-all"
              style={{ 
                fontSize: '16px', 
                fontWeight: '500',
                height: '48px',
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              Sign in with Apple
            </Button>

            {/* Google */}
            <Button
              onClick={() => console.log('Google sign-in')}
              variant="outline"
              className="w-full rounded-[1.5rem] bg-white hover:bg-gray-50 border-2 border-border active:scale-[0.98] transition-all"
              style={{ 
                fontSize: '16px', 
                fontWeight: '500',
                height: '48px',
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>

            {/* Phone Number */}
            <Button
              onClick={() => setCurrentView('phone')}
              className="w-full rounded-[1.5rem] bg-[#ff9933] hover:bg-[#e67300] text-white active:scale-[0.98] transition-all"
              style={{ 
                fontSize: '16px', 
                fontWeight: '600',
                height: '48px',
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Sign in with Phone Number
            </Button>
          </div>

          {/* Skip to App Button */}
          <button
            onClick={() => {
              onClose();
              onLoginSuccess('Guest User');
            }}
            className="w-full text-center text-foreground active:scale-95 transition-transform"
            style={{ 
              fontSize: '16px', 
              fontWeight: '500',
              padding: '12px 0',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Skip for now
          </button>
        </>
      );
    }

    if (currentView === 'phone') {
      return (
        <>
          {/* Header with back button */}
          <div className="flex items-center mb-4">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="flex-1 text-center" style={{ fontSize: '18px', fontWeight: '600', marginRight: '32px' }}>
              My number is
            </h3>
          </div>

          <p className="text-center text-muted-foreground mb-4" style={{ fontSize: '14px' }}>
            We'll text you a code to verify your phone
          </p>

          {/* Demo Helper */}
          <div className="mb-4 p-3 bg-[#faf3e0] border border-[#ff9933]/20 rounded-[1rem]">
            <p className="text-center text-muted-foreground" style={{ fontSize: '13px' }}>
              <span className="text-foreground" style={{ fontWeight: '500' }}>Demo:</span> 25595396
            </p>
          </div>

          <div className="mb-4">
            <Input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 8));
                setError('');
              }}
              className="h-14 text-center border-2"
              style={{ 
                fontSize: '24px', 
                letterSpacing: '3px', 
                fontWeight: '600',
                color: '#000000'
              }}
              maxLength={8}
              autoFocus
            />
            {error && (
              <p className="text-destructive text-center mt-2" style={{ fontSize: '13px' }}>
                {error}
              </p>
            )}
          </div>

          <Button
            onClick={handlePhoneSubmit}
            disabled={phoneNumber.length !== 8}
            className="w-full rounded-[1.5rem] bg-[#ff9933] hover:bg-[#e67300] text-white active:scale-[0.98] transition-all disabled:opacity-50"
            style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              height: '48px',
              minHeight: '48px'
            }}
          >
            Continue
          </Button>
        </>
      );
    }

    if (currentView === 'otp') {
      return (
        <>
          {/* Header with back button */}
          <div className="flex items-center mb-4">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="flex-1 text-center" style={{ fontSize: '18px', fontWeight: '600', marginRight: '32px' }}>
              Enter the code
            </h3>
          </div>

          <p className="text-center text-muted-foreground mb-4" style={{ fontSize: '14px' }}>
            We sent a code to {phoneNumber}
          </p>

          {/* Demo Helper */}
          <div className="mb-4 p-3 bg-[#faf3e0] border border-[#ff9933]/20 rounded-[1rem]">
            <p className="text-center text-muted-foreground" style={{ fontSize: '13px' }}>
              <span className="text-foreground" style={{ fontWeight: '500' }}>Demo OTP:</span> 123456
            </p>
          </div>

          <div className="mb-4">
            <Input
              type="text"
              inputMode="numeric"
              placeholder="• • • • • •"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                setError('');
              }}
              className="h-16 text-center border-2"
              style={{ 
                fontSize: '32px', 
                letterSpacing: '16px', 
                fontWeight: '700',
                color: '#000000'
              }}
              maxLength={6}
              autoFocus
            />
            {error && (
              <p className="text-destructive text-center mt-2" style={{ fontSize: '13px' }}>
                {error}
              </p>
            )}
          </div>

          <Button
            onClick={handleOtpSubmit}
            disabled={otp.length !== 6}
            className="w-full rounded-[1.5rem] bg-[#ff9933] hover:bg-[#e67300] text-white active:scale-[0.98] transition-all disabled:opacity-50"
            style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              height: '48px',
              minHeight: '48px'
            }}
          >
            Verify & Sign In
          </Button>

          <button
            onClick={() => console.log('Resend code')}
            className="w-full text-center text-muted-foreground hover:text-foreground active:scale-95 transition-transform mt-4"
            style={{ 
              fontSize: '14px', 
              fontWeight: '500',
              padding: '12px 0'
            }}
          >
            Resend code
          </button>
        </>
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
              mass: 0.8
            }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2rem] z-50"
            style={{ 
              maxHeight: '85vh',
              maxWidth: '100vw',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2" style={{ flexShrink: 0 }}>
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Content */}
            <div 
              className="px-6 pt-2"
              style={{ 
                paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {renderContent()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
