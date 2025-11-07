import { useState } from 'react';
import { X, Package, Recycle, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from './ui/drawer';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    sku: string;
    name: string;
    category: string;
    plasticType: string;
    brandLogo: string;
    image3D: string;
    credits: number;
    description: string;
    recyclable: boolean;
  };
  onScanClick: () => void;
}

export function ProductDetailModal({ isOpen, onClose, product, onScanClick }: ProductDetailModalProps) {
  const [is3DRotating, setIs3DRotating] = useState(true);

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>Product Details</DrawerTitle>
              <DrawerDescription className="sr-only">
                View detailed information about {product.name} including 3D model, credits, and recyclability
              </DrawerDescription>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted active:opacity-50 transition-opacity"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-8 pt-4 space-y-4 overflow-y-auto">
          {/* 3D Product View */}
          <div className="relative">
            <div 
              className="aspect-square max-w-sm mx-auto bg-muted rounded-2xl flex items-center justify-center relative overflow-hidden cursor-pointer"
              onClick={() => setIs3DRotating(!is3DRotating)}
            >
              {/* Mock 3D Product Visualization */}
              <div className={`w-full h-full flex items-center justify-center transition-transform duration-1000 ${is3DRotating ? 'animate-spin-slow' : ''}`}>
                <img
                  src={product.image3D}
                  alt={`3D model of ${product.name}`}
                  className="w-3/4 h-3/4 object-contain drop-shadow-2xl"
                />
              </div>
              
              {/* 3D Badge */}
              <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border">
                <span className="text-xs text-primary">3D View</span>
              </div>

              {/* Interaction Hint */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border">
                <span className="text-xs text-muted-foreground">
                  {is3DRotating ? 'Tap to pause' : 'Tap to rotate'}
                </span>
              </div>
            </div>

            {/* Plastic Type Badge */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-full px-4 py-1.5 shadow-sm">
              <div className="flex items-center gap-2">
                <Recycle className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs">{product.plasticType}</span>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-3">
            {/* Brand & Name */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-white rounded-xl border border-border flex items-center justify-center shadow-sm overflow-hidden">
                <img 
                  src={product.brandLogo} 
                  alt="Brand logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h3 className="text-foreground">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{product.category}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-muted rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs">Product Details</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Credits & Recyclability */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-center">
                <p className="text-2xl text-primary">{product.credits}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Green Credits</p>
              </div>
              <div className={`${product.recyclable ? 'bg-green-500/5 border-green-500/20' : 'bg-orange-500/5 border-orange-500/20'} border rounded-xl p-3 text-center`}>
                <p className={`text-2xl ${product.recyclable ? 'text-green-600' : 'text-orange-600'}`}>
                  {product.recyclable ? '✓' : '△'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {product.recyclable ? 'Recyclable' : 'Special Care'}
                </p>
              </div>
            </div>

            {/* SKU */}
            <div className="bg-muted/50 rounded-xl p-3 text-center">
              <p className="text-xs text-muted-foreground">SKU Code</p>
              <p className="text-sm text-foreground mt-0.5 font-mono">{product.sku}</p>
            </div>
          </div>

          {/* Scan Button */}
          <Button
            size="lg"
            className="w-full active:scale-[0.98] transition-transform"
            onClick={() => {
              onClose();
              onScanClick();
            }}
          >
            Scan This Product
          </Button>

          {/* Helper Text */}
          <div className="bg-muted/50 rounded-xl p-3 text-xs text-muted-foreground text-center">
            Scan the barcode on your product to schedule pickup and earn credits
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/* Add this to globals.css for the slow spin animation:
@keyframes spin-slow {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
*/
