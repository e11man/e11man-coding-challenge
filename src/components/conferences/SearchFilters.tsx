'use client';
import React from "react";

interface ConferenceFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  availableCategories: string[];
}

export function ConferenceFilters({
  search, // what the user is typing in the search bar
  setSearch, // setSearch function to update the search query
  category,
  setCategory, // sets category to the selected category
  availableCategories, // returns all possible categories from the MockConferences array
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
    </div>
  );
}
