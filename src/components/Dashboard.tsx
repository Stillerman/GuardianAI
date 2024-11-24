import React from "react";
import { AlertTriangle, CheckCircle, Eye, Shield } from "lucide-react";
import { EventCard } from "./EventCard";
import { RiskChart } from "./RiskChart";

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
  const highRiskCount = alerts.filter(
    (e) => e.riskLevel === "high" || e.riskLevel === "critical"
  ).length;
  const mediumRiskCount = alerts.filter((e) => e.riskLevel === "medium").length;
  const lowRiskCount = alerts.filter(
    (e) => e.riskLevel === "low" || e.riskLevel === "none"
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Risk Overview</h2>
            <RiskChart />
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <EventCard
                key={alert.id}
                event={{
                  ...alert,
                  type: Array.isArray(alert.type) ? alert.type[0] : alert.type, // Use first type if array
                }}
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
