import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Reservation { id: string; partnerName: string; partnerLogo: string; location: string; time: string; service: string; confirmationCode: string; }

interface ReservationCirclesProps { reservations: Reservation[]; onCircleClick?: (reservation: Reservation) => void; }

export function ReservationCircles({ reservations, onCircleClick }: ReservationCirclesProps) {
  if (reservations.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {reservations.map((reservation, index) => (
        <button
          key={reservation.id}
          onClick={() => onCircleClick?.(reservation)}
          className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-primary shadow-lg active:scale-95 transition-transform"
          style={{ marginLeft: index > 0 ? '-8px' : '0' }}
        >
          <ImageWithFallback src={reservation.partnerLogo} alt={reservation.partnerName} className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  );
}