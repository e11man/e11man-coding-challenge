'use client';
import { useState, useEffect } from "react";
import { mockConferences } from "@/mocks/conference";
import { ConferenceCard } from "@/components/conferences/ConferenceCard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) setFavorites(JSON.parse(favs));
  }, []);

  const favConfs = mockConferences.filter(c => favorites.includes(c.id));
  const router = useRouter();
  return (
    <main>
      <h2>Your Favorite Conferences</h2>
      {favConfs.length === 0 ? (
        <div>No favorites yet!</div>
      ) : (
        favConfs.map(c => (
          <ConferenceCard
            key={c.id}
            conference={c}
            isFavorite={true}
            onFavorite={() => {
              setFavorites(favs => favs.filter(id => id !== c.id));
            }}
            onViewDetails={() => router.push(`/conference/${c.id}`)}
          />
        ))
      )}
    </main>
  );
}
