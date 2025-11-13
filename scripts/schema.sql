-- Speakers table
CREATE TABLE speakers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  bio TEXT NOT NULL,
  avatar_url TEXT
);

-- Conferences table
CREATE TABLE conferences (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  max_attendees INTEGER NOT NULL,
  current_attendees INTEGER NOT NULL,
  is_featured BOOLEAN NOT NULL,
  status TEXT NOT NULL
);

-- Conference speakers junction table
CREATE TABLE conference_speakers (
  conference_id TEXT REFERENCES conferences(id),
  speaker_id TEXT REFERENCES speakers(id),
  PRIMARY KEY (conference_id, speaker_id)
);