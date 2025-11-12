import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: 'default' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  label?: string;
  className?: string;
}

export function IconButton({
  icon: Icon,
  onClick,
  variant = 'default',
  size = 'md',
  active = false,
  label,
  className = '',
}: IconButtonProps) {
  const sizeStyles = {
    sm: 'p-1.5 size-8',
    md: 'p-2 size-9',
    lg: 'p-2.5 size-10',
  };

  const iconSizes = {
    sm: 'size-4',
    md: 'size-4',
    lg: 'size-5',
  };

  const variantStyles = {
    default: active
      ? 'bg-gray-900 text-white hover:bg-gray-800'
      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200',
    ghost: active
      ? 'bg-gray-100 text-gray-900'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
    danger: 'text-red-600 hover:text-red-700 hover:bg-red-50',
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeStyles[size]} rounded-lg transition-all duration-200 ${variantStyles[variant]} ${className}`}
      aria-label={label}
      title={label}
    >
      <Icon className={iconSizes[size]} />
    </button>
  );
}