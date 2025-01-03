// ride.ts
export interface Location {
  latitude: number;
  longitude: number;
}

export interface RideRequest {
  pickup: Location; //  no change required here
  dropoff: Location; // no change required here
}

export interface Category {
  id: string;
  name: string;
}

export interface Estimate {
  categoryId: string;
  estimatedPrice: number;
  estimatedTime: number;
}

export interface ApiResponse {
  categories: Category[];
  estimates: Estimate[];
}