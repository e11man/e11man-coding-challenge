# Tech Conference Explorer

A full-stack web application built with Next.js that helps developers discover and manage upcoming tech conferences.

## Project Overview

This application provides a platform for browsing, filtering, and managing tech conferences. Users can search for events, view detailed information, save favorites, and administrators can manage the conference catalog through a dedicated admin panel.

## Features Implemented

### 1. Conference Listings Page (`/`)
- Grid-based display of conferences with key information (name, date, location, price)
- Category tags (e.g., "React", "AI/ML", "Web Development")
- Featured images with hover effects
- Registration status badges (Open/Closed/Sold Out)
- "TechMeet 2024" special badge for December events (via custom hook)
- Search and filtering by:
  - Conference name or description
  - Category/tags
  - Specific date
  - Price range (min/max)
- Hero section with animated scroll effects
- Responsive design for mobile and desktop

### 2. Conference Detail Page (`/conference/[id]`)
- Comprehensive conference information with full description
- Speaker information with avatars, titles, and bios
- Sample agenda with time slots
- Category tags and status badges
- Registration form with validation (name, email, optional company)
- Social sharing buttons (Twitter, Facebook, LinkedIn)
- Dynamic routing using Next.js App Router

### 3. User Dashboard (`/dashboard`)
- View all favorited conferences
- Remove favorites with a single click
- Persistent storage using localStorage
- Clean interface for managing saved events

### 4. Admin Panel (`/admin`)
- Full CRUD operations for conference management
- Create, edit, and delete conferences
- View all conferences in a table format
- Form validation and error handling
- Status tracking with visual badges

## Technical Stack

**Frontend:**
- Next.js 16.0.1 with App Router
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4.1.17
- Framer Motion for animations
- Radix UI components
- Lucide React for icons

**Backend & Database:**
- Next.js API Routes
- Prisma 6.19.0 as ORM
- PostgreSQL database (Supabase)

**State Management:**
- React Hooks (useState, useEffect) for local state
- localStorage for persistent user preferences (favorites)
- Client-side filtering

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (cloud-hosted)
- Git

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd e11man-coding-challenge
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/conference_db?schema=public"
   ```
   

4. Set up the database
   
   Option A: Using Prisma (Recommended)
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   
   Option B: Using SQL scripts
   ```bash
   psql -U username -d conference_db -f scripts/schema.sql
   psql -U username -d conference_db -f scripts/seed.sql
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## Technical Decisions

### Database: PostgreSQL with Prisma
Used PostgreSQL (Supabase) with Prisma ORM for relational data structure and better data integrity. The schema includes conferences, speakers, and a many-to-many relationship table.

### State Management: Local State + localStorage
Used React hooks and localStorage instead of global state management because it was simpler for MVP.

### API Architecture: Next.js API Routes
Built RESTful API routes within Next.js to keep everything in one codebase and simplify deployment.

### Styling: Tailwind CSS
Used Tailwind CSS for rapid development with utility classes and consistent design system.

### Custom Hook: useConferenceValidator
Created a custom hook for date validation logic that returns "TechMeet 2024" status for events in December, as required by the project specification.

### Client-Side Filtering
Implemented filtering on the client side for faster user experience and reduced server load. May need server-side filtering for very large datasets.

## API Routes

- `GET /api/conferences` - Fetch all conferences
- `POST /api/conferences` - Create a new conference
- `GET /api/conferences/[id]` - Fetch a single conference with speakers
- `PUT /api/conferences/[id]` - Update a conference
- `DELETE /api/conferences/[id]` - Delete a conference

## Project Structure

```
e11man-coding-challenge/
├── prisma/
│   └── schema.prisma
├── scripts/
│   ├── schema.sql
│   ├── seed.sql
│   └── prisma-generate.cjs
├── src/
│   ├── app/
│   │   ├── api/conferences/
│   │   ├── admin/
│   │   ├── conference/[id]/
│   │   ├── dashboard/
│   │   └── page.tsx
│   ├── components/
│   │   ├── conferences/
│   │   ├── home/
│   │   └── ui/
│   ├── hooks/
│   │   └── useConferenceValidator.ts
│   ├── types/
│   │   └── conference.tsx
│   └── utils/
│       └── prisma.ts
└── public/
```

## Future Improvements

**High Priority:**
- Authentication and user management
- Add pagination for larger datasets
- Server-side filtering for large datasets
- Real registration system with database tracking
- Image upload functionality

**Medium Priority:**
- Pagination or infinite scroll
- Enhanced error handling and loading states
- SEO optimization with dynamic meta tags
- Unit and integration tests

**Nice to Have:**
- Dark mode toggle
- Internationalization support
- Real-time updates with WebSockets
- Analytics dashboard
- Email notifications

---

Built with Next.js, React, and TypeScript
