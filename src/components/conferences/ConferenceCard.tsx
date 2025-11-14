import * as React from "react";
import { Calendar, MapPin, DollarSign, Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Conference } from "@/types/conference";

// react hook
import { useConferenceValidator } from "@/hooks/useConferenceValidator";

interface ConferenceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  conference: Conference;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const ConferenceCard = React.forwardRef<HTMLDivElement, ConferenceCardProps>(
  ({ className, conference, isFavorite, onFavorite, onViewDetails, ...props }, ref) => {
    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onFavorite(conference.id);
    };

    const handleDetailsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onViewDetails(conference.id);
    };

    const status = useConferenceValidator(conference.date);

    const categories =
      typeof conference.category === "string"
        ? JSON.parse(conference.category)
        : conference.category || [];

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group relative block overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-300 ease-in-out hover:shadow-lg",
          className
        )}
        {...props}
      >
        {status && (
          <div className="absolute left-3 top-3 z-10">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
              {status}
            </span>
          </div>
        )}
        <a href={`/conference/${conference.id}`} onClick={handleDetailsClick} aria-label={conference.name}>
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={conference.imageUrl}
              alt={conference.name}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>

          <div className="space-y-3 p-4">
            <div>
              <h3 className="font-semibold leading-tight line-clamp-2">{conference.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{conference.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-medium text-primary">
              {categories.map((cat: string) => (
                <span key={cat} className="rounded-full bg-primary/10 px-3 py-1">
                  {cat}
                </span>
              ))}
            </div>

            <div className="flex gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {formatDate(conference.date)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {conference.location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> ${conference.price}
              </span>
            </div>
          </div>
        </a>

        <div className="absolute top-3 right-3 space-y-2">
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full backdrop-blur-sm transition-all duration-300",
              "opacity-0 group-hover:opacity-100",
              isFavorite ? "bg-red-500 text-white hover:bg-red-500/90" : ""
            )}
            onClick={handleFavoriteClick}
            aria-label="Save conference"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 pt-0">
          <Button
            className="w-full transition-transform duration-300 ease-in-out group-hover:translate-y-0.5"
            onClick={(e) => {
              e.preventDefault();
              onViewDetails(conference.id);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    );
  }
);

ConferenceCard.displayName = "ConferenceCard";

export { ConferenceCard };