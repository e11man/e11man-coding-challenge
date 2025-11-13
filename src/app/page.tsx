'use client';
import { useState, useEffect } from "react";
import { mockConferences } from "@/mocks/conference";
import { ConferenceCard } from "@/components/conferences/ConferenceCard";
import { ConferenceFilters } from "@/components/conferences/SearchFilters";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const f = localStorage.getItem('favorites');
    if (f) setFavorites(JSON.parse(f));
  }, []);
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const categories = Array.from(new Set(mockConferences.flatMap(c => c.category)));

  const filtered = mockConferences.filter(c =>
    (searchQuery === "" ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()))
    &&
    (category === "" || c.category.includes(category))
  );

  const router = useRouter();
  const toggleFavorite = (id: string) => {
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  return (
    <main>
      <h2>Featured Conferences</h2>
      <ConferenceFilters
        search={searchQuery}
        setSearch={setSearchQuery}
        category={category}
        setCategory={setCategory}
        availableCategories={categories}
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