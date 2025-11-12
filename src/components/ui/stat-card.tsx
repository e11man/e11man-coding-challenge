import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: 'blue' | 'red' | 'green' | 'purple' | 'yellow';
  className?: string;
}

const colorStyles = {
  blue: 'text-blue-600 bg-blue-50',
  red: 'text-red-500 bg-red-50',
  green: 'text-green-600 bg-green-50',
  purple: 'text-purple-600 bg-purple-50',
  yellow: 'text-yellow-600 bg-yellow-50',
};

export function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  color = 'blue',
  className = '' 
}: StatCardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className={`inline-flex p-3 rounded-lg mb-4 ${colorStyles[color]}`}>
        <Icon className="size-6" />
      </div>
      <div className="text-3xl text-gray-900 mb-1">{value}</div>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );
}
