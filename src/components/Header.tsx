import React from 'react';
import { Bell, Settings, Shield, User } from 'lucide-react';

export default function Header({ onNotificationClick }: { onNotificationClick: () => void }) {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Guardian AI</h1>
            <p className="text-xs text-gray-500">Shielding Young Minds, One Click at a Time</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={onNotificationClick}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <Bell className="h-5 w-5" />
          </button>
          
          <div className="relative group">
            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
          
          <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-full">
            <User className="h-8 w-8 text-gray-600 bg-gray-100 rounded-full p-1" />
          </button>
        </div>
      </div>
    </header>
  );
}