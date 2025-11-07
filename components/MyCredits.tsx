import { Sparkles, TrendingUp, Gift, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: string;
  date: string;
  time: string;
  description: string;
  credits: number;
}

interface BingoProduct {
  scanned: boolean;
  credits: number;
}

interface MyCreditsProps {
  totalCredits: number;
  transactions: Transaction[];
  bingoProducts: BingoProduct[];
}

export function MyCredits({ totalCredits, transactions, bingoProducts }: MyCreditsProps) {
  // Calculate this week and this month credits from transactions
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const creditsThisWeek = transactions
    .filter(t => new Date(t.date) >= weekAgo)
    .reduce((sum, t) => sum + t.credits, 0);
    
  const creditsThisMonth = transactions
    .filter(t => new Date(t.date) >= monthAgo)
    .reduce((sum, t) => sum + t.credits, 0);

  const earningsHistory = [
    { date: 'Oct 1', credits: 45 },
    { date: 'Oct 5', credits: 78 },
    { date: 'Oct 10', credits: 112 },
    { date: 'Oct 15', credits: 156 },
    { date: 'Oct 20', credits: 189 },
    { date: 'Oct 25', credits: 234 },
    { date: 'Today', credits: 280 }
  ];

  const availableRewards = [
    { id: '1', name: 'Hair & Nail Salon', icon: '💇', unlocked: true },
    { id: '2', name: 'Cinema', icon: '🎬', unlocked: true },
    { id: '3', name: 'Medical', icon: '⚕️', unlocked: false }
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto px-4 pb-6" style={{ paddingTop: 'max(env(safe-area-inset-top), 24px)' }}>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="border-primary/20">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-muted-foreground text-xs mb-1">This Week</p>
              <p className="text-xl font-semibold text-primary">{creditsThisWeek}</p>
              <p className="text-xs text-muted-foreground mt-1">credits earned</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-muted-foreground text-xs mb-1">This Month</p>
              <p className="text-xl font-semibold text-primary">{creditsThisMonth}</p>
              <p className="text-xs text-muted-foreground mt-1">credits earned</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Earnings Trend</CardTitle>
          <CardDescription className="text-xs">Last 30 days performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={earningsHistory}>
              <defs>
                <linearGradient id="creditGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff9933" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ff9933" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                fontSize={10}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={10}
                tickLine={false}
                width={30}
              />
              <Tooltip 
                contentStyle={{ 
                  fontSize: '12px', 
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="credits" 
                stroke="#ff9933" 
                strokeWidth={2}
                fill="url(#creditGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>



      {/* Available Rewards */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Redeem Rewards
          </CardTitle>
          <CardDescription className="text-xs">
            Exchange your credits for exciting rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {availableRewards.map((reward) => {
              return (
                <div
                  key={reward.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    reward.unlocked
                      ? 'border-primary/30 bg-primary/5' 
                      : 'border-border bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-2xl">{reward.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{reward.name}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={reward.unlocked ? 'default' : 'outline'}
                    disabled={!reward.unlocked}
                    className="ml-2 h-8 text-xs flex-shrink-0"
                  >
                    {reward.unlocked ? 'Unlocked' : 'Locked'}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>


    </div>
  );
}