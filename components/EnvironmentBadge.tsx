/**
 * EnvironmentBadge Component
 * Shows a badge in non-production environments to indicate which environment you're viewing
 */

import { getEnvironmentBadgeConfig } from '../utils/environment'

export function EnvironmentBadge() {
  const badge = getEnvironmentBadgeConfig()

  if (!badge) return null

  return (
    <div
      className="fixed top-0 right-0 z-50 px-3 py-1 text-xs font-semibold rounded-bl-lg"
      style={{
        backgroundColor: badge.bgColor,
        color: badge.color,
        border: `1px solid ${badge.color}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {badge.label}
    </div>
  )
}
