// Utility functions to manage partner inventory
// Use these when you get your first partners!

import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-efcc1648`;

/**
 * Add or update inventory for a business
 * Call this when you negotiate a deal with a partner
 * 
 * Example:
 * await setBusinessInventory('1', 50, '2025-01');
 */
export async function setBusinessInventory(
  businessId: string,
  availableServices: number,
  month?: string
) {
  try {
    const response = await fetch(`${API_BASE}/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        businessId,
        available: availableServices,
        month: month || new Date().toISOString().substring(0, 7), // YYYY-MM
      }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to set inventory');
    }

    console.log(`✅ Set ${availableServices} services for business ${businessId}`);
    return data.inventory;
  } catch (error) {
    console.error('Error setting inventory:', error);
    throw error;
  }
}

/**
 * Get current inventory for a business
 */
export async function getBusinessInventory(businessId: string) {
  try {
    const response = await fetch(`${API_BASE}/inventory/${businessId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to get inventory');
    }

    return data.inventory;
  } catch (error) {
    console.error('Error getting inventory:', error);
    throw error;
  }
}

/**
 * Create a new reservation
 */
export async function createReservation(
  userId: string,
  businessId: string,
  businessName: string,
  userName: string,
  userEmail?: string,
  userPhone?: string
) {
  try {
    const response = await fetch(`${API_BASE}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        userId,
        businessId,
        businessName,
        userName,
        userEmail: userEmail || '',
        userPhone: userPhone || '',
      }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create reservation');
    }

    console.log(`✅ Reservation created: ${data.reservation.confirmationCode}`);
    return data.reservation;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw error;
  }
}

/**
 * Get all reservations for a user
 */
export async function getUserReservations(userId: string) {
  try {
    const response = await fetch(`${API_BASE}/reservations/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to get reservations');
    }

    return data.reservations;
  } catch (error) {
    console.error('Error getting reservations:', error);
    throw error;
  }
}

/**
 * Look up a reservation by confirmation code
 * (For you to verify at the business)
 */
export async function verifyReservationCode(confirmationCode: string) {
  try {
    const response = await fetch(`${API_BASE}/reservations/code/${confirmationCode}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Reservation not found');
    }

    return data.reservation;
  } catch (error) {
    console.error('Error verifying code:', error);
    throw error;
  }
}

/**
 * Mark a reservation as redeemed
 * (Call this after the user uses the service)
 */
export async function markAsRedeemed(reservationId: string) {
  try {
    const response = await fetch(`${API_BASE}/reservations/${reservationId}/redeem`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to mark as redeemed');
    }

    console.log(`✅ Reservation marked as redeemed`);
    return data.reservation;
  } catch (error) {
    console.error('Error marking as redeemed:', error);
    throw error;
  }
}
