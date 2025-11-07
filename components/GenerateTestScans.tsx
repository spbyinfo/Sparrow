import { useState } from 'react';
import { Zap, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { recordScan } from '../utils/api';
import { SAMPLE_PRODUCTS } from '../utils/seedData';
import { toast } from 'sonner@2.0.3';

const INDIAN_CITIES = [
  { city: 'Mumbai', areas: ['Bandra West', 'Andheri', 'Juhu', 'Powai', 'Colaba'] },
  { city: 'Delhi', areas: ['Connaught Place', 'Karol Bagh', 'Nehru Place', 'Dwarka', 'Rohini'] },
  { city: 'Bangalore', areas: ['Koramangala', 'Indiranagar', 'Whitefield', 'Jayanagar', 'HSR Layout'] },
  { city: 'Chennai', areas: ['T. Nagar', 'Adyar', 'Anna Nagar', 'Velachery', 'Mylapore'] },
  { city: 'Pune', areas: ['Koregaon Park', 'Hinjewadi', 'Viman Nagar', 'Kothrud', 'Aundh'] },
];

export function GenerateTestScans() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);

  const generateRandomScan = () => {
    // Pick random product
    const product = SAMPLE_PRODUCTS[Math.floor(Math.random() * SAMPLE_PRODUCTS.length)];
    
    // Pick random city
    const cityData = INDIAN_CITIES[Math.floor(Math.random() * INDIAN_CITIES.length)];
    
    // Pick random area in that city
    const area = cityData.areas[Math.floor(Math.random() * cityData.areas.length)];
    
    // Generate random pincode (6 digits)
    const pincode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Random scan method
    const scanMethod = Math.random() > 0.3 ? 'camera' : 'manual';
    
    return {
      sku: product.sku,
      city: cityData.city,
      area,
      pincode,
      scanMethod,
      credits: product.credits,
    };
  };

  const handleGenerateScans = async (count: number) => {
    setIsGenerating(true);
    setGeneratedCount(0);
    
    try {
      const scans = Array.from({ length: count }, generateRandomScan);
      
      for (let i = 0; i < scans.length; i++) {
        await recordScan(scans[i] as any);
        setGeneratedCount(i + 1);
        
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      toast.success('Test scans generated!', {
        description: `Successfully created ${count} sample scans`,
      });
    } catch (error) {
      console.error('Error generating scans:', error);
      toast.error('Failed to generate scans', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 rounded-[1.5rem] border-border max-w-md mx-auto">
      <div className="text-center space-y-4">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
          <Zap className="w-8 h-8 text-accent" />
        </div>

        {/* Title */}
        <div>
          <h2 className="text-foreground mb-2">Generate Test Scans</h2>
          <p className="text-sm text-muted-foreground">
            Create sample scan data for testing the B2B analytics dashboard
          </p>
        </div>

        {/* Info */}
        <div className="bg-muted rounded-[1rem] p-4 text-left">
          <p className="text-xs text-muted-foreground mb-2">Test data includes:</p>
          <ul className="text-sm space-y-1">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Random products from all brands</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>5 major Indian cities</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Camera and manual scan methods</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Realistic location data</span>
            </li>
          </ul>
        </div>

        {/* Progress */}
        {isGenerating && (
          <div className="bg-primary/10 rounded-[1rem] p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <p className="text-sm text-foreground">Generating scans...</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {generatedCount} scans created
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={() => handleGenerateScans(10)}
            disabled={isGenerating}
            className="w-full h-12 min-h-[48px] rounded-[1.5rem] transition-all active:scale-[0.98]"
            variant="outline"
          >
            <Zap className="w-4 h-4 mr-2" />
            Generate 10 Scans
          </Button>
          
          <Button
            onClick={() => handleGenerateScans(50)}
            disabled={isGenerating}
            className="w-full h-12 min-h-[48px] rounded-[1.5rem] transition-all active:scale-[0.98]"
            variant="outline"
          >
            <Zap className="w-4 h-4 mr-2" />
            Generate 50 Scans
          </Button>

          <Button
            onClick={() => handleGenerateScans(100)}
            disabled={isGenerating}
            className="w-full h-12 min-h-[48px] rounded-[1.5rem] transition-all active:scale-[0.98]"
          >
            <Zap className="w-4 h-4 mr-2" />
            Generate 100 Scans
          </Button>
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground">
          💡 Use this to populate test data for the B2B analytics dashboard
        </p>
      </div>
    </Card>
  );
}
