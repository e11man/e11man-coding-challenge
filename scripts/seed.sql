-- Clear existing data
-- test data gneerated by ai
DELETE FROM conference_speakers;
DELETE FROM conferences;
DELETE FROM speakers;

-- Insert speakers
INSERT INTO speakers (id, name, title, company, bio, avatar_url) VALUES
('1', 'Sarah Johnson', 'Principal Engineer', 'Meta', 'Sarah is a passionate developer advocate with 10+ years of experience in React development.', NULL),
('2', 'Michael Chen', 'Tech Lead', 'Google', 'Michael leads the AI/ML team and has contributed to major open-source projects.', NULL),
('3', 'Emily Rodriguez', 'Senior Frontend Developer', 'Vercel', 'Emily specializes in Next.js and has spoken at numerous international conferences.', NULL),
('4', 'David Kim', 'CTO', 'TechStart', 'David is an entrepreneur and tech leader passionate about web performance.', NULL);

-- Insert conferences
INSERT INTO conferences (id, name, description, date, location, price, category, image_url, max_attendees, current_attendees, is_featured, status) VALUES
('1', 'React Summit 2024', 'Join us for the biggest React conference of the year! Learn about the latest React features, best practices, and network with thousands of React developers from around the world. This two-day event features workshops, keynotes, and hands-on sessions.', '2024-12-05', 'San Francisco, CA', 499, '["React", "Frontend", "JavaScript"]', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', 500, 342, true, 'Open'),
('2', 'AI/ML Developer Conference', 'Explore the cutting edge of artificial intelligence and machine learning. This conference brings together industry leaders, researchers, and practitioners to share insights on the latest developments in AI/ML technology.', '2024-11-20', 'New York, NY', 699, '["AI/ML", "Python", "Data Science"]', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', 300, 300, true, 'Sold Out'),
('3', 'Next.js Conf 2024', 'The official Next.js conference featuring the core team and community contributors. Learn about the latest features in Next.js 14+, server components, and advanced optimization techniques.', '2024-12-15', 'Austin, TX', 399, '["Next.js", "React", "Full Stack"]', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', 400, 256, true, 'Open'),
('4', 'Web Performance Summit', 'Master the art of building blazing-fast web applications. This conference covers Core Web Vitals, optimization strategies, and performance monitoring techniques.', '2025-01-10', 'Seattle, WA', 549, '["Web Development", "Performance", "DevOps"]', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', 250, 180, false, 'Open'),
('5', 'TypeScript Masterclass', 'Deep dive into advanced TypeScript patterns and best practices. Perfect for developers looking to level up their type-safety game and build more maintainable applications.', '2024-12-20', 'Boston, MA', 299, '["TypeScript", "JavaScript", "Frontend"]', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', 200, 145, false, 'Open'),
('6', 'Full Stack Developer Days', 'A comprehensive conference covering the entire web development stack. From frontend frameworks to backend architectures, databases, and deployment strategies.', '2024-11-15', 'Chicago, IL', 599, '["Full Stack", "React", "Node.js"]', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80', 350, 320, false, 'Open'),
('7', 'DevOps & Cloud Native', 'Learn the latest in cloud infrastructure, containerization, Kubernetes, and CI/CD pipelines. Perfect for developers and ops professionals.', '2024-12-01', 'Denver, CO', 649, '["DevOps", "Cloud", "Kubernetes"]', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', 300, 267, false, 'Open'),
('8', 'Mobile Development Summit', 'Explore React Native, Flutter, and native mobile development. Build cross-platform apps that users love.', '2025-01-25', 'Los Angeles, CA', 499, '["Mobile", "React Native", "Flutter"]', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80', 400, 189, false, 'Open');

-- Insert conference-speaker relationships
INSERT INTO conference_speakers (conference_id, speaker_id) VALUES
('1', '1'),  -- React Summit: Sarah Johnson
('1', '3'),  -- React Summit: Emily Rodriguez
('2', '2'),  -- AI/ML: Michael Chen
('3', '3'),  -- Next.js: Emily Rodriguez
('3', '4'),  -- Next.js: David Kim
('4', '4'),  -- Web Performance: David Kim
('5', '1'),  -- TypeScript: Sarah Johnson
('5', '2'),  -- TypeScript: Michael Chen
('6', '1'),  -- Full Stack: Sarah Johnson
('6', '2'),  -- Full Stack: Michael Chen
('6', '3'),  -- Full Stack: Emily Rodriguez
('6', '4'),  -- Full Stack: David Kim
('7', '4'),  -- DevOps: David Kim
('8', '1'),  -- Mobile: Sarah Johnson
('8', '3');  -- Mobile: Emily Rodriguez