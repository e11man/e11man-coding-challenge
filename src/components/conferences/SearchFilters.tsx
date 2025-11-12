import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Slider } from '../ui/slider';
import { CategoryTag } from '../ui/category-tag';

export interface FilterOptions {
  search: string;
  categories: string[];
  dateFrom: string;
  dateTo: string;
  priceMin: number;
  priceMax: number;
  status: string[];
}

interface SearchFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableCategories: string[];
}

export function SearchFilters({ filters, onFiltersChange, availableCategories }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleStatusToggle = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFiltersChange({ ...filters, status: newStatus });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceMin: value[0], priceMax: value[1] });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      categories: [],
      dateFrom: '',
      dateTo: '',
      priceMin: 0,
      priceMax: 1000,
      status: [],
    });
  };

  const activeFilterCount = 
    filters.categories.length + 
    filters.status.length + 
    (filters.dateFrom ? 1 : 0) + 
    (filters.dateTo ? 1 : 0) +
    ((filters.priceMin > 0 || filters.priceMax < 1000) ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 transition-colors" />
          <Input
            type="text"
            placeholder="Search conferences..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10 h-12 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 relative h-12 px-6 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all">
              <SlidersHorizontal className="size-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full size-6 flex items-center justify-center shadow-lg animate-pulse">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filter Conferences</SheetTitle>
              <SheetDescription>
                Refine your search to find the perfect conference
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {/* Categories */}
              <div>
                <Label className="mb-3 block">Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map(category => (
                    <CategoryTag
                      key={category}
                      category={category}
                      variant="interactive"
                      selected={filters.categories.includes(category)}
                      onClick={() => handleCategoryToggle(category)}
                    />
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <Label className="mb-3 block">Status</Label>
                <div className="flex flex-wrap gap-2">
                  {['Open', 'Closed', 'Sold Out'].map(status => (
                    <CategoryTag
                      key={status}
                      category={status}
                      variant="interactive"
                      selected={filters.status.includes(status)}
                      onClick={() => handleStatusToggle(status)}
                    />
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <Label className="mb-3 block">Date Range</Label>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600 mb-1 block">From</Label>
                    <Input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-1 block">To</Label>
                    <Input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <Label className="mb-3 block">
                  Price Range: <span className="text-blue-600">${filters.priceMin} - ${filters.priceMax}</span>
                </Label>
                <Slider
                  min={0}
                  max={1000}
                  step={50}
                  value={[filters.priceMin, filters.priceMax]}
                  onValueChange={handlePriceChange}
                  className="mt-2"
                />
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all"
                >
                  <X className="size-4" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}