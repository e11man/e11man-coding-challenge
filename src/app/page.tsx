'use client';
import { useState, useEffect } from "react";
// no longer need mock data since we load from supabase
//import { mockConferences } from "@/mocks/conference";
import { ConferenceFilters } from "@/components/conferences/SearchFilters";
import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/home/HeroSection";
import { ConferenceCardGrid } from "@/components/conferences/ConferenceCardGrid";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState(""); // set searchquery to null string
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [conferences, setConferences] = useState<any[]>([]); // Since we fetch from API, we use any[] for now
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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

  const normalizedDate = date ? date.substring(0, 10) : "";

  const categories = Array.from(new Set(conferences.flatMap(c => c.category || []))); // used ai to figure this part out so essentially it will grab all the categories from the conferences array

  // filter the confrences based off what was typed / selected
  const filtered = conferences.filter(c => {
    // Normalize conference date to YYYY-MM-DD so it matches what the user sees
    let conferenceDate = "";
    if (c.date) {
      const d = new Date(c.date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      conferenceDate = `${year}-${month}-${day}`;
    }
    
    return (
      (searchQuery === "" ||
        c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase()))
      &&
      (category === "" || (c.category || []).includes(category))
      &&
      (normalizedDate === "" || conferenceDate === normalizedDate)
      &&
      (minPrice === "" || c.price >= parseInt(minPrice))
      &&
      (maxPrice === "" || c.price <= parseInt(maxPrice))
    );
  });

  const router = useRouter();

  // allow users to select a favorite
  const toggleFavorite = (id: string) => {
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  if (loading) return <main><p>Loading...</p></main>;

  return (
    <main className="space-y-16">
      <HeroSection />
      <section className="max-w-6xl px-6 pb-16 mx-auto">
        <div className="mb-8 space-y-4 text-center">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Featured Conferences</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Use filters to uncover upcoming events tailored to your interests and budget.
          </p>
        </div>
        <ConferenceFilters
          search={searchQuery} // what the user is typing in the search bar
          setSearch={setSearchQuery} // setSearch function to update the search query
          category={category}
          setCategory={setCategory} // sets category to the selected category
          availableCategories={categories} // returns all possible categories from the conferences array
          date={date}
          setDate={setDate}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
        <ConferenceCardGrid
          conferences={filtered}
          favorites={favorites}
          onFavorite={toggleFavorite}
          onViewDetails={(id) => router.push(`/conference/${id}`)}
          className="mt-8"
          emptyState={<p className="text-base text-slate-600 dark:text-slate-300">No conferences found. Try adjusting your filters.</p>}
        />
      </section>
    </main>
  );
}
