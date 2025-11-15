import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-efcc1648`;

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API call failed: ${response.statusText}`);
  }

  return response.json();
}

// ============================================
// PRODUCT API
// ============================================

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  brandId: string;
  brandLogo: string;
  image: string;
  image3D: string;
  plasticType: string;
  description: string;
  recyclable: boolean;
  credits: number;
}

export async function getAllProducts(): Promise<Product[]> {
  const response = await apiCall('/products');
  return response.products;
}

export async function getProductBySKU(sku: string): Promise<Product> {
  const response = await apiCall(`/products/${sku}`);
  return response.product;
}

export async function seedProducts(products: Product[]): Promise<void> {
  await apiCall('/products/seed', {
    method: 'POST',
    body: JSON.stringify(products),
  });
}

// ============================================
// SCAN API
// ============================================

export interface ScanData {
  sku: string;
  city: string;
  area: string;
  pincode: string;
  scanMethod?: 'camera' | 'manual';
  credits?: number;
}

export interface ScanResponse {
  success: boolean;
  scanId: string;
  credits: number;
  message: string;
}

export async function recordScan(scanData: ScanData): Promise<ScanResponse> {
  const response = await apiCall('/scans', {
    method: 'POST',
    body: JSON.stringify(scanData),
  });
  return response;
}

// ============================================
// B2B ANALYTICS API
// ============================================

export interface BrandOverview {
  totalScans: number;
  totalCredits: number;
  scansThisWeek: number;
  scansThisMonth: number;
  dailyStats: Array<{
    date: string;
    totalScans: number;
    totalCredits: number;
    uniqueAreas: string[];
    scansByCityMap: Record<string, number>;
    scansByHourMap: Record<number, number>;
  }>;
}

export async function getBrandOverview(brandId: string): Promise<BrandOverview> {
  const response = await apiCall(`/analytics/${brandId}/overview`);
  return response.overview;
}

export interface GeographyData {
  cities: Record<string, number>;
  topAreas: Array<{ area: string; count: number }>;
}

export async function getBrandGeography(brandId: string, days: number = 30): Promise<GeographyData> {
  const response = await apiCall(`/analytics/${brandId}/geography?days=${days}`);
  return response.geography;
}

export interface ProductPerformance {
  sku: string;
  name: string;
  category: string;
  totalScans: number;
  creditsPerScan: number;
  totalCredits: number;
}

export async function getBrandProducts(brandId: string): Promise<ProductPerformance[]> {
  const response = await apiCall(`/analytics/${brandId}/products`);
  return response.products;
}
