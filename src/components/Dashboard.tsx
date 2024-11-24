import React from "react";
import { AlertTriangle, CheckCircle, Eye, Shield } from "lucide-react";
import { EventCard } from "./EventCard";
import { RiskChart } from "./RiskChart";
import { collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { addDoc } from "firebase/firestore";
import { getRandomMockEvent, mockEvents } from "../data/mockData";

interface Event {
  id: string;
  type: string;
  riskLevel: string;
  timestamp: string;
  platform: string;
  description: string;
  aiExplanation: string;
}

interface DashboardProps {
  events: Event[];
  onEventClick: (id: string) => void;
}

export default function Dashboard({ events, onEventClick }: DashboardProps) {
  const highRiskCount = events.filter((e) => e.riskLevel === "high").length;
  const mediumRiskCount = events.filter((e) => e.riskLevel === "medium").length;
  const resolvedCount = events.filter((e) => e.riskLevel === "low").length;

  const handleAddMockData = async () => {
    try {
      const eventsCollection = collection(db, "events");
      // Add each mock event to Firestore
      addDoc(eventsCollection, getRandomMockEvent());

      console.log("Mock data added successfully!");
    } catch (error) {
      console.error("Error adding mock data:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Risk Overview</h2>
            <RiskChart />
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => onEventClick(event.id)}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium text-red-700">
                    High Risk Events
                  </span>
                </div>
                <span className="text-lg font-bold text-red-700">
                  {highRiskCount}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-700">
                    Medium Risk
                  </span>
                </div>
                <span className="text-lg font-bold text-yellow-700">
                  {mediumRiskCount}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700">
                    Resolved
                  </span>
                </div>
                <span className="text-lg font-bold text-green-700">
                  {resolvedCount}
                </span>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <button
                  onClick={handleAddMockData}
                  className="mb-4 mt-10 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Mock Data to Firestore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
