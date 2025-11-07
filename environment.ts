/**
 * Environment Configuration
 * Manages environment-specific settings for Staging, Pre-Prod, and Production
 */

export type Environment = 'staging' | 'pre-production' | 'production'

export interface EnvironmentConfig {
  env: Environment
  apiUrl: string
  supabaseUrl: string
  supabaseAnonKey: string
  enableAnalytics: boolean
  enableDebugMode: boolean
  showEnvironmentBadge: boolean
}

// Safe access to import.meta.env
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || defaultValue
    }
  } catch (e) {
    // import.meta is not available
  }
  return defaultValue
}

// Get current environment from env variable
const getCurrentEnvironment = (): Environment => {
  const env = getEnvVar('VITE_ENV', 'staging')
  if (env === 'production' || env === 'pre-production') {
    return env as Environment
  }
  return 'staging'
}

// Environment-specific configurations
const configs: Record<Environment, Partial<EnvironmentConfig>> = {
  staging: {
    enableAnalytics: false,
    enableDebugMode: true,
    showEnvironmentBadge: true,
  },
  'pre-production': {
    enableAnalytics: true,
    enableDebugMode: true,
    showEnvironmentBadge: true,
  },
  production: {
    enableAnalytics: true,
    enableDebugMode: false,
    showEnvironmentBadge: false,
  },
}

const currentEnv = getCurrentEnvironment()
const currentConfig = configs[currentEnv]

// Build final config
export const environment: EnvironmentConfig = {
  env: currentEnv,
  apiUrl: getEnvVar('VITE_API_URL'),
  supabaseUrl: getEnvVar('VITE_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),
  enableAnalytics: currentConfig.enableAnalytics!,
  enableDebugMode: currentConfig.enableDebugMode!,
  showEnvironmentBadge: currentConfig.showEnvironmentBadge!,
}

// Helper functions
export const isProduction = () => environment.env === 'production'
export const isStaging = () => environment.env === 'staging'
export const isPreProduction = () => environment.env === 'pre-production'

// Logging helper (only logs in non-production)
export const devLog = (...args: any[]) => {
  if (environment.enableDebugMode) {
    console.log('[Sparrow Debug]', ...args)
  }
}

// Environment badge for non-production
export const getEnvironmentBadgeConfig = () => {
  if (!environment.showEnvironmentBadge) return null

  const badges = {
    staging: {
      label: 'STAGING',
      color: '#ffd700', // Gold
      bgColor: '#ffd70020',
    },
    'pre-production': {
      label: 'PRE-PROD',
      color: '#ff9933', // Saffron
      bgColor: '#ff993320',
    },
  }

  return badges[environment.env as keyof typeof badges] || null
}
