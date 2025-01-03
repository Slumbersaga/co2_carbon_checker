import React from 'react';
import RideRequest from './RideRequest';

export default function Hero() {
  return (
    <div className="relative bg-black min-h-screen text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1485575301924-6891ef935dcd?auto=format&fit=crop&q=80"
          alt="City background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="w-full md:w-1/2 space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Book a GoMobility Cab
            </h1>
            <p className="text-xl">
              Quick, safe and reliable rides
            </p>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-end">
            <RideRequest />
          </div>
        </div>
      </div>
    </div>
  );
}