import React from 'react';

export type TimeRange = '7days' | '30days' | 'all';

interface TimeFilterProps {
  selectedTime: TimeRange;
  onTimeChange: (time: TimeRange) => void;
}

export function TimeFilter({ selectedTime, onTimeChange }: TimeFilterProps) {
  return (
    <select
      value={selectedTime}
      onChange={(e) => onTimeChange(e.target.value as TimeRange)}
      className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="7days">Last 7 Days</option>
      <option value="30days">Last 30 Days</option>
      <option value="all">All Time</option>
    </select>
  );
}