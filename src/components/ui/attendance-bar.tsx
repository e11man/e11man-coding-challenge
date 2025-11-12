import React from 'react';
import { Users } from 'lucide-react';

interface AttendanceBarProps {
  current: number;
  max: number;
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
}

export function AttendanceBar({ 
  current, 
  max, 
  showIcon = true,
  showLabel = true,
  className = '' 
}: AttendanceBarProps) {
  const percentage = (current / max) * 100;
  
  const getBarColor = () => {
    if (percentage >= 90) return 'bg-red-600';
    if (percentage >= 70) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            {showIcon && <Users className="size-3.5 text-gray-600" />}
            <span>{current} / {max} attendees</span>
          </div>
          <span>{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getBarColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}