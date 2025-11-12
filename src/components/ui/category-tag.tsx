import React from 'react';

interface CategoryTagProps {
  category: string;
  variant?: 'default' | 'outline' | 'interactive';
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CategoryTag({ 
  category, 
  variant = 'default',
  selected = false,
  onClick,
  className = '' 
}: CategoryTagProps) {
  const baseStyles = 'px-3 py-1 rounded-md text-xs transition-all duration-200 border';
  
  const variantStyles = {
    default: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',
    outline: 'bg-white text-gray-700 border-gray-200 hover:border-gray-300',
    interactive: selected 
      ? 'bg-gray-900 text-white border-gray-900' 
      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300',
  };

  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {category}
    </Tag>
  );
}