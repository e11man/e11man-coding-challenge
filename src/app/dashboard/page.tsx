'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Remove this line:
// import { mockConferences } from "@/mocks/conference";

import { Navigation } from "@/components/Navigation";
import { ConferenceCardGrid } from "@/components/conferences/ConferenceCardGrid";

export default function DashboardPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [conferences, setConferences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) setFavorites(JSON.parse(favs));
  }, []);

  useEffect(() => {
    async function fetchConferences() {
      try {
        const res = await fetch("/api/conferences");
        const data = await res.json();
        setConferences(data);
      } catch (error) {
        console.error("Error fetching conferences:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchConferences();
  }, []);

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  const favConfs = conferences.filter((c) => favorites.includes(c.id));
  const router = useRouter();

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="max-w-6xl px-6 py-12 mx-auto">
          <p>Loading...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="max-w-6xl px-6 py-12 mx-auto space-y-8">
        <header className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Your Favorite Conferences</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Easily access the events you've saved. Remove any that no longer interest you.
          </p>
        </header>
        <ConferenceCardGrid
          conferences={favConfs}
          favorites={favorites}
          onFavorite={handleFavoriteToggle}
          onViewDetails={(id) => router.push(`/conference/${id}`)}
          emptyState={<p className="text-base text-slate-600 dark:text-slate-300">No favorites yet! Start saving conferences to see them here.</p>}
        />
      </main>
    </>
  );
}