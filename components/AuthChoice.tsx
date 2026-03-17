import { useState } from 'react';
import { Button } from './ui/button';
import { SignInOptionsSheet } from './SignInOptionsSheet';
import { PartnerLoginSheet } from './PartnerLoginSheet';

interface AuthChoiceProps { onLoginSuccess: (name: string, userType?: 'user' | 'partner') => void; onPartnerLoginClick: () => void; }

export function AuthChoice({ onLoginSuccess, onPartnerLoginClick }: AuthChoiceProps) {
  const [showSignInSheet, setShowSignInSheet] = useState(false);
  const [showPartnerSheet, setShowPartnerSheet] = useState(false);
  const handleLoginSuccess = (name: string) => { setShowSignInSheet(false); onLoginSuccess(name, 'user'); };
  const handlePartnerLoginSuccess = (name: string) => { setShowPartnerSheet(false); onLoginSuccess(name, 'partner'); };

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-white">
      <div className="relative z-10 w-full max-w-md mx-auto px-6 pt-safe min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center text-center pt-12">
          <h1 className="text-[#000000]" style={{ fontSize: '48px', fontWeight: '700', background: 'linear-gradient(135deg, #dc143c 0%, #ff6347 25%, #ff9933 60%, #ffb366 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '0.02em' }}>
            Sparrow
          </h1>
        </div>
        <div className="mt-auto pb-6" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button onClick={() => setShowPartnerSheet(true)} variant="outline" className="w-full h-12 min-h-[48px] rounded-[1.5rem] border-2 border-[#ff9933] text-[#ff9933] hover:bg-[#ff9933]/10 active:scale-[0.98] transition-all" style={{ fontSize: '16px', fontWeight: '600' }}>
            Partner Login
          </Button>
          <Button onClick={() => setShowSignInSheet(true)} className="w-full h-12 min-h-[48px] rounded-[1.5rem] bg-[#000000] hover:bg-[#1a1a1a] text-white active:scale-[0.98] transition-all" style={{ fontSize: '16px', fontWeight: '600' }}>
            Sign in as User
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center leading-relaxed px-2 mt-4 mb-8 pb-safe">
          By signing in, you agree to our <a href="#" className="underline">Terms</a>. Learn how we process your data in our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Cookie Policy</a>.
        </p>
      </div>
      <SignInOptionsSheet isOpen={showSignInSheet} onClose={() => setShowSignInSheet(false)} onLoginSuccess={handleLoginSuccess} loginType="user" />
      <PartnerLoginSheet isOpen={showPartnerSheet} onClose={() => setShowPartnerSheet(false)} onLoginSuccess={handlePartnerLoginSuccess} />
    </div>
  );
}