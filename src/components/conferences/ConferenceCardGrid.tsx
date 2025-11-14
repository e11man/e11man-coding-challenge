import * as React from "react";

import { cn } from "@/lib/utils";
import { Conference } from "@/types/conference";

import { ConferenceCard } from "@/components/conferences/ConferenceCard";

interface ConferenceCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  conferences: Conference[];
  favorites: string[];
  onFavorite: (id: string) => void;
  onViewDetails: (id: string) => void;
  emptyState?: React.ReactNode;
}

const ConferenceCardGrid = React.forwardRef<HTMLDivElement, ConferenceCardGridProps>(
  (
    { className, conferences, favorites, onFavorite, onViewDetails, emptyState, ...props },
    ref
  ) => {
    if (!conferences.length && emptyState) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center py-10 text-muted-foreground", className)}
          {...props}
        >
          {emptyState}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", className)}
        {...props}
      >
        {conferences.map((conference) => (
          <ConferenceCard
            key={conference.id}
            conference={conference}
            isFavorite={favorites.includes(conference.id)}
            onFavorite={onFavorite}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    );
  }
);

ConferenceCardGrid.displayName = "ConferenceCardGrid";

export { ConferenceCardGrid };

