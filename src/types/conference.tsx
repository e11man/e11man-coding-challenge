export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  avatarUrl?: string;
}

export interface Conference {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  category: string[];
  imageUrl?: string;
  speakers: Speaker[];
  maxAttendees: number;
  currentAttendees: number;
  isFeatured: boolean;
  status: 'Open' | 'Closed' | 'Sold Out';
}

export interface User {
  id: string;
  name: string;
  email: string;
  registeredConferences: string[];
  favoriteConferences: string[];
}

export interface Registration {
  conferenceId: string;
  userId: string;
  name: string;
  email: string;
  company?: string;
  registeredAt: string;
}
