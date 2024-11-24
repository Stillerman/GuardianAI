import React from 'react';
import type { RiskLevel } from './EventCard';

interface RiskFilterProps {
  selectedRisk: RiskLevel;
  onRiskChange: (risk: RiskLevel) => void;
}

export function RiskFilter({ selectedRisk, onRiskChange }: RiskFilterProps) {
  return (
    <div className="flex space-x-2 mb-4">
      {(['all', 'low', 'medium', 'high'] as RiskLevel[]).map((risk) => (
        <button
          key={risk}
          onClick={() => onRiskChange(risk)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${selectedRisk === risk 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {risk.charAt(0).toUpperCase() + risk.slice(1)}
        </button>
      ))}
    </div>
  );
}