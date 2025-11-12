import React, { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Calendar, Heart, User, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { StatusBadge } from '../ui/status-badge';
import { StatCard } from '../ui/stat-card';
import { EmptyState } from '../ui/empty-state';
import { FadeIn } from '../ui/fade-in';

interface DashboardProps {
  onViewConference: (id: string) => void;
}

export function Dashboard({ onViewConference }: DashboardProps) {
  const { conferences, user } = useAppContext();

  const registeredConferences = useMemo(() => {
    if (!user) return [];
    return conferences.filter(conf => 
      user.registeredConferences.includes(conf.id)
    );
  }, [conferences, user]);

  const favoriteConferences = useMemo(() => {
    if (!user) return [];
    return conferences.filter(conf => 
      user.favoriteConferences.includes(conf.id)
    );
  }, [conferences, user]);

  const upcomingConferences = useMemo(() => {
    const today = new Date();
    return registeredConferences
      .filter(conf => new Date(conf.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [registeredConferences]);

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <FadeIn>
        <div className="space-y-2 border-b border-gray-200 pb-6">
          <h1 className="text-3xl text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'User'}</p>
        </div>
      </FadeIn>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FadeIn delay={100}>
          <StatCard
            icon={Calendar}
            value={registeredConferences.length}
            label="Registered Events"
            color="blue"
          />
        </FadeIn>
        <FadeIn delay={200}>
          <StatCard
            icon={Heart}
            value={favoriteConferences.length}
            label="Favorites"
            color="red"
          />
        </FadeIn>
        <FadeIn delay={300}>
          <StatCard
            icon={Clock}
            value={upcomingConferences.length}
            label="Upcoming Events"
            color="green"
          />
        </FadeIn>
        <FadeIn delay={400}>
          <StatCard
            icon={TrendingUp}
            value={`$${registeredConferences.reduce((sum, conf) => sum + conf.price, 0)}`}
            label="Total Invested"
            color="purple"
          />
        </FadeIn>
      </div>

      {/* Upcoming Events with Countdown */}
      {upcomingConferences.length > 0 && (
        <FadeIn>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-gray-900" />
              <h2 className="text-xl text-gray-900">Upcoming Events</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {upcomingConferences.map((conference, index) => {
                const daysUntil = getDaysUntil(conference.date);
                return (
                  <FadeIn key={conference.id} delay={index * 50}>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex gap-4 p-4">
                        <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                          <ImageWithFallback
                            src={conference.imageUrl}
                            alt={conference.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="text-gray-900 mb-1 line-clamp-2">{conference.name}</h3>
                            <p className="text-sm text-gray-600">{formatDate(conference.date)}</p>
                            <p className="text-sm text-gray-500">{conference.location}</p>
                          </div>
                          
                          {daysUntil >= 0 && (
                            <StatusBadge 
                              status={daysUntil === 0 ? 'Today!' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days away`} 
                              className={
                                daysUntil <= 7 ? 'bg-red-100 text-red-800 border-red-200' : 
                                daysUntil <= 30 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 
                                'bg-green-100 text-green-800 border-green-200'
                              }
                            />
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onViewConference(conference.id)}
                            className="hover:bg-blue-50 hover:border-blue-300 transition-all"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

      {/* Registered Conferences */}
      <FadeIn>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-gray-900" />
            <h2 className="text-xl text-gray-900">Registered Conferences</h2>
          </div>
          {registeredConferences.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No Registered Conferences"
              description="You haven't registered for any conferences yet. Browse our amazing selection and find the perfect event for you!"
              action={{
                label: 'Browse Conferences',
                onClick: () => onViewConference('')
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {registeredConferences.map((conference, index) => (
                <FadeIn key={conference.id} delay={index * 50}>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-40 bg-gray-200">
                      <ImageWithFallback
                        src={conference.imageUrl}
                        alt={conference.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="text-gray-900 line-clamp-2">{conference.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="flex items-center gap-2">
                          <Calendar className="size-4 text-blue-600" />
                          {formatDate(conference.date)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewConference(conference.id)}
                        className="w-full hover:bg-blue-50 hover:border-blue-300 transition-all"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </FadeIn>

      {/* Favorite Conferences */}
      <FadeIn>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="size-5 text-gray-900" />
            <h2 className="text-xl text-gray-900">Favorite Conferences</h2>
          </div>
          {favoriteConferences.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="No Favorite Conferences"
              description="You haven't added any conferences to your favorites yet. Start exploring and save the ones you love!"
              action={{
                label: 'Browse Conferences',
                onClick: () => onViewConference('')
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteConferences.map((conference, index) => (
                <FadeIn key={conference.id} delay={index * 50}>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                      <ImageWithFallback
                        src={conference.imageUrl}
                        alt={conference.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="text-gray-900 line-clamp-2">{conference.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="flex items-center gap-2">
                          <Calendar className="size-4 text-blue-600" />
                          {formatDate(conference.date)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewConference(conference.id)}
                        className="w-full hover:bg-blue-50 hover:border-blue-300 transition-all"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </FadeIn>

      {/* User Profile */}
      <FadeIn>
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <User className="size-5 text-gray-900" />
            <h2 className="text-xl text-gray-900">User Profile</h2>
          </div>
          <div className="flex items-start gap-4">
            <div className="size-16 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
              <User className="size-8 text-white" />
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-gray-900">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}