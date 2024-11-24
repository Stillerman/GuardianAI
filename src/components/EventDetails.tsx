import React from 'react';
import { X, AlertTriangle, Shield, Clock, Monitor } from 'lucide-react';

interface EventDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    type: string;
    riskLevel: string;
    timestamp: string;
    platform: string;
    description: string;
    aiExplanation: string;
  } | null;
}

export default function EventDetails({ isOpen, onClose, event }: EventDetailsProps) {
  if (!event) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-64 rounded-xl flex items-center justify-center">
              <Shield className="h-16 w-16 text-gray-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-600 mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Risk Type</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{event.type}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-600 mb-1">
                  <Monitor className="h-4 w-4" />
                  <span className="text-sm font-medium">Platform</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{event.platform}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
              <p className="text-gray-700">{event.description}</p>
            </div>

            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Mark as Safe
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Take Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}