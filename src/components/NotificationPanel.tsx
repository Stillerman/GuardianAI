import React from 'react';
import { X, Bell, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function NotificationPanel({ 
  isOpen, 
  onClose,
  notifications 
}: { 
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}) {
  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <CheckCircle className="h-4 w-4 text-gray-400 hover:text-indigo-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}