import { useState } from 'react';
import { Camera, Keyboard, CheckCircle, X, Scan } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from './ui/drawer';
import { recordScan } from '../utils/api';
import { toast } from 'sonner@2.0.3';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    sku: string;
    name: string;
    category: string;
    image: string;
    credits: number;
  };
  onScanComplete: (sku: string) => void;
}

export function ScanModal({ isOpen, onClose, product, onScanComplete }: ScanModalProps) {
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('camera');
  const [manualSKU, setManualSKU] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  const handleCameraScan = async () => {
    setIsScanning(true);
    
    // Simulate camera scan delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Record scan to backend
      await recordScan({
        sku: product.sku,
        city: 'Mumbai', // TODO: Get from user location
        area: 'Bandra West', // TODO: Get from user location
        pincode: '400050', // TODO: Get from user location
        scanMethod: 'camera',
        credits: product.credits,
      });
      
      setIsScanning(false);
      setScanSuccess(true);
      
      setTimeout(() => {
        onScanComplete(product.sku);
        handleClose();
      }, 1200);
    } catch (error) {
      console.error('Error recording scan:', error);
      setIsScanning(false);
      toast.error('Failed to record scan. Please try again.');
    }
  };

  const handleManualScan = async () => {
    if (manualSKU.toUpperCase() === product.sku) {
      try {
        // Record scan to backend
        await recordScan({
          sku: product.sku,
          city: 'Mumbai', // TODO: Get from user location
          area: 'Bandra West', // TODO: Get from user location
          pincode: '400050', // TODO: Get from user location
          scanMethod: 'manual',
          credits: product.credits,
        });
        
        setScanSuccess(true);
        setTimeout(() => {
          onScanComplete(product.sku);
          handleClose();
        }, 1200);
      } catch (error) {
        console.error('Error recording scan:', error);
        toast.error('Failed to record scan. Please try again.');
      }
    } else {
      toast.error('SKU does not match. Please scan the correct product.');
    }
  };

  const handleClose = () => {
    setScanSuccess(false);
    setManualSKU('');
    setIsScanning(false);
    onClose();
  };

  if (scanSuccess) {
    return (
      <Drawer open={isOpen} onOpenChange={handleClose}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle className="sr-only">Scan Success</DrawerTitle>
            <DrawerDescription className="sr-only">
              Product scanned successfully and pickup scheduled
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-8 pt-2">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-foreground">Pickup Scheduled</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  +{product.credits} credits earned
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  We'll collect this item on our next milk run
                </p>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <DrawerTitle>Scan Product</DrawerTitle>
            <button 
              onClick={handleClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted active:opacity-50 transition-opacity"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <DrawerDescription className="sr-only">
            Scan product barcode using camera or enter SKU manually
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-8 pt-4 space-y-4 overflow-y-auto">
          {/* Product Info */}
          <div className="flex gap-3 p-3 bg-muted rounded-xl">
            <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-card">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="truncate text-sm">{product.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
              <p className="text-xs text-primary mt-1">SKU: {product.sku}</p>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
            <button
              onClick={() => setScanMode('camera')}
              className={`py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                scanMode === 'camera'
                  ? 'bg-card shadow-sm'
                  : ''
              }`}
            >
              <Camera className="w-4 h-4" />
              <span className="text-sm">Camera</span>
            </button>
            <button
              onClick={() => setScanMode('manual')}
              className={`py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                scanMode === 'manual'
                  ? 'bg-card shadow-sm'
                  : ''
              }`}
            >
              <Keyboard className="w-4 h-4" />
              <span className="text-sm">Manual</span>
            </button>
          </div>

          {/* Camera Mode */}
          {scanMode === 'camera' && (
            <div className="space-y-3">
              <div className="aspect-square max-w-sm mx-auto bg-muted rounded-xl flex items-center justify-center relative">
                {isScanning ? (
                  <div className="text-center">
                    <Scan className="w-10 h-10 text-primary mx-auto animate-pulse" />
                    <p className="text-sm text-muted-foreground mt-2">Scanning...</p>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Position barcode in frame
                    </p>
                  </div>
                )}
                
                {!isScanning && (
                  <div className="absolute inset-8 border-2 border-primary/30 border-dashed rounded-xl" />
                )}
              </div>

              <Button
                size="lg"
                className="w-full active:scale-[0.98] transition-transform"
                onClick={handleCameraScan}
                disabled={isScanning}
              >
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </Button>
            </div>
          )}

          {/* Manual Mode */}
          {scanMode === 'manual' && (
            <div className="space-y-3">
              <div>
                <label htmlFor="sku-input" className="text-sm mb-2 block">
                  Enter SKU Code
                </label>
                <Input
                  id="sku-input"
                  type="text"
                  placeholder={product.sku}
                  value={manualSKU}
                  onChange={(e) => setManualSKU(e.target.value.toUpperCase())}
                  className="h-11 text-center"
                />
              </div>

              <Button
                size="lg"
                className="w-full active:scale-[0.98] transition-transform"
                onClick={handleManualScan}
                disabled={!manualSKU.trim()}
              >
                Verify SKU
              </Button>
            </div>
          )}

          {/* Helper */}
          <div className="bg-muted/50 rounded-xl p-3 text-xs text-muted-foreground text-center">
            Earn {product.credits} credits after scheduling pickup
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}