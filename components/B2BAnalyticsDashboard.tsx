import { useState, useEffect } from 'react';
import { TrendingUp, Package, MapPin, Calendar, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  getBrandOverview, 
  getBrandGeography, 
  getBrandProducts,
  type BrandOverview,
  type GeographyData,
  type ProductPerformance
} from '../utils/api';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface B2BAnalyticsDashboardProps {
  brandId: string;
  brandName: string;
}

export function B2BAnalyticsDashboard({ brandId, brandName }: B2BAnalyticsDashboardProps) {
  const [overview, setOverview] = useState<BrandOverview | null>(null);
  const [geography, setGeography] = useState<GeographyData | null>(null);
  const [products, setProducts] = useState<ProductPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<7 | 30>(30);

  useEffect(() => {
    loadAnalytics();
  }, [brandId, timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [overviewData, geoData, productsData] = await Promise.all([
        getBrandOverview(brandId),
        getBrandGeography(brandId, timeRange),
        getBrandProducts(brandId),
      ]);
      
      setOverview(overviewData);
      setGeography(geoData);
      setProducts(productsData);
    } catch (err) {
      console.error('Error loading analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-6 max-w-md">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <BarChart3 className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="text-foreground">Error Loading Data</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button onClick={loadAnalytics} className="w-full">
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!overview) return null;

  // Prepare chart data
  const dailyChartData = overview.dailyStats.slice(-timeRange).map(day => ({
    date: new Date(day.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    scans: day.totalScans,
    credits: day.totalCredits,
  }));

  const cityChartData = geography ? Object.entries(geography.cities).map(([city, count]) => ({
    city,
    scans: count,
  })).sort((a, b) => b.scans - a.scans).slice(0, 5) : [];

  const COLORS = ['#ff9933', '#059669', '#ffd700', '#dc143c', '#4169e1'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-foreground">{brandName} Analytics</h1>
            <div className="flex gap-2">
              <Button
                variant={timeRange === 7 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(7)}
                className="rounded-[1rem]"
              >
                7 Days
              </Button>
              <Button
                variant={timeRange === 30 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(30)}
                className="rounded-[1rem]"
              >
                30 Days
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Real-time insights into how consumers engage with your products
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 rounded-[1.5rem] border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Scans</p>
                <h3 className="text-foreground">{overview.totalScans.toLocaleString()}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-[1.5rem] border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Week</p>
                <h3 className="text-foreground">{overview.scansThisWeek.toLocaleString()}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-[1.5rem] border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <h3 className="text-foreground">{overview.scansThisMonth.toLocaleString()}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-foreground" />
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-[1.5rem] border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Credits Issued</p>
                <h3 className="text-foreground">{overview.totalCredits.toLocaleString()}</h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ffd700]/10 flex items-center justify-center">
                <Package className="w-5 h-5" style={{ color: '#ffd700' }} />
              </div>
            </div>
          </Card>
        </div>

        {/* Scans Over Time */}
        <Card className="p-6 rounded-[1.5rem] border-border">
          <h3 className="text-foreground mb-4">Scans Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="scans" 
                stroke="#ff9933" 
                strokeWidth={2}
                name="Scans"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Geographic Distribution & Product Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* City Distribution */}
          <Card className="p-6 rounded-[1.5rem] border-border">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-foreground">Top Cities</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cityChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ city, percent }) => `${city} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="scans"
                >
                  {cityChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Products */}
          <Card className="p-6 rounded-[1.5rem] border-border">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-primary" />
              <h3 className="text-foreground">Product Performance</h3>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {products.slice(0, 5).map((product, index) => (
                <div 
                  key={product.sku}
                  className="flex items-center justify-between p-3 bg-muted rounded-[1rem]"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{product.totalScans}</p>
                    <p className="text-xs text-muted-foreground">scans</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Top Areas */}
        {geography && geography.topAreas.length > 0 && (
          <Card className="p-6 rounded-[1.5rem] border-border">
            <h3 className="text-foreground mb-4">Most Active Neighborhoods</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {geography.topAreas.map((item, index) => (
                <div
                  key={item.area}
                  className="p-4 bg-muted rounded-[1rem] text-center"
                >
                  <div 
                    className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground truncate">{item.area}</p>
                  <p className="text-xs text-muted-foreground">{item.count} days active</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
