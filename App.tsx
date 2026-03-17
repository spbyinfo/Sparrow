import { useState } from 'react';
import { useEffect } from 'react';
import { AuthChoice } from './components/AuthChoice';
import { UserDashboardLayout } from './components/UserDashboardLayout';
import { PartnerDashboard } from './components/PartnerDashboard';
import { BingoCard } from './components/BingoCard';
import { History } from './components/History';
import { MyPass } from './components/MyPass';
import { UserProfile } from './components/UserProfile';
import { EnvironmentBadge } from './components/EnvironmentBadge';
import type { Reservation } from './components/ReservationCircles';
import { PARTNERS } from './data/partnerData';

type AuthView = 'auth' | 'user-dashboard' | 'partner-dashboard';
type DashboardPage = 'bingo' | 'pass' | 'history' | 'profile';

export interface BingoProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  brandLogo: string;
  image: string;
  image3D: string;
  plasticType: string;
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
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>('salon-partner-1');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pickupHistory, setPickupHistory] = useState<PickupRecord[]>([]);
  const [newlyUnlockedPassId, setNewlyUnlockedPassId] = useState<string | null>(null);
  const [completedReservations, setCompletedReservations] = useState<Reservation[]>([]);
  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);
  
  const [userProfile, setUserProfile] = useState({
    name: 'Test User',
    email: 'test@sparrow.com',
    phone: '9876543210',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    kycVerified: false,
  });

  const [bingoProducts, setBingoProducts] = useState<BingoProduct[]>([
    { id: '1', sku: 'YOGURT-1KG-PP', name: 'Large Yogurt Container 1kg', category: 'Yogurt Container', brandLogo: '', image: '', image3D: '', plasticType: 'PP #5', description: 'Polypropylene tub. Rinse thoroughly and recycle.', recyclable: true, scanned: false, credits: 15 },
    { id: '2', sku: 'BOTTLE-500ML-PET', name: 'Plastic Bottle 500ml', category: 'Plastic Bottle', brandLogo: '', image: '', image3D: '', plasticType: 'PETE #1', description: 'Standard PET bottle. Crush before recycling.', recyclable: true, scanned: false, credits: 8 },
    { id: '3', sku: 'CANS-SET-3-ALU', name: 'Can Set of 3', category: 'Can Set', brandLogo: '', image: '', image3D: '', plasticType: 'Aluminum', description: 'Aluminum cans. Highly recyclable - infinite reuse.', recyclable: true, scanned: false, credits: 25 },
    { id: '4', sku: 'MILK-BAG-1L-PE', name: 'Milk Bag 1L', category: 'Milk Bag', brandLogo: '', image: '', image3D: '', plasticType: 'LDPE #4', description: 'Low-density polyethylene. Clean and dry before recycling.', recyclable: true, scanned: false, credits: 12 },
    { id: '5', sku: 'TAKEOUT-BOX-PP', name: 'Plastic Takeout Container', category: 'Takeout Container', brandLogo: '', image: '', image3D: '', plasticType: 'PP #5', description: 'Takeout container with lid. Remove food residue completely.', recyclable: true, scanned: false, credits: 10 },
    { id: '6', sku: 'SHAMPOO-400ML-HDPE', name: 'Shampoo Bottle 400ml', category: 'Shampoo Bottle', brandLogo: '', image: '', image3D: '', plasticType: 'HDPE #2', description: 'Opaque HDPE bottle. Remove pump before recycling.', recyclable: true, scanned: false, credits: 12 },
    { id: '7', sku: 'JUICE-BOX-250ML-TET', name: 'Juice Box 250ml', category: 'Juice Box', brandLogo: '', image: '', image3D: '', plasticType: 'Tetra Pak', description: 'Multi-layer packaging. Flatten before recycling.', recyclable: true, scanned: false, credits: 18 },
    { id: '8', sku: 'FOOD-CONTAINER-PP', name: 'Food Storage Container', category: 'Food Container', brandLogo: '', image: '', image3D: '', plasticType: 'PP #5', description: 'Reusable food container. Clean thoroughly for recycling.', recyclable: true, scanned: false, credits: 11 },
    { id: '9', sku: 'GLASS-JAR-500ML', name: 'Glass Jar 500ml', category: 'Glass Jar', brandLogo: '', image: '', image3D: '', plasticType: 'Glass', description: 'Glass jar. Infinitely recyclable - remove lid.', recyclable: true, scanned: false, credits: 20 },
  ]);

  useEffect(() => {
    const hideSkipLinks = () => {
      document.querySelectorAll('a').forEach((link) => {
        const text = link.textContent?.trim().toLowerCase() || '';
        const href = link.getAttribute('href') || '';
        if (text.includes('skip') || text.includes('main content') || href.startsWith('#radix-') || href === '#main-content' || href === '#content') {
          link.style.cssText = 'display:none!important;visibility:hidden!important;position:absolute!important;width:0!important;height:0!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important;';
          link.setAttribute('aria-hidden', 'true');
          link.setAttribute('tabindex', '-1');
        }
      });
    };
    hideSkipLinks();
    const timeout1 = setTimeout(hideSkipLinks, 100);
    const timeout2 = setTimeout(hideSkipLinks, 500);
    const timeout3 = setTimeout(hideSkipLinks, 1000);
    const observer = new MutationObserver(() => hideSkipLinks());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return () => { observer.disconnect(); clearTimeout(timeout1); clearTimeout(timeout2); clearTimeout(timeout3); };
  }, []);

  const handleScanProduct = (sku: string) => {
    setBingoProducts(prev => prev.map(product => {
      if (product.sku === sku && !product.scanned) {
        const creditAmount = product.credits;
        setUserCredits(currentCredits => currentCredits + creditAmount);
        const newTransaction: Transaction = { id: `txn-${Date.now()}`, date: new Date().toLocaleDateString('en-IN'), time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), description: `Scanned ${product.name}`, credits: creditAmount };
        setTransactions(prev => [newTransaction, ...prev]);
        return { ...product, scanned: true };
      }
      return product;
    }));
  };

  const handlePartnerLoginClick = () => { setSelectedPartnerId('salon-partner-1'); setAuthView('partner-dashboard'); };
  const handleLoginSuccess = (name: string, userType?: 'user' | 'partner') => {
    setUserName(name);
    if (userType === 'partner') { setSelectedPartnerId('salon-partner-1'); setAuthView('partner-dashboard'); return; }
    if (name === 'Guest User') { setUserProfile({ name: '', email: '', phone: '', address: '', kycVerified: false }); } 
    else { setUserProfile({ name: name, email: 'demo@sparrow.app', phone: '25595396', address: 'Flat 204, Green Valley Apartments, Bandra West, Mumbai, Maharashtra 400050', kycVerified: true }); }
    setAuthView('user-dashboard');
  };

  const handleLogout = () => { setUserName(''); setUserProfile({ name: '', email: '', phone: '', address: '', kycVerified: false }); setUserCredits(0); setTransactions([]); setPickupHistory([]); setBingoProducts(prev => prev.map(p => ({ ...p, scanned: false }))); setAuthView('auth'); };
  const handleRedeemCredits = (amount: number) => { if (userCredits >= amount) { setUserCredits(prev => prev - amount); const newTransaction: Transaction = { id: `txn-${Date.now()}`, date: new Date().toLocaleDateString('en-IN'), time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), description: `Redeemed reward`, credits: -amount }; setTransactions(prev => [newTransaction, ...prev]); return true; } return false; };
  const handlePassPurchase = (passData: { passId: string; serviceName: string; partnerName: string; partnerLogo: string; location: string; time: string; price: number; isFree: boolean }) => {
    if (!passData.isFree) { setUserCredits(prev => prev - passData.price); const purchaseTransaction: Transaction = { id: `txn-${Date.now()}`, date: new Date().toLocaleDateString('en-IN'), time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), description: `Booked ${passData.serviceName} at ${passData.partnerName}`, credits: -passData.price }; setTransactions(prev => [purchaseTransaction, ...prev]); }
    const newReservation: Reservation = { id: `res-${Date.now()}`, partnerName: passData.partnerName, partnerLogo: passData.partnerLogo, location: passData.location, time: passData.time, service: passData.serviceName, confirmationCode: `SPR-${Math.random().toString(36).substr(2, 9).toUpperCase()}` };
    setActiveReservations(prev => [...prev, newReservation]);
    const bookingTransaction: Transaction = { id: `txn-${Date.now() + 1}`, date: new Date().toLocaleDateString('en-IN'), time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), description: passData.isFree ? `✓ FREE Pass Claimed: ${passData.serviceName}` : `✓ Pass Booked: ${passData.serviceName}`, credits: 0 };
    setTransactions(prev => [bookingTransaction, ...prev]);
    setActivePage('bingo');
  };

  const handleCompleteReservation = (reservationId: string) => {
    const reservation = activeReservations.find(r => r.id === reservationId);
    if (reservation) { setCompletedReservations(prev => [...prev, reservation]); setActiveReservations(prev => prev.filter(r => r.id !== reservationId)); const completionTransaction: Transaction = { id: `txn-${Date.now()}`, date: new Date().toLocaleDateString('en-IN'), time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), description: `✓ Completed: ${reservation.service} at ${reservation.partnerName}`, credits: 0 }; setTransactions(prev => [completionTransaction, ...prev]); }
  };

  if (authView === 'auth') return <AuthChoice onLoginSuccess={handleLoginSuccess} onPartnerLoginClick={handlePartnerLoginClick} />;
  if (authView === 'partner-dashboard') return (<><EnvironmentBadge /><PartnerDashboard currentPartnerId={selectedPartnerId} onPartnerChange={setSelectedPartnerId} onLogout={handleLogout} /></>);

  return (
    <><EnvironmentBadge />
      <UserDashboardLayout userName={userName} activePage={activePage} onPageChange={setActivePage} userCredits={userCredits}>
        {activePage === 'bingo' && <BingoCard bingoProducts={bingoProducts} onProductScanned={handleScanProduct} totalCredits={userCredits} activeReservations={activeReservations} />}
        {activePage === 'history' && <History activeReservations={activeReservations.map(r => ({ id: r.id, partnerName: r.partnerName, partnerLogo: r.partnerLogo, location: r.location, service: r.service, time: r.time, price: 0, status: 'active' as const, confirmationCode: r.confirmationCode, isFree: true }))} completedReservations={completedReservations.map(r => ({ id: r.id, partnerName: r.partnerName, partnerLogo: r.partnerLogo, location: r.location, service: r.service, time: r.time, price: 0, status: 'completed' as const, confirmationCode: r.confirmationCode, isFree: true }))} />}
        {activePage === 'pass' && <MyPass totalCredits={userCredits} bingoProducts={bingoProducts} userProfile={{ name: userProfile.name || 'Guest User', phone: userProfile.phone || '0000000000' }} activeReservations={activeReservations.length} onPassPurchased={handlePassPurchase} />}
        {activePage === 'profile' && <UserProfile userProfile={userProfile} totalCredits={userCredits} bingoProducts={bingoProducts} pickupHistory={pickupHistory} onLogout={handleLogout} />}
      </UserDashboardLayout>
    </>
  );
}

export default App;