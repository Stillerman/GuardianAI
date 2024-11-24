import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import NotificationPanel from "./components/NotificationPanel";
import EventDetails from "./components/EventDetails";
import { mockNotifications } from "./data/mockData";

interface Alert {
  id: string;
  type: string[];
  riskLevel: string;
  timestamp: string;
  platform: string;
  description: string;
  aiExplanation: string;
}

function App() {
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Alert | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Set up real-time listener for alerts collection instead of events
    const unsubscribe = onSnapshot(collection(db, "alerts"), (snapshot) => {
      const alertData: Alert[] = [];
      snapshot.forEach((doc) => {
        alertData.push({ id: doc.id, ...doc.data() } as Alert);
      });
      setAlerts(alertData);
    });

    return () => unsubscribe();
  }, []);

  const handleEventClick = (id: string) => {
    const alert = alerts.find((e) => e.id === id);
    setSelectedEvent(alert || null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNotificationClick={() => setIsNotificationPanelOpen(true)} />

      <main>
        <Dashboard alerts={alerts} onEventClick={handleEventClick} />
      </main>

      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        notifications={mockNotifications}
      />

      <EventDetails
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
      />

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Powered by AI</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-indigo-600"
              >
                Privacy Policy
              </a>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-indigo-600"
              >
                About Us
              </a>
            </div>
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
