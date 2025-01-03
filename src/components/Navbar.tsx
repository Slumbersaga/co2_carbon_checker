import React from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-white" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0" >
              <span className="text-2xl font-bold">GoMobility</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Company</a>
                <a href="#" className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Safety</a>
                <a href="#" className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Help</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="flex items-center px-3 py-2 text-sm font-medium hover:text-gray-300">
                <Globe className="h-5 w-5 mr-1" />
                EN
              </button>
              <button className="ml-4 px-4 py-2 text-sm font-medium hover:bg-gray-700 rounded">
                Products
                <ChevronDown className="inline-block ml-1 h-4 w-4" />
              </button>
              <button className="ml-4 px-4 py-2 text-sm font-medium bg-white text-black rounded hover:bg-gray-100">
                Log in
              </button>
              <button className="ml-4 px-4 py-2 text-sm font-medium bg-white text-black rounded hover:bg-gray-100">
                Sign up
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300">Company</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300">Safety</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:text-gray-300">Help</a>
            <button className="w-full text-left px-3 py-2 text-base font-medium hover:text-gray-300">
              Products
            </button>
            <button className="w-full mt-4 px-4 py-2 text-sm font-medium bg-white text-black rounded hover:bg-gray-100">
              Log in
            </button>
            <button className="w-full mt-2 px-4 py-2 text-sm font-medium bg-white text-black rounded hover:bg-gray-100">
              Sign up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}