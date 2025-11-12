import React, { useState, useMemo } from 'react';
import { ConferenceCard } from './ConferenceCard';
import { SearchFilters, FilterOptions } from './SearchFilters';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { FadeIn } from '../ui/fade-in';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { CategoryScroller } from '../ui/category-scroller';

interface ConferenceListProps {
  onViewDetails: (id: string) => void;
}

const ITEMS_PER_PAGE = 9;

export function ConferenceList({ onViewDetails }: ConferenceListProps) {
  const { conferences } = useAppContext();
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    categories: [],
    dateFrom: '',
    dateTo: '',
    priceMin: 0,
    priceMax: 1000,
    status: [],
  });

  // Get all unique categories
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    conferences.forEach(conf => {
      conf.category.forEach(cat => categories.add(cat));
    });
    return Array.from(categories).sort();
  }, [conferences]);

  // Filter conferences
  const filteredConferences = useMemo(() => {
    return conferences.filter(conf => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          conf.name.toLowerCase().includes(searchLower) ||
          conf.description.toLowerCase().includes(searchLower) ||
          conf.location.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        const hasCategory = filters.categories.some(cat => 
          conf.category.includes(cat)
        );
        if (!hasCategory) return false;
      }

      // Status filter
      if (filters.status.length > 0) {
        if (!filters.status.includes(conf.status)) return false;
      }

      // Date range filter
      if (filters.dateFrom) {
        const confDate = new Date(conf.date);
        const fromDate = new Date(filters.dateFrom);
        if (confDate < fromDate) return false;
      }
      if (filters.dateTo) {
        const confDate = new Date(conf.date);
        const toDate = new Date(filters.dateTo);
        if (confDate > toDate) return false;
      }

      // Price range filter
      if (conf.price < filters.priceMin || conf.price > filters.priceMax) {
        return false;
      }

      return true;
    });
  }, [conferences, filters]);

  // Infinite scroll
  const { displayedItems, hasMore, loaderRef } = useInfiniteScroll(
    filteredConferences,
    ITEMS_PER_PAGE
  );

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: newCategories });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <FadeIn>
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          availableCategories={availableCategories}
        />
      </FadeIn>

      {/* Horizontal Category Scroller */}
      <FadeIn delay={100}>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <h3 className="text-sm text-gray-600 mb-3">Filter by Categories</h3>
          <CategoryScroller
            categories={availableCategories}
            selectedCategories={filters.categories}
            onToggleCategory={handleCategoryToggle}
            rows={2}
          />
        </div>
      </FadeIn>

      {/* Results Count */}
      <FadeIn delay={150}>
        <div className="text-sm text-gray-600">
          {filteredConferences.length === 0 ? (
            <p>No conferences found matching your criteria. Try adjusting your filters.</p>
          ) : (
            <p>
              Showing <span className="text-gray-900">{displayedItems.length}</span> of <span className="text-gray-900">{filteredConferences.length}</span> conferences
            </p>
          )}
        </div>
      </FadeIn>

      {/* Conference Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((conference, index) => (
          <ConferenceCard
            key={conference.id}
            conference={conference}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-8">
          <div className="flex items-center gap-3 text-gray-600">
            <Loader2 className="size-6 animate-spin" />
            <p>Loading more conferences...</p>
          </div>
        </div>
      )}

      {/* End Message */}
      {!hasMore && filteredConferences.length > 0 && (
        <FadeIn>
          <div className="text-center py-8 text-gray-500 text-sm">
            <p>All conferences loaded</p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}