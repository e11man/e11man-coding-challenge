import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Heart,
  Share2,
  UserCircle2,
  CheckCircle
} from 'lucide-react';
import { Conference } from '../../types/conference';
import { Button } from '../ui/button';
import { useConferenceValidator } from '../../hooks/useConferenceValidator';
import { useAppContext } from '../../context/AppContext';
import { RegistrationForm } from './RegistrationForm';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { StatusBadge } from '../ui/status-badge';
import { CategoryTag } from '../ui/category-tag';
import { InfoItem } from '../ui/info-item';
import { AttendanceBar } from '../ui/attendance-bar';
import { IconButton } from '../ui/icon-button';
import { FadeIn } from '../ui/fade-in';
import { MapEmbed } from '../ui/map-embed';
import { EmailSignup } from '../ui/email-signup';

interface ConferenceDetailProps {
  conferenceId: string;
  onBack: () => void;
}

export function ConferenceDetail({ conferenceId, onBack }: ConferenceDetailProps) {
  const { conferences, toggleFavorite, isFavorite, isRegistered } = useAppContext();
  const conference = conferences.find(c => c.id === conferenceId);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  if (!conference) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Conference not found</p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const validation = useConferenceValidator(conference);
  const favorite = isFavorite(conference.id);
  const registered = isRegistered(conference.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleShare = () => {
    const url = `${window.location.origin}?conference=${conference.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: conference.name,
        text: conference.description,
        url: url,
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  if (showRegistrationForm) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <RegistrationForm
          conference={conference}
          onSuccess={() => {
            setShowRegistrationForm(false);
            toast.success('Successfully registered for the conference!');
          }}
          onCancel={() => setShowRegistrationForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <FadeIn>
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 gap-2 hover:bg-white hover:shadow-md transition-all"
        >
          <ArrowLeft className="size-4" />
          Back to Conferences
        </Button>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <FadeIn>
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl">
              <ImageWithFallback
                src={conference.imageUrl}
                alt={conference.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {conference.isFeatured && (
                <div className="absolute top-4 left-4">
                  <StatusBadge status="Featured" />
                </div>
              )}
            </div>
          </FadeIn>

          {/* Title and Status */}
          <FadeIn delay={100}>
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl text-gray-900 mb-3">{conference.name}</h1>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={validation.status} />
                  {validation.isTechMeet2024 && (
                    <StatusBadge status="TechMeet 2024" />
                  )}
                  {registered && (
                    <StatusBadge status="Registered" />
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {conference.category.map(cat => (
                  <CategoryTag key={cat} category={cat} variant="default" />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={200}>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h2 className="text-2xl text-gray-900 mb-3">About This Conference 📋</h2>
              <p className="text-gray-600 leading-relaxed">{conference.description}</p>
            </div>
          </FadeIn>

          {/* Speakers */}
          {conference.speakers.length > 0 && (
            <FadeIn delay={300}>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                <h2 className="text-2xl text-gray-900 mb-4">Featured Speakers 🎤</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conference.speakers.map((speaker, index) => (
                    <FadeIn key={speaker.id} delay={350 + index * 50}>
                      <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-4 space-y-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-3">
                          {speaker.avatarUrl ? (
                            <ImageWithFallback
                              src={speaker.avatarUrl}
                              alt={speaker.name}
                              className="size-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="size-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md">
                              <UserCircle2 className="size-8 text-white" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-gray-900">{speaker.name}</h3>
                            <p className="text-sm text-gray-600">{speaker.title}</p>
                            <p className="text-sm text-gray-500">{speaker.company}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{speaker.bio}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Map Integration - Add after speakers */}
          <FadeIn delay={400}>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h2 className="text-2xl text-gray-900 mb-4">📍 Event Location</h2>
              <MapEmbed location={conference.location} />
            </div>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sticky Card */}
          <FadeIn delay={150}>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 sticky top-24 shadow-xl">
              {/* Price */}
              <div className="text-center pb-4 border-b border-gray-200">
                <div className="text-4xl text-gray-900 mb-1">${conference.price}</div>
                <p className="text-gray-600 text-sm">per ticket</p>
              </div>

              {/* Info */}
              <div className="space-y-4">
                <InfoItem 
                  icon={Calendar} 
                  label="Date" 
                  value={formatDate(conference.date)} 
                />
                <InfoItem 
                  icon={MapPin} 
                  label="Location" 
                  value={conference.location} 
                />
                <InfoItem 
                  icon={Users} 
                  label="Attendance" 
                  value={`${conference.currentAttendees} / ${conference.maxAttendees} registered`} 
                />
              </div>

              {/* Attendance Bar */}
              <AttendanceBar 
                current={conference.currentAttendees} 
                max={conference.maxAttendees}
                showIcon={false}
              />

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                {registered ? (
                  <Button
                    className="w-full gap-2 bg-green-600 hover:bg-green-700"
                    disabled
                  >
                    <CheckCircle className="size-4" />
                    Already Registered
                  </Button>
                ) : (
                  <Button
                    className="w-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    onClick={() => setShowRegistrationForm(true)}
                    disabled={conference.status === 'Sold Out' || conference.status === 'Closed'}
                  >
                    {conference.status === 'Sold Out' ? 'Sold Out' : 
                     conference.status === 'Closed' ? 'Registration Closed' : 
                     'Register Now'}
                  </Button>
                )}
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toggleFavorite(conference.id);
                      toast.success(favorite ? 'Removed from favorites' : 'Added to favorites');
                    }}
                    className="gap-2 hover:bg-red-50 hover:border-red-300 transition-all"
                  >
                    <Heart className={`size-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
                    {favorite ? 'Saved' : 'Save'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="gap-2 hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    <Share2 className="size-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Email Signup - Add after sidebar card */}
          <FadeIn delay={200}>
            <EmailSignup 
              conferenceId={conference.id}
              conferenceName={conference.name}
              variant="card"
            />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}