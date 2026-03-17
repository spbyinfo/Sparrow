import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export function WeekCountdown() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const sunday = new Date(now);
      sunday.setDate(now.getDate() + (7 - now.getDay()));
      sunday.setHours(23, 59, 59, 999);
      const diff = sunday.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTimeLeft(`${days}d ${hours}h left`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '-0.01em', marginBottom: '4px' }}>This Week's Bingo</h2>
      <div className="flex items-center justify-center gap-2">
        <Calendar className="w-4 h-4 text-primary" />
        <p className="text-sm text-muted-foreground" style={{ fontWeight: '600' }}>{timeLeft}</p>
      </div>
    </div>
  );
}