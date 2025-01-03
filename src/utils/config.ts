export const config = {
  API_URL: 'https://devapi.olacabs.com/v1/products',
  ACCESS_TOKEN: import.meta.env.VITE_OLA_ACCESS_TOKEN,
  DEFAULT_COORDINATES: {
    BANGALORE: {
      pickup: { latitude: 12.9716, longitude: 77.5946 }, // Bangalore City Center
      dropoff: { latitude: 13.0827, longitude: 77.5877 } // Bangalore Airport
    }
  }
};