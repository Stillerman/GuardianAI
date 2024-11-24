import React from "react";
import { AlertTriangle, CheckCircle, Eye, Shield } from "lucide-react";
import { EventCard } from "./EventCard";
import { RiskChart } from "./RiskChart";
import { RiskFilter } from './RiskFilter';
import { TimeFilter, type TimeRange } from './TimeFilter';
import { useState } from "react";


interface Alert {
  id: string;
  type: string[]; // Changed to array
  riskLevel: string;
  timestamp: string;
  platform: string;
  description: string;
  aiExplanation: string;
}

interface DashboardProps {
  alerts: Alert[];
  onEventClick: (id: string) => void;
}


export default function Dashboard({ alerts, onEventClick }: DashboardProps) {
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel>('all');
  const [selectedTime, setSelectedTime] = useState<TimeRange>('all');

  // Helper function to filter alerts by time
  const filterByTime = (alert: Alert) => {
    if (selectedTime === 'all') return true;
    
    const now = new Date();
    const alertDate = new Date(alert.timestamp);
    const diffDays = Math.floor((now.getTime() - alertDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (selectedTime === '7days') return diffDays <= 7;
    if (selectedTime === '30days') return diffDays <= 30;
    return true;
  };

  // Filter alerts by both risk and time
  const filteredAlerts = alerts
    .filter(filterByTime)
    .filter(alert => {
      if (selectedRisk === 'all') return true;
      if (selectedRisk === 'low') {
        return alert.riskLevel.toLowerCase() === 'low' || alert.riskLevel.toLowerCase() === 'none';
      }
      return alert.riskLevel.toLowerCase() === selectedRisk;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Calculate stats based on filtered alerts
  const timeFilteredAlerts = alerts.filter(filterByTime);
  const highRiskCount = timeFilteredAlerts.filter(
    (e) => e.riskLevel === "high" || e.riskLevel === "critical"
  ).length;
  const mediumRiskCount = timeFilteredAlerts.filter(
    (e) => e.riskLevel === "medium"
  ).length;
  const lowRiskCount = timeFilteredAlerts.filter(
    (e) => e.riskLevel.toLowerCase() === "low" || e.riskLevel.toLowerCase() === "none"
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <TimeFilter 
          selectedTime={selectedTime} 
          onTimeChange={setSelectedTime} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Risk Overview</h2>
            <RiskChart alerts={timeFilteredAlerts} />
          </div>

          <div className="mb-4">
            <RiskFilter 
              selectedRisk={selectedRisk} 
              onRiskChange={setSelectedRisk} 
            />
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <EventCard
                key={alert.id}
                event={alert}
                onClick={() => onEventClick(alert.id)}
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
                    Low Risk
                  </span>
                </div>
                <span className="text-lg font-bold text-green-700">
                  {lowRiskCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
