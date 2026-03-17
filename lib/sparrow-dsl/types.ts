/**
 * Sparrow DSL - Type Definitions
 * 
 * Core types for the Sparrow region-based card scheduling language
 */

// ============================================================================
// REGIONS
// ============================================================================
export type Region = 
  | 'mumbai'
  | 'delhi'
  | 'bangalore'
  | 'chennai'
  | 'kolkata'
  | 'hyderabad'
  | 'pune'
  | 'ahmedabad'
  | 'jaipur'
  | 'lucknow';

export type Timezone = 
  | 'Asia/Kolkata'
  | 'Asia/Calcutta';

// ============================================================================
// USER TIERS
// ============================================================================
export type UserTier = 'bronze' | 'silver' | 'gold' | 'platinum';

// ============================================================================
// GRID CONFIGURATIONS
// ============================================================================
export type GridSize = '3x3' | '4x4';

// ============================================================================
// TIME & SCHEDULING
// ============================================================================
export interface TimeRange {
  from: string; // ISO 8601 datetime
  to: string;   // ISO 8601 datetime
}

export type DayOfWeek = 
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type ScheduleType = 'weekly' | 'monthly' | 'daily' | 'custom';

export type ScheduleAction = 
  | 'rotate_card'
  | 'activate_card'
  | 'deactivate_card'
  | 'reset_card'
  | 'reset_streaks'
  | 'apply_bonus'
  | 'tier_promotion'
  | 'sync_products'
  | 'apply_region_rules'
  | 'publish_offer'
  | 'hide_offer'
  | 'sync_inventory';

export interface Schedule {
  type: ScheduleType;
  dayOfWeek?: DayOfWeek;
  dayOfMonth?: number; // 1-31
  time: string; // HH:MM format
  action: ScheduleAction;
  params?: Record<string, any>;
}

// ============================================================================
// PRODUCTS
// ============================================================================
export interface Product {
  id: string;
  name: string;
  category: string;
  plasticType?: string;
  credits: number;
}

export interface SeasonalProduct {
  id: string;
  available: TimeRange;
  multiplier?: number; // Credit multiplier during season
}

export interface ProductConfiguration {
  available: string[]; // Product IDs
  seasonal?: SeasonalProduct[];
  restricted?: string[]; // Product IDs not available in region
}

// ============================================================================
// CARDS
// ============================================================================
export interface CardRewards {
  completion: number; // Base credits for completion
  bonus?: {
    early?: number; // Bonus for completing before threshold
    streak?: number; // Bonus for consecutive completions
    condition?: string; // Custom condition
    hours?: number; // Hours threshold for early completion
    amount?: number; // Bonus amount
  };
}

export interface CardGrid {
  size: GridSize;
  products: string[]; // Product IDs - must match grid size (9 for 3x3, 16 for 4x4)
}

export interface Card {
  id: string;
  name: string;
  active: TimeRange;
  grid: CardGrid;
  rewards: CardRewards;
  tiers: UserTier[]; // Which tiers can see/access this card
  priority?: number; // Display priority (higher = shown first)
  tags?: string[]; // For filtering/searching
}

// ============================================================================
// RULES & CONFIGURATION
// ============================================================================
export interface RegionRules {
  pickupRadius?: number; // km
  minScansForCompletion?: number;
  allowDuplicates?: boolean;
  maxActiveCards?: number;
  pickupTimeslots?: string[]; // e.g., ["09:00-12:00", "14:00-18:00"]
  blackoutDates?: string[]; // ISO dates when no pickups allowed
  bookingWindow?: number; // Days in advance booking allowed
  cancellationWindow?: number; // Hours before service can cancel
  maxActiveOffers?: number;
  bookingTimeslots?: string[];
}

// ============================================================================
// OFFERS (for salon/spa passes)
// ============================================================================
export interface Offer {
  id: string;
  name: string;
  service: string;
  partner: {
    id: string;
    name: string;
    location: string;
    address?: string;
  };
  visible: TimeRange;
  slots: Array<{
    date: string;
    time: string;
    available: number;
    status?: string;
  }>;
  pricing: {
    original: number;
    discounted: number;
    discount: number;
  };
  tiers: UserTier[];
  maxBookings: number;
  maxPerUser: number;
  description?: string;
  tags?: string[];
  priority?: number;
}

// ============================================================================
// MAIN CONFIGURATION
// ============================================================================
export interface SparrowDSLConfig {
  sparrow: string; // Version (e.g., "1.0" or "2.0")
  type?: 'bingo' | 'offers' | 'both'; // Type of configuration
  region: Region;
  timezone: Timezone;
  extends?: string; // Inherit from another config file
  overrides?: Partial<SparrowDSLConfig>; // Override inherited values
  
  cards?: Card[]; // Optional if type = 'offers'
  offers?: Offer[]; // Optional if type = 'bingo'
  schedules: Schedule[];
  products?: ProductConfiguration; // Optional if type = 'offers'
  rules: RegionRules;
  
  metadata?: {
    author?: string;
    description?: string;
    lastUpdated?: string;
    version?: string;
    notes?: string;
  };
}

// ============================================================================
// VALIDATION RESULTS
// ============================================================================
export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
  code?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

// ============================================================================
// SCHEDULER RESULTS
// ============================================================================
export interface ScheduledCard {
  card: Card;
  activationTime: Date;
  deactivationTime: Date;
  isActive: boolean;
  nextAction?: {
    action: ScheduleAction;
    scheduledFor: Date;
  };
}

export interface SchedulerState {
  region: Region;
  currentCard?: ScheduledCard;
  upcomingCards: ScheduledCard[];
  activeProducts: string[];
  nextSchedule?: {
    action: ScheduleAction;
    time: Date;
  };
}

// ============================================================================
// INTERPRETER CONTEXT
// ============================================================================
export interface InterpreterContext {
  config: SparrowDSLConfig;
  currentTime: Date;
  userTier?: UserTier;
  region: Region;
}

export interface InterpreterResult {
  success: boolean;
  action: ScheduleAction;
  result?: any;
  error?: string;
}

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Type guard to check if a value is a valid Region
 */
export function isRegion(value: string): value is Region {
  const regions: Region[] = [
    'mumbai', 'delhi', 'bangalore', 'chennai', 'kolkata',
    'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'lucknow'
  ];
  return regions.includes(value as Region);
}

/**
 * Type guard to check if a value is a valid UserTier
 */
export function isUserTier(value: string): value is UserTier {
  const tiers: UserTier[] = ['bronze', 'silver', 'gold', 'platinum'];
  return tiers.includes(value as UserTier);
}

/**
 * Type guard to check if a value is a valid GridSize
 */
export function isGridSize(value: string): value is GridSize {
  return value === '3x3' || value === '4x4';
}

/**
 * Get expected product count for grid size
 */
export function getGridProductCount(size: GridSize): number {
  return size === '3x3' ? 9 : 16;
}
