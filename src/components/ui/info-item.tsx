import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoItemProps {
  icon: LucideIcon;
  label?: string;
  value: string;
  className?: string;
}

export function InfoItem({ icon: Icon, label, value, className = '' }: InfoItemProps) {
  return (
    <div className={`flex items-start gap-3 text-gray-600 transition-colors duration-200 hover:text-gray-900 ${className}`}>
      <Icon className="size-5 mt-0.5 flex-shrink-0 text-blue-600" />
      <div className="flex-1">
        {label && <p className="text-gray-900 mb-1">{label}</p>}
        <p className={label ? 'text-sm' : ''}>{value}</p>
      </div>
    </div>
  );
}
