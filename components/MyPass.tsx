import { useState, useEffect } from 'react';
import { Search, Store, MapPin, Star, Heart, ChevronDown, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { SuggestBusinessForm } from './SuggestBusinessForm';
import { ReservationModal } from './ReservationModal';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Transaction {
  id: string;
  date: string;
  time: string;
  description: string;
  credits: number;
}

interface BingoProduct {
  scanned: boolean;
  credits: number;
}

interface MyPassProps {
  totalCredits: number;
  transactions: Transaction[];
  bingoProducts: BingoProduct[];
  userProfile?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  onNavigateToProfile?: () => void;
}

interface Partner {
  id: string;
  name: string;
  category: string;
  location: string;
  area: string;
  credits: number;
  originalPrice: number;
  servicesLeft: number;
  pickupTime: string;
  rating: number;
  distance: string;
  image: string;
  logo: string;
  badge?: 'Popular' | 'Selling fast';
}

export function MyPass({ totalCredits, userProfile, onNavigateToProfile }: MyPassProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showMapControls, setShowMapControls] = useState(false);
  const [distance, setDistance] = useState([3]);
  const [sortBy, setSortBy] = useState('Relevance');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isSuggestFormOpen, setIsSuggestFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [partnersInventory, setPartnersInventory] = useState<Record<string, number>>({});

  // Fetch inventory for all partners on mount
  useEffect(() => {
    const fetchInventory = async () => {
      const inventory: Record<string, number> = {};
      
      // Fetch inventory for each partner
      for (const partner of partners) {
        try {
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-efcc1648/inventory/${partner.id}`,
            {
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
              },
            }
          );
          const data = await response.json();
          
          if (data.success && data.inventory) {
            inventory[partner.id] = data.inventory.available || 0;
          } else {
            // Default to hardcoded value if no inventory set
            inventory[partner.id] = partner.servicesLeft;
          }
        } catch (error) {
          console.error(`Error fetching inventory for ${partner.id}:`, error);
          // Fallback to hardcoded value
          inventory[partner.id] = partner.servicesLeft;
        }
      }
      
      setPartnersInventory(inventory);
    };

    fetchInventory();
  }, []);

  const handleReservation = async (partnerId: string, credits: number) => {
    try {
      // Since it's FREE now, we just create the reservation without charging
      const userId = userProfile?.email || 'guest-' + Date.now();
      
      const partner = partners.find(p => p.id === partnerId);
      if (!partner) {
        toast.error('Partner not found');
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-efcc1648/reservations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            userId,
            businessId: partner.id,
            businessName: partner.name,
            userName: userProfile?.name || 'Guest User',
            userEmail: userProfile?.email || '',
            userPhone: userProfile?.phone || '',
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(`Reserved! Code: ${data.reservation.confirmationCode}`);
        
        // Update local inventory
        setPartnersInventory(prev => ({
          ...prev,
          [partnerId]: Math.max(0, (prev[partnerId] || 0) - 1),
        }));
      } else {
        toast.error(data.error || 'Failed to create reservation');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error('Failed to create reservation. Please try again.');
    }
  };

  const categories = [
    { id: 'All', name: 'All', icon: '🌟' },
    { id: 'Beauty & Grooming', name: 'Care', icon: '💇' },
    { id: 'Entertainment', name: 'Entertainment', icon: '🎬' },
    { id: 'Healthcare Services', name: 'Medical', icon: '⚕️' },
    { id: 'Fitness & Wellness', name: 'Fitness', icon: '🧘' },
    { id: 'Arts & Learning', name: 'Learning', icon: '🎨' },
    { id: 'Professional Services', name: 'Services', icon: '📸' },
    { id: 'Automotive Services', name: 'Automotive', icon: '🚗' },
  ];

  const toggleFavorite = (partnerId: string, partnerName: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      const isRemoving = newFavorites.has(partnerId);
      
      if (isRemoving) {
        newFavorites.delete(partnerId);
        toast.success('Removed from favorites');
      } else {
        newFavorites.add(partnerId);
        toast.success('Added to favorites');
      }
      return newFavorites;
    });
  };

  const partners: Partner[] = [
    {
      id: '1',
      name: 'Looks Hair & Nail Salon - Bandra',
      category: 'Beauty & Grooming',
      location: 'Bandra West, Mumbai',
      area: 'Linking Road',
      credits: 500,
      originalPrice: 1800,
      servicesLeft: 12,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.6,
      distance: '1.2 km',
      image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjIyODI1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      logo: '💇',
      badge: 'Popular'
    },
    {
      id: '2',
      name: 'Cinema - Phoenix Mall',
      category: 'Entertainment',
      location: 'Lower Parel, Mumbai',
      area: 'Phoenix Palladium',
      credits: 800,
      originalPrice: 2400,
      servicesLeft: 8,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.3,
      distance: '2.8 km',
      image: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzYyMTYyOTU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      logo: '🎬',
      badge: 'Selling fast'
    },
    {
      id: '3',
      name: 'Medical Consultation - Andheri',
      category: 'Healthcare Services',
      location: 'Andheri West, Mumbai',
      area: 'Veera Desai Road',
      credits: 1000,
      originalPrice: 3000,
      servicesLeft: 0,
      pickupTime: 'Currently unavailable',
      rating: 4.5,
      distance: '4.1 km',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBjbGluaWN8ZW58MXx8fHwxNzMwNzQ1NzAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      logo: '⚕️'
    },
    {
      id: '4',
      name: 'Yoga Trial - Powai',
      category: 'Fitness & Wellness',
      location: 'Powai, Mumbai',
      area: 'Hiranandani Gardens',
      credits: 400,
      originalPrice: 1500,
      servicesLeft: 6,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.8,
      distance: '3.5 km',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwY2xhc3N8ZW58MXx8fHwxNzMwNzQ1ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      logo: '🧘',
      badge: 'Popular'
    },
    {
      id: '5',
      name: 'Dance Class Trial - Bandra',
      category: 'Arts & Learning',
      location: 'Bandra West, Mumbai',
      area: 'Hill Road',
      credits: 350,
      originalPrice: 1200,
      servicesLeft: 4,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.6,
      distance: '1.8 km',
      image: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMGNsYXNzfGVufDF8fHx8MTczMDc0NTkwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      logo: '💃',
      badge: 'Selling fast'
    },
    {
      id: '6',
      name: 'Guitar Lesson - Juhu',
      category: 'Arts & Learning',
      location: 'Juhu, Mumbai',
      area: 'JVPD Scheme',
      credits: 450,
      originalPrice: 1800,
      servicesLeft: 2,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.7,
      distance: '2.3 km',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWl0YXIlMjBsZXNzb258ZW58MXx8fHwxNzMwNzQ2MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      logo: '🎸'
    },
    {
      id: '7',
      name: 'Photography Session - Colaba',
      category: 'Professional Services',
      location: 'Colaba, Mumbai',
      area: 'Regal Cinema',
      credits: 900,
      originalPrice: 3500,
      servicesLeft: 1,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.9,
      distance: '5.2 km',
      image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpb3xlbnwxfHx8fDE3MzA3NDYxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      logo: '📸',
      badge: 'Selling fast'
    },
    {
      id: '8',
      name: 'Cooking Workshop - Dadar',
      category: 'Arts & Learning',
      location: 'Dadar, Mumbai',
      area: 'Shivaji Park',
      credits: 550,
      originalPrice: 2000,
      servicesLeft: 5,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.5,
      distance: '4.0 km',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwY2xhc3N8ZW58MXx8fHwxNzMwNzQ2MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      logo: '👨‍🍳'
    },
    {
      id: '9',
      name: 'Stand-Up Comedy - Lower Parel',
      category: 'Entertainment',
      location: 'Lower Parel, Mumbai',
      area: 'Kamala Mills',
      credits: 300,
      originalPrice: 800,
      servicesLeft: 15,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.4,
      distance: '2.9 km',
      image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBzaG93fGVufDF8fHx8MTczMDc0NjMwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      logo: '🎭',
      badge: 'Popular'
    },
    {
      id: '10',
      name: 'Car Detailing - Worli',
      category: 'Automotive Services',
      location: 'Worli, Mumbai',
      area: 'Annie Besant Road',
      credits: 650,
      originalPrice: 2500,
      servicesLeft: 3,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.6,
      distance: '3.8 km',
      image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB3YXNofGVufDF8fHx8MTczMDc0NjQwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      logo: '🚗'
    },
    {
      id: '11',
      name: 'Nailz Studio - Andheri',
      category: 'Beauty & Grooming',
      location: 'Andheri West, Mumbai',
      area: 'Lokhandwala',
      credits: 400,
      originalPrice: 1200,
      servicesLeft: 8,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.7,
      distance: '2.1 km',
      image: 'https://images.unsplash.com/photo-1613457492120-4fcfbb7c3a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwc2Fsb24lMjBtYW5pY3VyZXxlbnwxfHx8fDE3NjIyNjUyOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      logo: '💅',
      badge: 'Popular'
    },
    {
      id: '12',
      name: 'Bliss Spa & Wellness - Juhu',
      category: 'Beauty & Grooming',
      location: 'Juhu, Mumbai',
      area: 'Juhu Tara Road',
      credits: 1200,
      originalPrice: 4000,
      servicesLeft: 4,
      pickupTime: 'Available today 11:00 AM - 8:00 PM',
      rating: 4.9,
      distance: '3.2 km',
      image: 'https://images.unsplash.com/photo-1757689314932-bec6e9c39e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB3ZWxsbmVzcyUyMG1hc3NhZ2V8ZW58MXx8fHwxNzYyMjI4MzE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      logo: '💆',
      badge: 'Selling fast'
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="sticky top-0 bg-background z-10 pb-3 space-y-3" style={{ paddingTop: 'max(env(safe-area-inset-top), 24px)' }}>
        <div className="flex gap-2 px-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-12 min-h-[48px] rounded-[1.5rem] border-border bg-background"
              style={{ fontSize: '16px' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground active:scale-95 transition-transform w-8 h-8 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSuggestFormOpen(true)}
            className="h-12 w-12 min-h-[48px] min-w-[48px] rounded-full flex-shrink-0 border-2 border-[#ff9933] text-[#ff9933] hover:bg-[#ff9933]/10 active:scale-95 transition-transform"
          >
            <Store className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 min-h-[48px] min-w-[48px] rounded-full flex-shrink-0 border-2 border-[#ff9933] text-[#ff9933] hover:bg-[#ff9933]/10 active:scale-95 transition-transform"
            onClick={() => {
              setViewMode('map');
              setShowMapControls(true);
            }}
          >
            <MapPin className="w-5 h-5" />
          </Button>
        </div>

        {/* Category Icons - Horizontal Scroll */}
        <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-3 pb-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center gap-1.5 min-w-[64px] active:scale-95 transition-all ${
                  selectedCategory === category.id ? '' : ''
                }`}
              >
                <div
                  className={`w-14 h-14 min-w-[56px] min-h-[56px] rounded-full flex items-center justify-center transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary shadow-md'
                      : 'bg-muted'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <span
                  className={`text-xs whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* List/Map Toggle */}
        <div className="flex gap-3 px-4">
          <Button
            onClick={() => setViewMode('list')}
            className={`flex-1 h-12 min-h-[48px] rounded-[1.5rem] active:scale-[0.98] transition-all ${
              viewMode === 'list'
                ? 'bg-[#059669] hover:bg-[#059669] text-white shadow-md'
                : 'bg-background hover:bg-muted text-foreground border border-border'
            }`}
            style={{ fontSize: '16px', fontWeight: '500' }}
          >
            List
          </Button>
          <Button
            onClick={() => {
              setViewMode('map');
              setShowMapControls(true);
            }}
            className={`flex-1 h-12 min-h-[48px] rounded-[1.5rem] active:scale-[0.98] transition-all ${
              viewMode === 'map'
                ? 'bg-[#059669] hover:bg-[#059669] text-white shadow-md'
                : 'bg-background hover:bg-muted text-foreground border border-border'
            }`}
            style={{ fontSize: '16px', fontWeight: '500' }}
          >
            Map
          </Button>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Sort By */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-muted-foreground" style={{ fontSize: '14px' }}>Sort by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-[#059669] active:scale-95 transition-transform outline-none min-h-[48px] py-2">
                <span style={{ fontSize: '16px', fontWeight: '500' }}>{sortBy}</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-[1.5rem]">
                <DropdownMenuItem onClick={() => setSortBy('Relevance')} className="cursor-pointer min-h-[48px]" style={{ fontSize: '16px' }}>
                  Relevance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('Distance')} className="cursor-pointer min-h-[48px]" style={{ fontSize: '16px' }}>
                  Distance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('Price: Low to High')} className="cursor-pointer min-h-[48px]" style={{ fontSize: '16px' }}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('Price: High to Low')} className="cursor-pointer min-h-[48px]" style={{ fontSize: '16px' }}>
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('Rating')} className="cursor-pointer min-h-[48px]" style={{ fontSize: '16px' }}>
                  Rating
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Partner Cards */}
          <div className="space-y-3">
            {(() => {
              const filteredPartners = partners.filter(partner => {
                const matchesSearch = searchQuery === '' || 
                  partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  partner.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  partner.location.toLowerCase().includes(searchQuery.toLowerCase());
                
                const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
                
                return matchesSearch && matchesCategory;
              });

              if (filteredPartners.length === 0) {
                return (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Search className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-center mb-2" style={{ fontSize: '20px', fontWeight: '600' }}>
                      No results found
                    </h3>
                    <p className="text-center text-muted-foreground" style={{ fontSize: '16px', lineHeight: '1.5' }}>
                      Try adjusting your search or filters
                    </p>
                  </div>
                );
              }

              return filteredPartners.map((partner) => {
              const isAvailable = (partnersInventory[partner.id] ?? partner.servicesLeft) > 0;
              const isFavorite = favorites.has(partner.id);
              const servicesLeft = partnersInventory[partner.id] ?? partner.servicesLeft;
              
              return (
                <div
                  key={partner.id}
                  className={`relative rounded-[2rem_1rem_2rem_1rem] overflow-hidden border bg-card shadow-sm ${
                    isAvailable 
                      ? 'border-primary/20 active:scale-[0.98] cursor-pointer hover:shadow-md hover:border-primary/30' 
                      : 'border-border/50 opacity-60'
                  } transition-all duration-200`}
                  onClick={() => {
                    if (isAvailable) {
                      setSelectedPartner(partner);
                      setIsReservationModalOpen(true);
                    }
                  }}
                >
                  {/* Card Image */}
                  <div className="relative h-44 overflow-hidden">
                    <ImageWithFallback
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Top badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {partner.badge && (
                        <div className="bg-white text-black px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '500' }}>
                          {partner.badge}
                        </div>
                      )}
                      {isAvailable && (
                        <div className="bg-white text-black px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '500' }}>
                          {servicesLeft} left
                        </div>
                      )}
                      {!isAvailable && (
                        <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '500' }}>
                          0 left
                        </div>
                      )}
                    </div>

                    {/* Heart icon */}
                    <button 
                      className="absolute top-3 right-3 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white/95 flex items-center justify-center active:scale-90 transition-all shadow-md z-10 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(partner.id, partner.name);
                      }}
                    >
                      <Heart 
                        className={`w-5 h-5 transition-all ${
                          isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
                        }`} 
                      />
                    </button>

                    {/* Store logo and name */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md" style={{ fontSize: '20px' }}>
                        {partner.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white truncate" style={{ fontSize: '16px', fontWeight: '600' }}>
                          {partner.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2 bg-card">
                    <div>
                      <p className="text-foreground" style={{ fontSize: '14px', fontWeight: '500' }}>
                        {partner.category}
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                        {partner.pickupTime}
                      </p>
                    </div>

                    {/* Rating, Distance, and Price */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <div className="w-6 h-6 rounded bg-[#059669] flex items-center justify-center shadow-sm">
                            <Star className="w-3.5 h-3.5 text-white fill-white" />
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: '500' }}>{partner.rating}</span>
                        </div>
                        <span className="text-muted-foreground" style={{ fontSize: '14px' }}>{partner.distance}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[#059669]" style={{ fontSize: '32px', fontWeight: '700', lineHeight: '1' }}>
                          {partner.credits}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
              });
            })()}
          </div>
        </div>
      )}

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="flex-1 relative overflow-hidden">
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-blue-200 to-emerald-200">
            {/* Simplified map illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2 opacity-30">
                <MapPin className="w-16 h-16 mx-auto text-emerald-700" />
                <p className="text-sm text-muted-foreground">Map Integration Placeholder</p>
                <p className="text-xs text-muted-foreground px-4">
                  (Integrate Google Maps / Mapbox / Leaflet)
                </p>
              </div>
            </div>

            {/* Sample map pins */}
            <button className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xl active:scale-95 transition-transform" style={{ fontSize: '16px', fontWeight: '700' }}>
              12
            </button>
            <button className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xl active:scale-95 transition-transform" style={{ fontSize: '16px', fontWeight: '700' }}>
              8
            </button>
            <button className="absolute bottom-1/3 left-1/2 w-12 h-12 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xl active:scale-95 transition-transform" style={{ fontSize: '16px', fontWeight: '700' }}>
              5
            </button>
            <button className="absolute top-1/2 right-1/4 w-10 h-10 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xl active:scale-95 transition-transform" style={{ fontSize: '14px', fontWeight: '700' }}>
              3
            </button>
          </div>

          {/* Map Controls Overlay */}
          {showMapControls && (
            <div className="absolute inset-0 bg-black/50 flex flex-col z-20">
              {/* Header */}
              <div className="bg-white px-4 pt-safe pb-4 flex items-center justify-between shadow-sm">
                <h3 className="text-center flex-1" style={{ fontSize: '16px', fontWeight: '600', lineHeight: '1.4' }}>
                  Choose a location to see<br />what's available
                </h3>
                <button
                  onClick={() => setShowMapControls(false)}
                  className="text-muted-foreground active:scale-90 transition-transform w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Sheet */}
              <div className="mt-auto bg-white rounded-t-[2rem] p-6 pb-safe space-y-6 shadow-2xl">
                {/* Distance Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Select a distance</h4>
                    <span className="text-muted-foreground" style={{ fontSize: '14px', fontWeight: '500' }}>{distance[0]} km</span>
                  </div>
                  <Slider
                    value={distance}
                    onValueChange={setDistance}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for a city"
                    className="pl-10 h-12 min-h-[48px] rounded-[1.5rem] bg-muted border-0"
                    style={{ fontSize: '16px' }}
                  />
                </div>

                {/* Use Current Location */}
                <button className="flex items-center justify-center gap-2 w-full text-[#059669] active:scale-95 transition-transform py-3 min-h-[48px]">
                  <MapPin className="w-5 h-5" />
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>Use my current location</span>
                </button>

                {/* Show Results Button */}
                <Button
                  onClick={() => setShowMapControls(false)}
                  className="w-full h-12 min-h-[48px] rounded-[1.5rem] bg-[#059669] hover:bg-[#048558] text-white shadow-md active:scale-[0.98] transition-all"
                  style={{ fontSize: '16px', fontWeight: '600' }}
                >
                  Show results
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggest Business Form */}
      <SuggestBusinessForm 
        isOpen={isSuggestFormOpen}
        onClose={() => setIsSuggestFormOpen(false)}
      />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        partner={selectedPartner}
        userCredits={totalCredits}
        userProfile={userProfile}
        onNavigateToProfile={onNavigateToProfile}
        onPurchase={(partnerId, credits) => {
          handleReservation(partnerId, credits);
        }}
      />
    </div>
  );
}