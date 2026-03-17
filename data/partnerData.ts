export interface TimeSlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  max_bookings: number;
}

export interface PartnerOffer {
  id: string;
  service_name: string;
  description: string;
  credit_price: number;
  original_price: number;
  discount_percentage: number;
  category: string;
  booking_required: boolean;
  quantity_available: number | null;
  active: boolean;
  time_slots?: TimeSlot[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  location: string;
  color: string;
  offers: PartnerOffer[];
  weeklySchedule: Record<number, string[]>;
}

export const PARTNERS: Partner[] = [
  {
    id: 'salon-partner-1',
    name: 'Radiance Hair Studio',
    logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
    category: 'Hair Salon',
    description: 'Premium hair care and styling services',
    location: 'Bangalore',
    color: '#ff9933',
    offers: [
      { id: 'haircut-1', service_name: 'Signature Haircut', description: 'Professional cut and styling by expert stylists', credit_price: 400, original_price: 800, discount_percentage: 50, category: 'Hair Salon', booking_required: true, quantity_available: null, active: true, time_slots: [{ id: 's1', day_of_week: 1, start_time: '10:00', end_time: '11:00', max_bookings: 6 }, { id: 's2', day_of_week: 1, start_time: '14:00', end_time: '15:00', max_bookings: 6 }] },
      { id: 'color-1', service_name: 'Color Treatment', description: 'Full hair color or highlights with premium products', credit_price: 900, original_price: 1500, discount_percentage: 40, category: 'Hair Salon', booking_required: true, quantity_available: null, active: true },
      { id: 'blowdry-1', service_name: 'Blowdry & Style', description: 'Professional blowdry with heat protection', credit_price: 250, original_price: 500, discount_percentage: 50, category: 'Hair Salon', booking_required: true, quantity_available: null, active: true },
      { id: 'treatment-1', service_name: 'Hair Spa Treatment', description: 'Deep conditioning treatment for hair health', credit_price: 600, original_price: 1000, discount_percentage: 40, category: 'Hair Salon', booking_required: true, quantity_available: null, active: true }
    ],
    weeklySchedule: { 1: ['haircut-1', 'blowdry-1', 'treatment-1'], 2: ['haircut-1', 'color-1', 'blowdry-1'] }
  }
];

export const getPartnerById = (partnerId: string): Partner | null => PARTNERS.find(p => p.id === partnerId) || null;
export const getAllActiveOffers = (): Array<PartnerOffer & { partnerName: string; partnerLogo: string; partnerCategory: string }> => {
  const allOffers: Array<PartnerOffer & { partnerName: string; partnerLogo: string; partnerCategory: string }> = [];
  PARTNERS.forEach(partner => { partner.offers.forEach(offer => { if (offer.active) allOffers.push({ ...offer, partnerName: partner.name, partnerLogo: partner.logo, partnerCategory: partner.category }); }); });
  return allOffers;
};