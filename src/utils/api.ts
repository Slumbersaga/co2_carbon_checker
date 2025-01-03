import { RideRequest, ApiResponse } from '../types/ride';
import { config } from './config';
import { mockRideData } from './mockData';

const USE_MOCK_DATA = true; // Set to false when using real API

export async function getRideEstimates(request: RideRequest): Promise<ApiResponse> {
  try {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return transformApiResponse(mockRideData);
    }

    const response = await fetch(config.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Ola-App-Id': import.meta.env.VITE_OLA_APP_ID,
        'X-Ola-App-Key': import.meta.env.VITE_OLA_APP_KEY
      },
      body: JSON.stringify({
        pickup_lat: request.pickup.latitude,
        pickup_lng: request.pickup.longitude,
        drop_lat: request.dropoff.latitude,
        drop_lng: request.dropoff.longitude,
        category: "all"
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return transformApiResponse(data);
  } catch (error) {
    console.error('Error fetching ride estimates:', error);
    throw new Error('Failed to get ride estimates. Please try again later.');
  }
}

function transformApiResponse(data: any): ApiResponse {
  try {
    return {
      estimates: data.categories.map((cat: any) => ({
        categoryId: cat.id,
        estimatedPrice: cat.estimate_fare_range.minimum,
        estimatedTime: cat.eta * 60, // Convert to seconds
        estimatedDistance: cat.distance,
        surgeMultiplier: cat.surge_multiplier || 1
      })),
      categories: data.categories.map((cat: any) => ({
        id: cat.id,
        name: cat.display_name,
        basePrice: cat.estimate_fare_range.minimum,
        image: cat.image_url
      })),
      status: data.status
    };
  } catch (error) {
    console.error('Error transforming API response:', error);
    throw new Error('Invalid response format from server');
  }
}