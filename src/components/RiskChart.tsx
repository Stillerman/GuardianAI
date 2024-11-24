import React from 'react';

interface RiskChartProps {
  alerts: Array<{
    type: string;
    riskLevel: string;
  }>;
}

export function RiskChart({ alerts }: RiskChartProps) {
  // Count occurrences of each risk type
  const riskTypeCounts = alerts
    .filter(alert => alert.riskLevel.toLowerCase() !== 'none')
    .reduce((acc, alert) => {
      const type = alert.type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Convert to array and sort by count
  const categories = Object.entries(riskTypeCounts).map(([name, count]) => ({
    name,
    count,
    color: getRiskTypeColor(name)
  })).sort((a, b) => b.count - a.count);

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

// Helper function to assign colors to risk types
function getRiskTypeColor(type: string): string {
  const colorMap: Record<string, string> = {
    'Explicit Content': 'bg-red-500',
    'Violence': 'bg-orange-500',
    'Substance Abuse': 'bg-yellow-500',
    'Hate Speech': 'bg-purple-500',
    'Grooming': 'bg-pink-500',
    'Self Harm': 'bg-indigo-500',
    'Cyberbullying': 'bg-blue-500',
    'Dangerous Activities': 'bg-green-500',
    'Psychological Distress': 'bg-teal-500',
    'Misinformation': 'bg-cyan-500'
  };

  return colorMap[type] || 'bg-gray-500';
}