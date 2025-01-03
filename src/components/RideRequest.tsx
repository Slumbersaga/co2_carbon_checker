import React, { useState } from 'react';
import { Car } from 'lucide-react';
import LocationInput from './LocationInput';
import CabOption from './CabOption';
import { getRideEstimates } from '../utils/api';
import { RideRequest as RideRequestType, ApiResponse } from '../types/ride';
import { config } from '../utils/config';

export default function RideRequest() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [estimates, setEstimates] = useState<ApiResponse | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Using Bangalore coordinates for demonstration
      const request: RideRequestType = {
        pickup: config.DEFAULT_COORDINATES.BANGALORE.pickup,
        dropoff: config.DEFAULT_COORDINATES.BANGALORE.dropoff
      };

      const response = await getRideEstimates(request);
      setEstimates(response);
      if (response.categories.length > 0) {
        setSelectedCategoryId(response.categories[0].id);
      }
    } catch (err) {
      setError('Failed to get ride estimates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    // In a real implementation, this would initiate the booking process
    alert('Booking functionality would be implemented here with Ola\'s booking API');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6">Book GoMobility Cab</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <LocationInput
          label="Pickup Location"
          placeholder="Enter pickup location"
          value={pickup}
          onChange={setPickup}
        />
        <LocationInput
          label="Dropoff Location"
          placeholder="Enter dropoff location"
          value={dropoff}
          onChange={setDropoff}
        />
        
        {estimates && (
          <div className="space-y-3 mt-6">
            <h3 className="font-medium">Available Cabs</h3>
            {estimates.categories.map((category) => {
              const estimate = estimates.estimates.find(
                (e) => e.categoryId === category.id
              );
              if (!estimate) return null;
              
              return (
                <CabOption
                  key={category.id}
                  category={category}
                  estimate={estimate}
                  selected={selectedCategoryId === category.id}
                  onSelect={() => setSelectedCategoryId(category.id)}
                />
              );
            })}
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {estimates ? (
          <button
            type="button"
            onClick={handleBooking}
            className="w-full flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            <Car className="mr-2 h-5 w-5" />
            Book Now
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading || !pickup || !dropoff}
            className="w-full flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                <Car className="mr-2 h-5 w-5" />
                Get Estimates
              </>
            )}
          </button>
        )}
      </form>
    </div>
  );
}