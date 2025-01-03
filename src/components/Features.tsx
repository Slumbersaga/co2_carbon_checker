import React from 'react';
import { Shield, Clock, MapPin } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safety first",
      description: "Your safety is important to us. That's why we have multiple safety features in place for riders and drivers."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Always on time",
      description: "Need to be somewhere? Count on Uber to pick you up in minutes, any time of day."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Go anywhere",
      description: "Tap a button, get a ride. Available worldwide in 10,000+ cities."
    }
  ];


  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why ride with GoMobility</h2>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-black text-white mx-auto">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}