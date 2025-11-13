'use client';
import { useState } from "react";
import { mockConferences } from "@/mocks/conference";
import { ConferenceCard } from "@/components/conferences/ConferenceCard";
import { ConferenceFilters } from "@/components/conferences/SearchFilters";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState(""); // set searchquery to null string 
  const [category, setCategory] = useState("");

  const categories = Array.from(new Set(mockConferences.flatMap(c => c.category))); // used ai to figure this part out so essentially it will grab all the categories from the MockConferences array

// filter the confrences based off what was typed / selected 

  const filtered = mockConferences.filter(c => // .filter will return all the confrences that match this query
    (searchQuery === "" ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()))
    &&
    (category === "" || c.category.includes(category))
  );

  return (
    <main>
      <h2 className="text-2xl font-bold mb-4">Featured Conferences</h2>
      <ConferenceFilters
        search={searchQuery} // what the user is typing in the search bar
        setSearch={setSearchQuery} // setSearch function to update the search query
        category={category}
        setCategory={setCategory} // sets category to the selected category
        availableCategories={categories} // returns all possible categories from the MockConferences array
      />

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(conference => ( // this will display all confrences in the conferenece card array
          <ConferenceCard
            key={conference.id}
            conference={conference}
            onViewDetails={() => alert(`Details for ${conference.name}`)}
          />
        ))}
      </div>
    </main>
  );
}
