import { useState } from 'react';
import { AuthChoice } from './components/AuthChoice';
import { UserDashboardLayout } from './components/UserDashboardLayout';
import { BingoCard } from './components/BingoCard';
import { MyCredits } from './components/MyCredits';
import { MyPass } from './components/MyPass';
import { UserProfile } from './components/UserProfile';
import { EnvironmentBadge } from './components/EnvironmentBadge';
import type { Reservation } from './components/ReservationCircles';

type AuthView = 'auth' | 'dashboard';
type DashboardPage = 'bingo' | 'credits' | 'pass' | 'profile';

export interface BingoProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  brandLogo: string; // Logo shown on bingo card
  image: string; // Legacy support
  image3D: string; // 3D product image
  plasticType: string; // PETE, HDPE, etc.
  description: string;
  recyclable: boolean;
  scanned: boolean;
  credits: number;
}

export interface PickupRecord {
  id: string;
  date: string;
  scheduledTime: string;
  completedTime?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  itemsCount: number;
  items: string[];
  address: string;
  credits: number;
  pickupAgent?: string;
  pickupId: string;
}

export interface Transaction {
  id: string;
  date: string;
  time: string;
  description: string;
  credits: number;
}

function App() {
  const [authView, setAuthView] = useState<AuthView>('auth');
  const [activePage, setActivePage] = useState<DashboardPage>('bingo');
  const [userCredits, setUserCredits] = useState(0);
  const [userName, setUserName] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pickupHistory, setPickupHistory] = useState<PickupRecord[]>([]);
  
  // Active reservations state
  const [activeReservations, setActiveReservations] = useState<Reservation[]>([
    {
      id: '1',
      partnerName: 'Looks Salon',
      partnerLogo: 'https://cdn.brandfetch.io/id_SBQd2us/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1759316895403',
      location: 'Bandra West, Mumbai',
      time: 'Today, 4:00 PM',
      service: '1 surprise service',
      confirmationCode: 'SPR-2025-1234'
    },
    {
      id: '2',
      partnerName: 'Starbucks',
      partnerLogo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop',
      location: 'Linking Road, Mumbai',
      time: 'Tomorrow, 10:00 AM',
      service: '1 surprise service',
      confirmationCode: 'SPR-2025-5678'
    }
  ]);
  
  const [userProfile, setUserProfile] = useState({
    name: 'Test User',
    email: 'test@sparrow.com',
    phone: '9876543210',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    kycVerified: false,
  });

  const [bingoProducts, setBingoProducts] = useState<BingoProduct[]>([
    {
      id: '1',
      sku: 'CC-500ML-PET',
      name: 'Coca-Cola 500ml',
      category: 'Soft Drink',
      brandLogo: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200&h=200&fit=crop',
      image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop',
      image3D: 'https://images.unsplash.com/photo-1629203849354-792b99c2c9e1?w=600&h=600&fit=crop',
      plasticType: 'PETE #1',
      description: 'Clear polyethylene terephthalate bottle. Highly recyclable.',
      recyclable: true,
      scanned: false,
      credits: 10,
    },
    {
      id: '2',
      sku: 'AMUL-1L-HDPE',
      name: 'Amul Milk 1L',
      category: 'Dairy',
      brandLogo: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
      image3D: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&fit=crop',
      plasticType: 'HDPE #2',
      description: 'High-density polyethylene. Opaque and durable.',
      recyclable: true,
      scanned: false,
      credits: 15,
    },
    {
      id: '3',
      sku: 'BISLERI-1L-PET',
      name: 'Bisleri Water 1L',
      category: 'Bottled Water',
      brandLogo: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop',
      image3D: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=600&fit=crop',
      plasticType: 'PETE #1',
      description: 'Recyclable PET bottle. Return for credits.',
      recyclable: true,
      scanned: false,
      credits: 8,
    },
    {
      id: '4',
      sku: 'NESTLE-500ML-PET',
      name: 'Nestlé Water 500ml',
      category: 'Bottled Water',
      brandLogo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop',
      image3D: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
      plasticType: 'PETE #1',
      description: 'Standard PET bottle. Crush before disposing.',
      recyclable: true,
      scanned: false,
      credits: 7,
    },
    {
      id: '5',
      sku: 'DOVE-250ML-HDPE',
      name: 'Dove Shampoo 250ml',
      category: 'Personal Care',
      brandLogo: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200&h=200&fit=crop',
      image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop',
      image3D: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop',
      plasticType: 'HDPE #2',
      description: 'Opaque HDPE bottle. Remove pump before recycling.',
      recyclable: true,
      scanned: false,
      credits: 12,
    },
    {
      id: '6',
      sku: 'FROOTI-200ML-TET',
      name: 'Frooti Mango 200ml',
      category: 'Juice',
      brandLogo: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop',
      image3D: 'https://images.unsplash.com/photo-1622484211850-7cb85948c125?w=600&h=600&fit=crop',
      plasticType: 'Tetra Pak',
      description: 'Multi-layer packaging. Special recycling required.',
      recyclable: true,
      scanned: false,
      credits: 20,
    },
    {
      id: '7',
      sku: 'PEPSI-2L-PET',
      name: 'Pepsi 2L',
      category: 'Soft Drink',
      brandLogo: 'https://images.unsplash.com/photo-1629203849354-792b99c2c9e1?w=200&h=200&fit=crop',
      image: 'https://images.unsplash.com/photo-1629203849354-792b99c2c9e1?w=400&h=400&fit=crop',
      image3D: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&h=600&fit=crop',
      plasticType: 'PETE #1',
      description: 'Large PET bottle. High credit value.',
      recyclable: true,
      scanned: false,
      credits: 18,
    },
    {
      id: '8',
      sku: 'SPRITE-600ML-PET',
      name: 'Sprite 600ml',
      category: 'Soft Drink',
      brandLogo: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=200&h=200&fit=crop',
      image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=400&fit=crop',
      image3D: 'https://images.unsplash.com/photo-1581098365950-36c7d41e8f32?w=600&h=600&fit=crop',
      plasticType: 'PETE #1',
      description: 'Green PET bottle. Rinse before disposing.',
      recyclable: true,
      scanned: false,
      credits: 11,
    },
    {
      id: '9',
      sku: 'REAL-1L-TET',
      name: 'Real Juice 1L',
      category: 'Juice',
      brandLogo: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop',
      image3D: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=600&h=600&fit=crop',
      plasticType: 'Tetra Pak',
      description: 'Composite packaging. Flatten after use.',
      recyclable: true,
      scanned: false,
      credits: 25,
    },
  ]);

  const handleScanProduct = (sku: string) => {
    setBingoProducts(prev =>
      prev.map(product => {
        if (product.sku === sku && !product.scanned) {
          const creditAmount = product.credits;
          setUserCredits(currentCredits => currentCredits + creditAmount);
          
          // Add transaction
          const newTransaction: Transaction = {
            id: `txn-${Date.now()}`,
            date: new Date().toLocaleDateString('en-IN'),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            description: `Scanned ${product.name}`,
            credits: creditAmount,
          };
          setTransactions(prev => [newTransaction, ...prev]);
          
          return { ...product, scanned: true };
        }
        return product;
      })
    );
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    
    // If guest user, set minimal profile
    if (name === 'Guest User') {
      setUserProfile({
        name: '',
        email: '',
        phone: '',
        address: '',
        kycVerified: false,
      });
    } else {
      // Demo credentials: Phone 25595396 / OTP 123456
      setUserProfile({
        name: name,
        email: 'demo@sparrow.app',
        phone: '25595396',
        address: 'Flat 204, Green Valley Apartments, Bandra West, Mumbai, Maharashtra 400050',
        kycVerified: true,
      });
    }
    
    setAuthView('dashboard');
  };

  const handleLogout = () => {
    setUserName('');
    setUserProfile({
      name: '',
      email: '',
      phone: '',
      address: '',
      kycVerified: false,
    });
    setUserCredits(0);
    setTransactions([]);
    setPickupHistory([]);
    setBingoProducts(prev => prev.map(p => ({ ...p, scanned: false })));
    setAuthView('auth');
  };

  const handleRedeemCredits = (amount: number) => {
    if (userCredits >= amount) {
      setUserCredits(prev => prev - amount);
      
      // Add redemption transaction
      const newTransaction: Transaction = {
        id: `txn-${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        description: `Redeemed reward`,
        credits: -amount,
      };
      setTransactions(prev => [newTransaction, ...prev]);
      
      return true;
    }
    return false;
  };

  if (authView === 'auth') {
    return <AuthChoice onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      <EnvironmentBadge />
      <UserDashboardLayout
        userName={userName}
        activePage={activePage}
        onPageChange={setActivePage}
        userCredits={userCredits}
      >
        {activePage === 'bingo' && (
          <BingoCard 
            bingoProducts={bingoProducts} 
            onProductScanned={handleScanProduct} 
            totalCredits={userCredits}
            activeReservations={activeReservations}
          />
        )}
        {activePage === 'credits' && (
          <MyCredits credits={userCredits} transactions={transactions} />
        )}
        {activePage === 'pass' && (
          <MyPass 
            totalCredits={userCredits} 
            transactions={transactions} 
            bingoProducts={bingoProducts}
            userProfile={userProfile}
            onNavigateToProfile={() => setActivePage('profile')}
          />
        )}
        {activePage === 'profile' && (
          <UserProfile 
            userProfile={userProfile} 
            totalCredits={userCredits} 
            bingoProducts={bingoProducts}
            pickupHistory={pickupHistory}
            onLogout={handleLogout}
          />
        )}
      </UserDashboardLayout>
    </>
  );
}

export default App;