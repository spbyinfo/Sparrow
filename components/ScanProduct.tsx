import { useState } from 'react';
import { Scan, Camera, Keyboard, CheckCircle, Sparkles, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BingoProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  image: string;
  scanned: boolean;
  credits: number;
}

interface ScanProductProps {
  bingoProducts: BingoProduct[];
  onProductScanned: (sku: string) => void;
}

export function ScanProduct({ bingoProducts, onProductScanned }: ScanProductProps) {
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('camera');
  const [manualSKU, setManualSKU] = useState('');
  const [scannedProduct, setScannedProduct] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Create product database from bingo products
  const productDatabase: Record<string, any> = bingoProducts.reduce((acc, product) => {
    acc[product.sku] = {
      ...product,
      brand: product.name.split(' ')[0],
      onBingoCard: true,
      alreadyScanned: product.scanned
    };
    return acc;
  }, {} as Record<string, any>);

  const handleCameraScan = () => {
    setIsScanning(true);
    // Simulate camera scanning - pick a random unscanned product
    setTimeout(() => {
      const unscannedProducts = bingoProducts.filter(p => !p.scanned);
      if (unscannedProducts.length > 0) {
        const randomProduct = unscannedProducts[Math.floor(Math.random() * unscannedProducts.length)];
        const product = productDatabase[randomProduct.sku];
        setScannedProduct(product);
      } else {
        // All products scanned
        const product = productDatabase['SKU001'];
        setScannedProduct({ ...product, alreadyScanned: true });
      }
      setIsScanning(false);
    }, 2000);
  };

  const handleManualScan = () => {
    const product = productDatabase[manualSKU.toUpperCase()];
    if (product) {
      setScannedProduct(product);
    } else {
      setScannedProduct({ notFound: true });
    }
  };

  const handleSchedulePickup = () => {
    if (scannedProduct && !scannedProduct.alreadyScanned) {
      onProductScanned(scannedProduct.sku);
    }
    setScannedProduct(null);
    setManualSKU('');
  };

  const handleScanAgain = () => {
    setScannedProduct(null);
    setManualSKU('');
  };

  // Success state
  if (scannedProduct && !scannedProduct.notFound && !scannedProduct.alreadyScanned) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-primary">Product Recognized!</h2>
          <p className="text-muted-foreground text-sm mt-1">
            This product is on your bingo card
          </p>
        </div>

        {/* Product Card */}
        <Card className="border-primary/30">
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-border">
                <ImageWithFallback
                  src={scannedProduct.image}
                  alt={scannedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="truncate">{scannedProduct.name}</h3>
                <p className="text-muted-foreground text-sm">{scannedProduct.brand}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {scannedProduct.sku}
                  </Badge>
                  <Badge className="bg-primary text-primary-foreground gap-1 text-xs">
                    <Sparkles className="w-3 h-3" />
                    {scannedProduct.credits} Credits
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            size="lg" 
            className="w-full h-12 active:scale-[0.98] transition-transform"
            onClick={handleSchedulePickup}
          >
            Schedule Pickup & Earn Credits
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full h-12 active:scale-[0.98] transition-transform"
            onClick={handleScanAgain}
          >
            Scan Another Product
          </Button>
        </div>
      </div>
    );
  }

  // Already scanned state
  if (scannedProduct && scannedProduct.alreadyScanned) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-3">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2>Already Scanned</h2>
          <p className="text-muted-foreground text-sm mt-1">
            You've already marked this product
          </p>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-border">
                <ImageWithFallback
                  src={scannedProduct.image}
                  alt={scannedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="truncate">{scannedProduct.name}</h3>
                <p className="text-muted-foreground text-sm">{scannedProduct.brand}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {scannedProduct.sku}
                </Badge>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-3">
              Each product can only be scanned once per week.
            </p>
          </CardContent>
        </Card>

        <Button 
          size="lg" 
          variant="outline" 
          className="w-full h-12"
          onClick={handleScanAgain}
        >
          Scan Another Product
        </Button>
      </div>
    );
  }

  // Not found state
  if (scannedProduct && scannedProduct.notFound) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center mb-3">
            <X className="w-8 h-8 text-destructive" />
          </div>
          <h2>Not on Bingo Card</h2>
          <p className="text-muted-foreground text-sm mt-1">
            This product isn't part of this week's challenge
          </p>
        </div>

        <Card className="border-destructive/30">
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground text-sm">
              Only products on your weekly bingo card can be scanned. Check your bingo card to see which products you can scan this week.
            </p>
          </CardContent>
        </Card>

        <Button 
          size="lg" 
          variant="outline" 
          className="w-full h-12"
          onClick={handleScanAgain}
        >
          Try Again
        </Button>
      </div>
    );
  }

  // Scan interface
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2>Scan Product</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Scan the SKU barcode or enter it manually
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
        <button
          onClick={() => setScanMode('camera')}
          className={`py-2.5 px-4 rounded-md transition-all flex items-center justify-center gap-2 ${
            scanMode === 'camera'
              ? 'bg-background shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span className="text-sm font-medium">Camera</span>
        </button>
        <button
          onClick={() => setScanMode('manual')}
          className={`py-2.5 px-4 rounded-md transition-all flex items-center justify-center gap-2 ${
            scanMode === 'manual'
              ? 'bg-background shadow-sm'
              : 'text-muted-foreground'
          }`}
        >
          <Keyboard className="w-4 h-4" />
          <span className="text-sm font-medium">Manual</span>
        </button>
      </div>

      {/* Camera Scan Mode */}
      {scanMode === 'camera' && (
        <Card>
          <CardContent className="p-6">
            <div className="aspect-square max-w-sm mx-auto bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              {isScanning ? (
                <div className="text-center">
                  <Scan className="w-16 h-16 text-primary mx-auto animate-pulse" />
                  <p className="text-muted-foreground mt-4">Scanning...</p>
                </div>
              ) : (
                <div className="text-center p-6">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">
                    Position the SKU barcode within the frame
                  </p>
                </div>
              )}
              
              {/* Scanning Frame Overlay */}
              {!isScanning && (
                <div className="absolute inset-8 border-2 border-primary rounded-lg border-dashed opacity-50" />
              )}
            </div>

            <Button
              size="lg"
              className="w-full h-12 mt-4 active:scale-[0.98] transition-transform"
              onClick={handleCameraScan}
              disabled={isScanning}
            >
              {isScanning ? 'Scanning...' : 'Start Camera Scan'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Manual Entry Mode */}
      {scanMode === 'manual' && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="sku-input" className="text-sm font-medium mb-2 block">
                  Enter SKU Code
                </label>
                <Input
                  id="sku-input"
                  type="text"
                  placeholder="e.g., SKU001"
                  value={manualSKU}
                  onChange={(e) => setManualSKU(e.target.value.toUpperCase())}
                  className="h-12 text-center text-lg"
                />
              </div>

              <Button
                size="lg"
                className="w-full h-12 active:scale-[0.98] transition-transform"
                onClick={handleManualScan}
                disabled={!manualSKU.trim()}
              >
                Verify SKU
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Help */}
      <Card className="bg-accent/50 border-accent">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Scan className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">How to scan:</p>
              <p>• Use camera to scan the SKU barcode on your product packaging</p>
              <p>• Or enter the SKU code manually if barcode is damaged</p>
              <p>• Only products on your weekly bingo card will be accepted</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
