import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { toast } from 'sonner@2.0.3';

interface EmailSignupProps {
  conferenceId?: string;
  conferenceName?: string;
  variant?: 'inline' | 'card';
  className?: string;
}

export function EmailSignup({ 
  conferenceId, 
  conferenceName,
  variant = 'card',
  className = '' 
}: EmailSignupProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store in localStorage (would be backend in production)
    const subscriptions = JSON.parse(localStorage.getItem('emailSubscriptions') || '[]');
    subscriptions.push({
      email,
      conferenceId,
      conferenceName,
      subscribedAt: new Date().toISOString(),
    });
    localStorage.setItem('emailSubscriptions', JSON.stringify(subscriptions));
    
    setIsSubscribed(true);
    setIsLoading(false);
    toast.success('Successfully subscribed to notifications!');
  };

  if (isSubscribed) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 ${className}`}>
        <div className="size-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
          <Check className="size-6 text-white" />
        </div>
        <div>
          <p className="text-green-900">You're subscribed!</p>
          <p className="text-sm text-green-700">We'll notify you about updates</p>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading} className="gap-2">
          <Mail className="size-4" />
          {isLoading ? 'Subscribing...' : 'Notify Me'}
        </Button>
      </form>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 ${className}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="size-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Mail className="size-6 text-white" />
        </div>
        <div>
          <h3 className="text-gray-900 mb-1">Get Event Updates</h3>
          <p className="text-sm text-gray-600">
            Subscribe to receive notifications about this event
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          disabled={isLoading}
        />
        <Button type="submit" className="w-full gap-2" disabled={isLoading}>
          <Mail className="size-4" />
          {isLoading ? 'Subscribing...' : 'Subscribe to Updates'}
        </Button>
      </form>
    </div>
  );
}
