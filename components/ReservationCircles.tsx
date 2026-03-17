import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Reservation { id: string; partnerName: string; partnerLogo: string; location: string; time: string; service: string; confirmationCode: string; }
interface ReservationCirclesProps { reservations: Reservation[]; onCircleClick: (reservation: Reservation) => void; }

export function ReservationCircles({ reservations, onCircleClick }: ReservationCirclesProps) {
  if (reservations.length === 0) return null;
  return (<div className="md:flex md:flex-row md:gap-2 md:items-center md:static fixed bottom-24 left-4 right-4 z-30 flex flex-row gap-2 items-center" style={{ bottom: 'calc(env(safe-area-inset-bottom) + 6rem)' }}>{reservations.map((reservation) => (<button key={reservation.id} onClick={() => onCircleClick(reservation)} className="relative w-14 h-14 rounded-full bg-white border-2 border-border shadow-md overflow-hidden transition-all active:scale-95 hover:border-primary"><ImageWithFallback src={reservation.partnerLogo} alt={`${reservation.partnerName} logo`} className="w-full h-full object-cover" /><div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary border-2 border-white rounded-full" /></button>))}</div>);
}