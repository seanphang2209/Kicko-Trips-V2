# Kicko Trips - AI-Powered Travel Itinerary Planner

## Overview

Kicko Trips is a full-stack web application that generates personalized travel itineraries using AI logic. The application features a React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration. Users can input their travel preferences and receive detailed day-by-day itineraries with activity recommendations, dining suggestions, and booking links.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Management**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: express-session with connect-pg-simple
- **CORS**: Enabled for cross-origin requests
- **Environment**: Development and production configurations

### Project Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript schemas and types
- `migrations/` - Database migration files (Drizzle)

## Key Components

### Database Schema (shared/schema.ts)
- **Users Table**: User authentication with username/password
- **Itineraries Table**: Stores generated travel plans with user preferences and AI-generated content
- **Form Validation**: Zod schemas for request validation

### API Endpoints (server/routes.ts)
- `GET /api/dropdowns` - Returns form dropdown options (destinations, trip types, etc.)
- `POST /api/generate-itinerary` - Accepts user preferences and returns personalized itinerary

### AI Logic Simulation (server/utils/aiLogic.ts)
- Processes user input (destination, dates, preferences, budget, pace)
- Generates day-by-day itineraries with activities and dining
- Includes weather simulation and reasoning for recommendations
- Provides booking action links for activities and restaurants

### Frontend Components
- **TripPlanningForm**: Multi-field form with validation for travel preferences
- **ItineraryDisplay**: Renders generated itineraries with timeline view
- **NavigationHeader**: App branding and navigation
- **HeroSection**: Landing page with call-to-action
- **FeaturesSection**: Highlights app benefits

## Data Flow

1. **User Input**: User fills out travel planning form with destination, dates, trip type, pace, budget, group type, and preferences
2. **Form Validation**: Frontend validates input using Zod schemas before submission
3. **API Request**: Form data sent to `/api/generate-itinerary` endpoint
4. **AI Processing**: Backend processes preferences and generates personalized itinerary using mock AI logic
5. **Database Storage**: Generated itinerary stored in PostgreSQL database
6. **Response**: Structured itinerary returned to frontend
7. **Display**: Frontend renders interactive timeline with activities, reasons, and action buttons

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- UI components (@radix-ui/* components)
- TanStack Query for data fetching
- Wouter for routing
- Tailwind CSS for styling
- Zod for schema validation
- date-fns for date manipulation

### Backend Dependencies
- Express.js for web server
- Drizzle ORM for database operations
- @neondatabase/serverless for PostgreSQL connection
- CORS for cross-origin requests
- connect-pg-simple for session storage
- date-fns for date operations

### Development Dependencies
- Vite for frontend build tooling
- TypeScript for type safety
- ESBuild for backend bundling
- tsx for TypeScript execution

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server on port 5000
- **Backend**: Express server with hot reload using tsx
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Build**: Concurrent frontend and backend development

### Production Build
- **Frontend**: Static files built to `dist/public/` directory
- **Backend**: Bundled with ESBuild to `dist/index.js`
- **Deployment**: Configured for Replit autoscale deployment
- **Port**: External port 80 mapped to internal port 5000

### Environment Configuration
- Development: NODE_ENV=development with Vite dev server
- Production: NODE_ENV=production with static file serving
- Database: PostgreSQL connection string required via DATABASE_URL

## Changelog

```
Changelog:
- June 26, 2025. Initial setup
- June 30, 2025. Complete implementation of Kicko Trips AI travel planner
  - Built full-stack application with React frontend and Express backend
  - Implemented AI-powered itinerary generation with sample data
  - Added support for multiple destinations (Bali, Tokyo, Paris, Bangkok)
  - Created comprehensive form with all travel preferences
  - Added beautiful UI with trip planning and itinerary display
  - Fixed all technical issues and deployed successfully
  - Created comprehensive documentation and GitHub-ready repository
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```