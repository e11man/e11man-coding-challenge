'use client';

import { Calendar, MapPin, DollarSign } from "lucide-react";
import { Conference } from "@/types/conference";

interface ConferenceCardProps {
  conference: Conference;
  onViewDetails: (id: string) => void;
}

export function ConferenceCard({ conference, onViewDetails }: ConferenceCardProps) {
  // Format date utility
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg">
      <img
        src={conference.imageUrl}
        alt={conference.name}
        className="w-full h-48 object-cover bg-gray-100"
      />
      <div className="p-5 space-y-2">
        <h3 className="font-semibold text-lg text-gray-900">{conference.name}</h3>
        <div className="flex flex-wrap gap-2 text-xs text-blue-700 font-medium">
          {conference.category.map((cat) => (
            <span key={cat}>{cat}</span>
          ))}
        </div>
        <div className="text-gray-600 text-xs">{conference.description.slice(0, 64)}...</div>
        <div className="flex gap-3 py-2 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {formatDate(conference.date)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {conference.location}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign size={14} /> ${conference.price}
          </span>
        </div>
        <button
          onClick={() => onViewDetails(conference.id)}
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
