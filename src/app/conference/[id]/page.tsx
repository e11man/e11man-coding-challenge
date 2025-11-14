'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import React from "react";
import { Calendar, MapPin, DollarSign, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Conference } from "@/types/conference";

interface ConferenceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ConferenceDetailsPage({ params }: ConferenceDetailsPageProps) {
  const { id } = React.use(params);
  const router = useRouter();
  const [conference, setConference] = useState<Conference | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRegistration, setShowRegistration] = useState(false);
  
  // Registration form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  // Fetch conference from API
  useEffect(() => {
    async function fetchConference() {
      try {
        const res = await fetch(`/api/conferences/${id}`);
        if (res.status === 404) {
          notFound();
          return;
        }
        const data = await res.json();
        setConference(data);
      } catch (error) {
        console.error('Error fetching conference:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchConference();
  }, [id]);

  // Handle registration form submit
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!name || !email) {
      alert("Please fill in name and email");
      return;
    }
    // In a real app, this would send to an API
    alert(`Registration submitted for ${name}!`);
    setShowRegistration(false);
    setName("");
    setEmail("");
    setCompany("");
  };

  // Social sharing
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = conference ? `Check out ${conference.name}!` : '';

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareText);
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="max-w-4xl mx-auto p-8">
          <p>Loading...</p>
        </main>
      </>
    );
  }

  if (!conference) {
    notFound();
    return null;
  }

  const categories = typeof conference.category === 'string' 
    ? JSON.parse(conference.category) 
    : conference.category || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Simple agenda - in real app this would come from database
  const agenda = [
    { time: "9:00 AM", event: "Registration & Welcome" },
    { time: "10:00 AM", event: "Opening Keynote" },
    { time: "11:30 AM", event: "Breakout Sessions" },
    { time: "1:00 PM", event: "Lunch Break" },
    { time: "2:00 PM", event: "Afternoon Sessions" },
    { time: "5:00 PM", event: "Closing Remarks & Networking" },
  ];

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto p-6 md:p-8">
        <button
          onClick={() => router.back()}
          className="mb-6 text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to Events
        </button>

        {/* Conference Image */}
        {conference.imageUrl && (
          <img
            src={conference.imageUrl}
            alt={conference.name}
            className="rounded-lg mb-6 w-full h-64 md:h-96 object-cover"
          />
        )}

        {/* Conference Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            {conference.name}
          </h1>
          
          <div className="flex flex-wrap gap-4 mb-4 text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {formatDate(conference.date)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {conference.location}
            </span>
            <span className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              ${conference.price}
            </span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat: string) => (
              <span key={cat} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
                {cat}
              </span>
            ))}
          </div>

          {/* Status Badge */}
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              conference.status === 'Open' ? 'bg-green-100 text-green-800' :
              conference.status === 'Closed' ? 'bg-gray-100 text-gray-800' :
              'bg-red-100 text-red-800'
            }`}>
              {conference.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">About</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {conference.description}
          </p>
        </section>

        {/* Agenda */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Agenda</h2>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
            <ul className="space-y-4">
              {agenda.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 min-w-[100px]">
                    {item.time}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">{item.event}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Speakers */}
        {conference.speakers && conference.speakers.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Speakers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conference.speakers.map((speaker) => (
                <div key={speaker.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                  {speaker.avatarUrl && (
                    <img
                      src={speaker.avatarUrl}
                      alt={speaker.name}
                      className="w-20 h-20 rounded-full mb-4 object-cover"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                    {speaker.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    {speaker.title} at {speaker.company}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {speaker.bio}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Social Sharing */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Share This Event</h2>
          <div className="flex gap-4">
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Twitter className="h-5 w-5" />
              Twitter
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
            >
              <Facebook className="h-5 w-5" />
              Facebook
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </button>
          </div>
        </section>

        {/* Registration Form */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Registration</h2>
          {!showRegistration ? (
            <button
              onClick={() => setShowRegistration(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Register Now
            </button>
          ) : (
            <form onSubmit={handleRegister} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 max-w-md">
              <div className="mb-4">
                <label className="block mb-2 text-slate-900 dark:text-slate-100 font-medium">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-slate-900 dark:text-slate-100 font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-slate-900 dark:text-slate-100 font-medium">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Submit Registration
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegistration(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
}