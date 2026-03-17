/**
 * Environment Badge - Shows current environment (Staging/Pre-Prod)
 * Only visible in non-production environments
 */

import { getEnvironmentBadgeConfig } from '../utils/environment'

export function EnvironmentBadge() {
  const badge = getEnvironmentBadgeConfig()

  if (!badge) return null

  return (
    <div
      className="fixed top-2 left-2 z-[100] px-2.5 py-1 rounded-md text-xs font-bold shadow-lg pointer-events-none"
      style={{ backgroundColor: badge.bgColor, color: badge.color, border: `2px solid ${badge.color}` }}
    >
      {badge.label}
    </div>
  )
}