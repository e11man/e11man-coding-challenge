import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryTag } from './category-tag';
import { IconButton } from './icon-button';

interface CategoryScrollerProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  rows?: number;
  className?: string;
}

export function CategoryScroller({ 
  categories, 
  selectedCategories,
  onToggleCategory,
  rows = 2,
  className = '' 
}: CategoryScrollerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Split categories into rows
  const categoriesPerRow = Math.ceil(categories.length / rows);
  const categoryRows = Array.from({ length: rows }, (_, i) =>
    categories.slice(i * categoriesPerRow, (i + 1) * categoriesPerRow)
  );

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newScrollLeft = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 10);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* Left Arrow */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-r from-white via-white to-transparent pr-4">
          <IconButton
            icon={ChevronLeft}
            onClick={() => scroll('left')}
            size="md"
            label="Scroll left"
            className="shadow-lg"
          />
        </div>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="overflow-x-auto scrollbar-hide space-y-3 pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categoryRows.map((rowCategories, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 min-w-max">
            {rowCategories.map((category) => (
              <CategoryTag
                key={category}
                category={category}
                variant="interactive"
                selected={selectedCategories.includes(category)}
                onClick={() => onToggleCategory(category)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center bg-gradient-to-l from-white via-white to-transparent pl-4">
          <IconButton
            icon={ChevronRight}
            onClick={() => scroll('right')}
            size="md"
            label="Scroll right"
            className="shadow-lg"
          />
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
