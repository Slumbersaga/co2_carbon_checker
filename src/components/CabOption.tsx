import React from 'react';
import { Car, Truck } from 'lucide-react';


const getVehicleIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'mini':
      return Car;
    case 'sedan':
      return Car;
    case 'suv':
      return Truck; // Changed from Suv to Truck since Suv is not available
    default:
      return Car;
  }
};

export default function CabOption({ 
  category, 
  estimate, 
  selected, 
  onSelect 
}: CabOptionProps) {
  const Icon = getVehicleIcon(category.id);

  return (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        selected ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className="h-8 w-8" />
          <div>
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm text-gray-500">
              {Math.round(estimate.estimatedTime / 60)} mins away
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold">₹{Math.round(estimate.estimatedPrice)}</p>
          {estimate.surgeMultiplier > 1 && (
            <p className="text-sm text-red-500">
              {estimate.surgeMultiplier}x surge
            </p>
          )}
        </div>
      </div>
    </div>
  );
}