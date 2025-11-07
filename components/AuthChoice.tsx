import { useState } from 'react';
import { Button } from './ui/button';
import { SignInOptionsSheet } from './SignInOptionsSheet';

interface AuthChoiceProps {
  onLoginSuccess: (name: string) => void;
}

export function AuthChoice({ onLoginSuccess }: AuthChoiceProps) {
  const [showSignInSheet, setShowSignInSheet] = useState(false);

  const handleLoginSuccess = (name: string) => {
    setShowSignInSheet(false);
    onLoginSuccess(name);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden bg-white">
      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 pt-safe min-h-screen flex flex-col overflow-x-hidden">
        {/* Header with Title */}
        <div className="flex-1 flex flex-col justify-center text-center pt-12">
          <h1 
            className="text-[#000000]"
            style={{ 
              fontSize: '48px', 
              fontWeight: '700',
              filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5)) drop-shadow(0 0 30px rgba(255, 153, 51, 0.6)) drop-shadow(0 0 25px rgba(220, 20, 60, 0.4))',
              letterSpacing: '0.02em'
            }}
          >
            Sparrow
          </h1>
        </div>

        {/* Action Buttons - Bottom section */}
        <div className="mt-auto pb-6" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Button 
            onClick={() => setShowSignInSheet(true)} 
            className="w-full h-12 min-h-[48px] rounded-[1.5rem] bg-[#000000] hover:bg-[#1a1a1a] text-white active:scale-[0.98] transition-all"
            style={{ fontSize: '16px', fontWeight: '600' }}
          >
            Sign in
          </Button>
        </div>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center leading-relaxed px-2 mt-4 mb-8 pb-safe">
          By signing in, you agree to our{' '}
          <a href="#" className="underline">Terms</a>.
          Learn how we process your data in our{' '}
          <a href="#" className="underline">Privacy Policy</a> and{' '}
          <a href="#" className="underline">Cookie Policy</a>.
        </p>
      </div>

      {/* Sign In Options Bottom Sheet */}
      <SignInOptionsSheet
        isOpen={showSignInSheet}
        onClose={() => setShowSignInSheet(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}