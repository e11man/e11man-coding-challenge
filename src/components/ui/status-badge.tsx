import React from 'react';
import { Badge } from './badge';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const STATUS_STYLES: Record<string, string> = {
  'Open': 'bg-green-50 text-green-700 border-green-200',
  'Closed': 'bg-gray-50 text-gray-700 border-gray-200',
  'Sold Out': 'bg-red-50 text-red-700 border-red-200',
  'TechMeet 2024': 'bg-blue-50 text-blue-700 border-blue-200',
  'Featured': 'bg-gray-900 text-white border-gray-900',
  'Registered': 'bg-blue-600 text-white border-blue-600',
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const statusStyle = STATUS_STYLES[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  
  return (
    <Badge 
      variant="outline" 
      className={`${statusStyle} transition-all duration-200 ${className}`}
    >
      {status}
    </Badge>
  );
}