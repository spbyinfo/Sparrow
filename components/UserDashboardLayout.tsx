import { ReactNode } from 'react';
import { Grid3x3, Coins, Ticket, User } from 'lucide-react';
import { Toaster } from './ui/sonner';

interface UserDashboardLayoutProps {
  children: ReactNode;
  activePage: string;
  onPageChange: (page: string) => void;
  userName: string;
  userCredits: number;
}

export function UserDashboardLayout({
  children,
  activePage,
  onPageChange
}: UserDashboardLayoutProps) {
  const navItems = [
    { id: 'bingo', label: 'Bingo', icon: Grid3x3 },
    { id: 'credits', label: 'Credits', icon: Coins },
    { id: 'pass', label: 'Pass', icon: Ticket },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background w-full overflow-x-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-[88px] w-full">
        {children}
      </main>

      {/* Bottom Navigation - Fixed and Safe */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="grid grid-cols-4 gap-0 px-2 pb-safe pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className="flex flex-col items-center justify-center gap-1 py-2 min-h-[48px] transition-all active:scale-95"
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-[1rem_0.3rem_1rem_0.3rem] transition-all ${
                  isActive 
                    ? 'bg-black shadow-[2px_2px_0px_rgba(220,20,60,0.3)]' 
                    : 'bg-transparent'
                }`}>
                  <Icon 
                    className={isActive ? 'text-white' : 'text-foreground/60'}
                    style={{ width: '20px', height: '20px', strokeWidth: 2 }}
                  />
                </div>
                <span className={`text-xs ${
                  isActive ? 'text-foreground' : 'text-foreground/60'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}