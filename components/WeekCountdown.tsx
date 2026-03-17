import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

export function WeekCountdown() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextSunday = new Date(now);
      const currentDay = now.getDay();
      const daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay;
      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(23, 59, 59, 999);
      const diff = nextSunday.getTime() - now.getTime();
      if (diff <= 0) return 'Resetting...';
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      if (days > 0) return `Resets in ${days}d ${hours}h ${minutes}m`;
      else if (hours > 0) return `Resets in ${hours}h ${minutes}m`;
      else return `Resets in ${minutes}m`;
    };
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => { setTimeLeft(calculateTimeLeft()); }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-[0.8rem_0.3rem_0.8rem_0.3rem] bg-primary text-white shadow-[2px_2px_0px_rgba(255,153,51,0.3)]">
      <Calendar className="w-3.5 h-3.5" />
      <span>{timeLeft}</span>
    </div>
  );
}