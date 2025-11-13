'use client';

import { Calendar, MapPin, DollarSign, Heart } from "lucide-react";
import { Conference } from "@/types/conference";

interface ConferenceCardProps {
  conference: Conference;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function ConferenceCard({ conference, isFavorite, onFavorite, onViewDetails }: ConferenceCardProps) {
  // Format date utility
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Always treat category as array for rendering
  const categories = typeof conference.category === "string"
    ? JSON.parse(conference.category)
    : conference.category || [];

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
          {categories.map((cat: string) => (
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
        <div className="flex justify-center">
          <button
            onClick={() => onFavorite(conference.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            <Heart size={20} />
          </button>
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
