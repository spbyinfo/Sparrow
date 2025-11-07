import { useState } from 'react';
import { Settings, Database, Zap, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DatabaseSetup } from './DatabaseSetup';
import { GenerateTestScans } from './GenerateTestScans';
import { B2BAnalyticsDashboard } from './B2BAnalyticsDashboard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const AVAILABLE_BRANDS = [
  { id: 'coca-cola', name: 'Coca-Cola' },
  { id: 'amul', name: 'Amul' },
  { id: 'bisleri', name: 'Bisleri' },
  { id: 'nestle', name: 'Nestlé' },
  { id: 'dove', name: 'Dove' },
  { id: 'frooti', name: 'Frooti' },
  { id: 'pepsico', name: 'PepsiCo' },
  { id: 'dabur-real', name: 'Dabur Real' },
  { id: 'ponds', name: 'Ponds' },
];

export function AdminPanel() {
  const [selectedBrand, setSelectedBrand] = useState<string>('coca-cola');

  const brand = AVAILABLE_BRANDS.find(b => b.id === selectedBrand);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">
                Database setup, testing, and B2B analytics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="setup" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Setup</span>
            </TabsTrigger>
            <TabsTrigger value="test-data" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Test Data</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Setup Tab */}
          <TabsContent value="setup" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-foreground mb-2">Database Setup</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                First-time setup: seed the database with sample products. 
                Run this once to populate the product catalog.
              </p>
            </div>
            <DatabaseSetup />
          </TabsContent>

          {/* Test Data Tab */}
          <TabsContent value="test-data" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-foreground mb-2">Generate Test Scans</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Create sample scan data to test the B2B analytics dashboard. 
                This will generate realistic scans across multiple cities and products.
              </p>
            </div>
            <GenerateTestScans />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Brand Selector */}
            <div className="max-w-md mx-auto">
              <label className="text-sm text-foreground mb-2 block">
                Select Brand
              </label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="h-12 min-h-[48px] rounded-[1.5rem]">
                  <SelectValue placeholder="Choose a brand" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_BRANDS.map(brand => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dashboard */}
            {brand && (
              <B2BAnalyticsDashboard 
                brandId={brand.id}
                brandName={brand.name}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
