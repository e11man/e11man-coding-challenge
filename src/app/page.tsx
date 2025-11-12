'use client'; // rendered in browser


import { mockConferences } from "@/mocks/conference";
import { ConferenceCard } from "@/components/conferences/ConferenceCard";

export default function HomePage() {
  return (
    <main>
      <h2 className="text-2xl font-bold mb-4">Featured Conferences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockConferences.map(conference => (
          <ConferenceCard 
            key={conference.id}
            conference={conference}
            onViewDetails={() => {}}
          />
        ))}
      </div>
    </main>
  );
}
