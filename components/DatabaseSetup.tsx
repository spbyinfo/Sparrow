import { useState } from 'react';
import { Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { seedProducts } from '../utils/api';
import { SAMPLE_PRODUCTS } from '../utils/seedData';
import { toast } from 'sonner@2.0.3';

export function DatabaseSetup() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeeded, setIsSeeded] = useState(false);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    
    try {
      await seedProducts(SAMPLE_PRODUCTS as any);
      setIsSeeded(true);
      toast.success('Database seeded successfully!', {
        description: `${SAMPLE_PRODUCTS.length} products added to the database`,
      });
    } catch (error) {
      console.error('Error seeding database:', error);
      toast.error('Failed to seed database', {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card className="p-6 rounded-[1.5rem] border-border max-w-md mx-auto">
      <div className="text-center space-y-4">
        {/* Icon */}
        <div 
          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
            isSeeded ? 'bg-secondary/20' : 'bg-primary/20'
          }`}
        >
          {isSeeded ? (
            <CheckCircle className="w-8 h-8 text-secondary" />
          ) : (
            <Database className="w-8 h-8 text-primary" />
          )}
        </div>

        {/* Title */}
        <div>
          <h2 className="text-foreground mb-2">
            {isSeeded ? 'Database Ready' : 'Setup Database'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isSeeded 
              ? 'Your product database is ready to use'
              : 'Seed the database with sample products to get started'
            }
          </p>
        </div>

        {/* Details */}
        {!isSeeded && (
          <div className="bg-muted rounded-[1rem] p-4 text-left">
            <p className="text-xs text-muted-foreground mb-2">This will create:</p>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{SAMPLE_PRODUCTS.length} sample products</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Multiple brands (Coca-Cola, Amul, Bisleri, etc.)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Ready for scan tracking</span>
              </li>
            </ul>
          </div>
        )}

        {/* Warning */}
        {!isSeeded && (
          <div className="bg-accent/10 border border-accent rounded-[1rem] p-3 flex gap-2">
            <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-xs text-accent text-left">
              This will add products to your Supabase KV store. Run this once during initial setup.
            </p>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleSeedDatabase}
          disabled={isSeeding || isSeeded}
          className="w-full h-12 min-h-[48px] rounded-[1.5rem] transition-all active:scale-[0.98]"
        >
          {isSeeding ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Seeding Database...
            </>
          ) : isSeeded ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Database Seeded
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              Seed Database
            </>
          )}
        </Button>

        {/* Info */}
        {isSeeded && (
          <p className="text-xs text-muted-foreground">
            You can now start scanning products and viewing analytics
          </p>
        )}
      </div>
    </Card>
  );
}
