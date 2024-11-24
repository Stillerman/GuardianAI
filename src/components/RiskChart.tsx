import React from 'react';

export function RiskChart() {
  const categories = [
    { name: 'Social Media', count: 8, color: 'bg-blue-500' },
    { name: 'Gaming', count: 5, color: 'bg-purple-500' },
    { name: 'Search Engine', count: 3, color: 'bg-green-500' },
    { name: 'Text Messages', count: 6, color: 'bg-yellow-500' },
  ];

  const maxCount = Math.max(...categories.map(c => c.count));

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{category.name}</span>
            <span className="text-gray-900 font-medium">{category.count}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${category.color} transition-all duration-500`}
              style={{ width: `${(category.count / maxCount) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}