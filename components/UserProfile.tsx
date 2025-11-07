import { useState } from 'react';
import { User, Mail, Phone, MapPin, CheckCircle, LogOut, Edit2, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface BingoProduct {
  scanned: boolean;
}

interface PickupRecord {
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface UserProfileProps {
  userProfile: {
    name: string;
    email: string;
    phone: string;
    address: string;
    kycVerified: boolean;
  };
  totalCredits: number;
  bingoProducts: BingoProduct[];
  pickupHistory: PickupRecord[];
  onLogout: () => void;
}

export function UserProfile({ userProfile, totalCredits, bingoProducts, pickupHistory, onLogout }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    address: userProfile.address
  });
  const [isKycFormOpen, setIsKycFormOpen] = useState(false);
  const [kycData, setKycData] = useState({
    aadhaar: '',
    pan: ''
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Calculate real stats
  const totalScans = bingoProducts.filter(p => p.scanned).length;
  const totalPickups = pickupHistory.filter(p => p.status === 'completed').length;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProfile({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      address: userProfile.address
    });
  };

  const handleSave = () => {
    // TODO: Update profile in parent component/database
    console.log('Saving profile:', editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      address: userProfile.address
    });
  };

  const handleKycSubmit = () => {
    // Validate Aadhaar (12 digits)
    if (kycData.aadhaar.length !== 12 || !/^\d{12}$/.test(kycData.aadhaar)) {
      alert('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    
    // Validate PAN (format: ABCDE1234F)
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(kycData.pan)) {
      alert('Please enter a valid PAN number (Format: ABCDE1234F)');
      return;
    }

    // TODO: Submit to backend for verification
    console.log('Submitting eKYC:', kycData);
    
    // Close form and show success (in real app, wait for backend response)
    setIsKycFormOpen(false);
    // TODO: Update userProfile.kycVerified in parent component
  };

  const handleKycCancel = () => {
    setIsKycFormOpen(false);
    setKycData({ aadhaar: '', pan: '' });
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto pb-6 px-4" style={{ paddingTop: 'max(env(safe-area-inset-top), 24px)' }}>
      {/* Guest User Prompt */}
      {!userProfile.name && !isEditing && (
        <div className="bg-[#fff9f0] border-2 border-[#ff9933] rounded-[1.5rem] p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#ff9933] rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm" style={{ fontWeight: '600', marginBottom: '4px' }}>
                Complete your profile
              </h4>
              <p className="text-xs text-muted-foreground" style={{ lineHeight: '1.4', marginBottom: '12px' }}>
                Add your details to unlock the full Sparrow experience and start earning credits!
              </p>
              <Button 
                className="w-full h-10 bg-[#ff9933] hover:bg-[#e67300] text-white active:scale-[0.98] transition-transform"
                onClick={handleEditClick}
                style={{ fontSize: '14px', fontWeight: '600' }}
              >
                Add Details Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Button / Save/Cancel Actions */}
      {!isEditing && userProfile.name ? (
        <Button 
          variant="outline" 
          className="w-full justify-start active:scale-[0.98] transition-transform gap-2"
          onClick={handleEditClick}
        >
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Button>
      ) : isEditing ? (
        <div className="flex gap-2">
          <Button 
            className="flex-1 active:scale-[0.98] transition-transform gap-2 bg-primary hover:bg-primary/90 text-white h-12"
            onClick={handleSave}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
          <Button 
            variant="outline"
            className="flex-1 active:scale-[0.98] transition-transform gap-2 h-12"
            onClick={handleCancel}
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        </div>
      ) : null}

      {/* Personal Information */}
      <div className="bg-card rounded-[1.5rem] p-5 shadow-sm border border-border space-y-4">
        <h3 className="text-sm">Personal Information</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Name</p>
              {isEditing ? (
                <Input
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="mt-1 h-10"
                  placeholder="Enter your name"
                />
              ) : (
                <p className="text-sm truncate">{userProfile.name || <span className="text-muted-foreground italic">Not added</span>}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Email</p>
              {isEditing ? (
                <Input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="mt-1 h-10"
                  placeholder="Enter your email"
                />
              ) : (
                <p className="text-sm truncate">{userProfile.email || <span className="text-muted-foreground italic">Not added</span>}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Phone</p>
              {isEditing ? (
                <Input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  className="mt-1 h-10"
                  placeholder="Enter your phone"
                  maxLength={10}
                />
              ) : (
                <p className="text-sm truncate">{userProfile.phone || <span className="text-muted-foreground italic">Not added</span>}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Address</p>
              {isEditing ? (
                <Textarea
                  value={editedProfile.address}
                  onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                  className="mt-1 min-h-[80px] resize-none"
                  placeholder="Enter your address"
                />
              ) : (
                <p className="text-sm leading-relaxed">{userProfile.address || <span className="text-muted-foreground italic">Not added</span>}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* eKYC Verification Section */}
      {!userProfile.kycVerified && userProfile.name && (
        <div className="bg-[#fff9f0] border-2 border-[#ff9933] rounded-[1.5rem] p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#ff9933] rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm" style={{ fontWeight: '600', marginBottom: '4px' }}>
                Complete eKYC Verification
              </h4>
              <p className="text-xs text-muted-foreground" style={{ lineHeight: '1.4', marginBottom: '12px' }}>
                Verify your identity with Aadhaar and PAN to confirm reservations and unlock premium features.
              </p>
              <Button 
                className="w-full h-10 bg-[#ff9933] hover:bg-[#e67300] text-white active:scale-[0.98] transition-transform"
                onClick={() => setIsKycFormOpen(true)}
                style={{ fontSize: '14px', fontWeight: '600' }}
              >
                Start Verification
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* eKYC Verified Badge */}
      {userProfile.kycVerified && (
        <div className="bg-[#059669]/10 border-2 border-[#059669] rounded-[1.5rem] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#059669] rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm text-[#059669]" style={{ fontWeight: '600', marginBottom: '2px' }}>
                ✓ eKYC Verified
              </h4>
              <p className="text-xs text-muted-foreground" style={{ lineHeight: '1.4' }}>
                Your identity has been verified. You can now confirm reservations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* eKYC Form Modal */}
      {isKycFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div 
            className="bg-background w-full sm:max-w-md sm:rounded-[2rem_1rem_2rem_1rem] rounded-t-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300"
            style={{ maxHeight: '90vh' }}
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-4 border-b border-border">
              <button
                onClick={handleKycCancel}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center active:scale-90 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#ff9933] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700' }}>
                    eKYC Verification
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Verify your identity to unlock all features
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              <div className="bg-[#4169e1]/10 border border-[#4169e1]/30 rounded-[1.5rem] p-3">
                <p className="text-xs text-muted-foreground" style={{ lineHeight: '1.5' }}>
                  <strong>Why we need this:</strong> eKYC verification ensures secure transactions and helps us comply with Indian regulations.
                </p>
              </div>

              {/* Aadhaar Input */}
              <div className="space-y-2">
                <label htmlFor="aadhaar" className="text-sm" style={{ fontWeight: '600' }}>
                  Aadhaar Number
                </label>
                <Input
                  id="aadhaar"
                  type="text"
                  inputMode="numeric"
                  value={kycData.aadhaar}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 12) {
                      setKycData({ ...kycData, aadhaar: value });
                    }
                  }}
                  placeholder="Enter 12-digit Aadhaar"
                  className="h-12 rounded-[1.5rem]"
                  maxLength={12}
                  style={{ fontSize: '16px' }}
                />
                <p className="text-xs text-muted-foreground pl-2">
                  12 digits • Example: 123456789012
                </p>
              </div>

              {/* PAN Input */}
              <div className="space-y-2">
                <label htmlFor="pan" className="text-sm" style={{ fontWeight: '600' }}>
                  PAN Number
                </label>
                <Input
                  id="pan"
                  type="text"
                  value={kycData.pan}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    if (value.length <= 10) {
                      setKycData({ ...kycData, pan: value });
                    }
                  }}
                  placeholder="Enter PAN"
                  className="h-12 rounded-[1.5rem] uppercase"
                  maxLength={10}
                  style={{ fontSize: '16px' }}
                />
                <p className="text-xs text-muted-foreground pl-2">
                  Format: ABCDE1234F
                </p>
              </div>

              {/* Security Note */}
              <div className="bg-muted rounded-[1.5rem] p-3">
                <p className="text-xs text-muted-foreground" style={{ lineHeight: '1.5' }}>
                  🔒 <strong>Your data is secure:</strong> We use bank-level encryption to protect your information and never share it with third parties.
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 pt-4 border-t border-border space-y-2">
              <Button
                onClick={handleKycSubmit}
                disabled={kycData.aadhaar.length !== 12 || kycData.pan.length !== 10}
                className="w-full h-12 rounded-[1.5rem] bg-[#ff9933] hover:bg-[#e67300] text-white active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: '16px', fontWeight: '700' }}
              >
                Verify Identity
              </Button>
              <Button
                variant="outline"
                onClick={handleKycCancel}
                className="w-full h-12 rounded-[1.5rem] active:scale-[0.98] transition-transform"
                style={{ fontSize: '16px', fontWeight: '600' }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Settings */}
      <Button variant="outline" className="w-full justify-start active:scale-[0.98] transition-transform h-12">
        Settings
      </Button>

      {/* Location Map - Only show if address exists */}
      {userProfile.address && (
        <div className="bg-card rounded-[1.5rem] overflow-hidden shadow-sm border border-border">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Pickup Location
            </h3>
          </div>
          <div className="relative w-full h-48 bg-muted">
            {/* Placeholder map - Replace with actual map integration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-8 h-8 text-primary mx-auto" />
                <p className="text-sm text-muted-foreground px-4">
                  {userProfile.address.split(',')[0]}
                </p>
                <p className="text-xs text-muted-foreground">
                  Map view placeholder
                </p>
              </div>
            </div>
            {/* You can integrate Google Maps, Mapbox, or Leaflet here */}
          </div>
        </div>
      )}

      {/* Sign Out */}
      <Button 
        variant="outline" 
        className="w-full justify-start text-destructive hover:text-destructive active:scale-[0.98] transition-transform gap-2 h-12"
        onClick={onLogout}
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    </div>
  );
}