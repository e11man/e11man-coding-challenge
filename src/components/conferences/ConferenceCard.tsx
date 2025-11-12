import React from 'react';
import { Calendar, MapPin, DollarSign, Heart, ExternalLink } from 'lucide-react';
import { Conference } from '../../types/conference';
import { Button } from '../ui/button';
import { useConferenceValidator } from '../../hooks/useConferenceValidator';
import { useAppContext } from '../../context/AppContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { StatusBadge } from '../ui/status-badge';
import { CategoryTag } from '../ui/category-tag';
import { InfoItem } from '../ui/info-item';
import { AttendanceBar } from '../ui/attendance-bar';
import { IconButton } from '../ui/icon-button';
import { FadeIn } from '../ui/fade-in';

interface ConferenceCardProps {
  conference: Conference;
  onViewDetails: (id: string) => void;
}

export function ConferenceCard({ conference, onViewDetails }: ConferenceCardProps) {
  const { toggleFavorite, isFavorite, isRegistered } = useAppContext();
  const validation = useConferenceValidator(conference);
  const favorite = isFavorite(conference.id);
  const registered = isRegistered(conference.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <FadeIn>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={conference.imageUrl}
            alt={conference.name}
            className="w-full h-full object-cover"
          />
          
          {/* Featured Badge */}
          {conference.isFeatured && (
            <div className="absolute top-3 left-3">
              <StatusBadge status="Featured" />
            </div>
          )}

          {/* Registered Badge */}
          {registered && (
            <div className="absolute top-3 right-12">
              <StatusBadge status="Registered" />
            </div>
          )}

          {/* Favorite Button */}
          <div className="absolute top-3 right-3">
            <IconButton
              icon={Heart}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(conference.id);
              }}
              active={favorite}
              label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title and Status */}
          <div className="space-y-3">
            <h3 className="text-gray-900 line-clamp-2 min-h-[3rem]">
              {conference.name}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={validation.status} />
              {validation.isTechMeet2024 && (
                <StatusBadge status="TechMeet 2024" />
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {conference.category.slice(0, 3).map(cat => (
              <CategoryTag key={cat} category={cat} variant="default" />
            ))}
          </div>

          {/* Info */}
          <div className="space-y-2">
            <InfoItem icon={Calendar} value={formatDate(conference.date)} />
            <InfoItem icon={MapPin} value={conference.location} />
            <InfoItem icon={DollarSign} value={`$${conference.price}`} />
          </div>

          {/* Attendance */}
          <AttendanceBar 
            current={conference.currentAttendees} 
            max={conference.maxAttendees}
          />

          {/* View Details Button */}
          <Button
            onClick={() => onViewDetails(conference.id)}
            className="w-full gap-2"
            variant={conference.status === 'Sold Out' ? 'outline' : 'default'}
          >
            View Details
            <ExternalLink className="size-4" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
}