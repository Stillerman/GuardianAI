import React from "react";
import { AlertTriangle, Eye } from "lucide-react";
import moment from "moment";

interface Event {
  id: string;
  type: string | string[];
  riskLevel: string;
  timestamp: string;
  platform: string;
  description: string;
}

const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case "critical":
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
    case "none":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function EventCard({
  event,
  onClick,
}: {
  event: Event;
  onClick: () => void;
}) {
  const displayType = Array.isArray(event.type) ? event.type[0] : event.type;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {displayType}
              </h3>
              <p className="text-sm text-gray-500">{event.platform}</p>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(
              event.riskLevel
            )}`}
          >
            {event.riskLevel.charAt(0).toUpperCase() + event.riskLevel.slice(1)}{" "}
            Risk
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {moment(event.timestamp).fromNow()}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={onClick}
              className="px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors flex items-center space-x-1"
            >
              <Eye className="h-4 w-4" />
              <span>View Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
