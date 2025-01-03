import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">About us</a></li>
              <li><a href="#" className="hover:text-gray-300">Our offerings</a></li>
              <li><a href="#" className="hover:text-gray-300">Newsroom</a></li>
              <li><a href="#" className="hover:text-gray-300">Investors</a></li>
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
              <li><a href="#" className="hover:text-gray-300">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Ride</a></li>
              <li><a href="#" className="hover:text-gray-300">Drive</a></li>
              <li><a href="#" className="hover:text-gray-300">Deliver</a></li>
              <li><a href="#" className="hover:text-gray-300">Eat</a></li>
              <li><a href="#" className="hover:text-gray-300">Business</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Global citizenship</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Safety</a></li>
              <li><a href="#" className="hover:text-gray-300">Diversity and Inclusion</a></li>
              <li><a href="#" className="hover:text-gray-300">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><Facebook /></a>
              <a href="#" className="hover:text-gray-300"><Twitter /></a>
              <a href="#" className="hover:text-gray-300"><Instagram /></a>
              <a href="#" className="hover:text-gray-300"><Youtube /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-sm hover:text-gray-300">Privacy</a>
              <a href="#" className="text-sm hover:text-gray-300">Accessibility</a>
              <a href="#" className="text-sm hover:text-gray-300">Terms</a>
            </div>
            <div className="text-sm">
              © 2024 GoMobility Technologies Inc.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}