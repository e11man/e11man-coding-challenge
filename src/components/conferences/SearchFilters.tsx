'use client';
import React from "react";

interface ConferenceFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  availableCategories: string[];
  date: string;
  setDate: (value: string) => void;
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
}

export function ConferenceFilters({
  search, // what the user is typing in the search bar
  setSearch, // setSearch function to update the search query
  category,
  setCategory, // sets category to the selected category
  availableCategories, // returns all possible categories from the MockConferences array
  date,
  setDate,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: ConferenceFiltersProps) {
  return ( // this will display the search filters
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search conferences..."
        className="border rounded px-3 py-2 w-full md:w-2/5"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

    
      <select // this will display all categories in the select dropdown
        className="border rounded px-3 py-2 w-full md:w-1/5"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {availableCategories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      
      <input // date filter 
        type="date"
        className="border rounded px-3 py-2 w-full md:w-1/5"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

   
      <input
        type="number"
        placeholder="Min Price"
        className="border rounded px-3 py-2 w-full md:w-1/5"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="border rounded px-3 py-2 w-full md:w-1/5"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
      />
    </div>
  );
}
