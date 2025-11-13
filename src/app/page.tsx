'use client';
import { useState, useEffect } from "react";
// no longer need mock data since we load from supabase
//import { mockConferences } from "@/mocks/conference";
import { ConferenceCard } from "@/components/conferences/ConferenceCard";
import { ConferenceFilters } from "@/components/conferences/SearchFilters";
import { useRouter } from "next/navigation";

// imports for connecting with supabase
// import { Conference } from "@/types/conference";
// import { prisma } from "@/utils/prisma";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState(""); // set searchquery to null string 
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [conferences, setConferences] = useState<any[]>([]); // Since we fetch from API, we use any[] for now
  const [loading, setLoading] = useState(true);

  // Use API route instead of Prisma directly!
  useEffect(() => {
    async function fetchConferences() {
      try {
        // Fetch conferences from our server API (not Prisma in client)
        const res = await fetch("/api/conferences");
        const confs = await res.json();
        setConferences(confs);
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    }
    fetchConferences();
  }, []);

  useEffect(() => {
    const f = localStorage.getItem('favorites');
    if (f) setFavorites(JSON.parse(f));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const categories = Array.from(new Set(conferences.flatMap(c => c.category || []))); // used ai to figure this part out so essentially it will grab all the categories from the conferences array

  // filter the confrences based off what was typed / selected 
  const filtered = conferences.filter(c =>
    (searchQuery === "" ||
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    &&
    (category === "" || (c.category || []).includes(category))
  );

  const router = useRouter();

  // allow users to select a favorite 
  const toggleFavorite = (id: string) => {
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  if (loading) return <main><p>Loading...</p></main>;

  return (
    <main>
      <h2>Featured Conferences</h2>
      <ConferenceFilters
        search={searchQuery} // what the user is typing in the search bar
        setSearch={setSearchQuery} // setSearch function to update the search query
        category={category}
        setCategory={setCategory} // sets category to the selected category
        availableCategories={categories} // returns all possible categories from the conferences array
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(conference => (
          <ConferenceCard
            key={conference.id}
            conference={conference}
            isFavorite={favorites.includes(conference.id)}
            onFavorite={() => toggleFavorite(conference.id)}
            onViewDetails={() => router.push(`/conference/${conference.id}`)}   
          />
        ))}
      </div>
    </main>
  );
}
