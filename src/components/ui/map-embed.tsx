import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from './button';

interface MapEmbedProps {
  location: string;
  className?: string;
}

export function MapEmbed({ location, className = '' }: MapEmbedProps) {
  // Encode location for URLs
  const encodedLocation = encodeURIComponent(location);
  
  // Google Maps embed URL
  const googleMapsEmbed = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedLocation}`;
  
  // Direct links
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  const appleMapsLink = `https://maps.apple.com/?q=${encodedLocation}`;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Map Preview - Using static image placeholder since we don't have real API key */}
      <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 border border-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-3">
            <MapPin className="size-12 text-blue-600 mx-auto" />
            <div>
              <p className="text-gray-900 mb-1">{location}</p>
              <p className="text-sm text-gray-600">Click below to view in maps</p>
            </div>
          </div>
        </div>
        {/* Uncomment when you have a Google Maps API key */}
        {/* <iframe
          className="w-full h-full"
          src={googleMapsEmbed}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        /> */}
      </div>

      {/* Map Links */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => window.open(googleMapsLink, '_blank')}
        >
          <MapPin className="size-4" />
          Google Maps
          <ExternalLink className="size-3" />
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => window.open(appleMapsLink, '_blank')}
        >
          <MapPin className="size-4" />
          Apple Maps
          <ExternalLink className="size-3" />
        </Button>
      </div>
    </div>
  );
}
