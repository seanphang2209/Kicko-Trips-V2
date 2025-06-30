# Kicko Trips - AI-Powered Travel Itinerary Planner

A full-stack web application that generates personalized travel itineraries using AI logic. Users can input their travel preferences and receive detailed day-by-day itineraries with activity recommendations, dining suggestions, and booking links.

![Kicko Trips Demo](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop)

## Features

- 🤖 **AI-Powered Planning** - Smart itinerary generation based on user preferences
- 🗺️ **Multiple Destinations** - Support for Bali, Tokyo, Paris, Bangkok and more
- 📅 **Day-by-Day Planning** - Detailed schedules with timing and recommendations
- 🍽️ **Dietary Preferences** - Customized restaurant suggestions based on dietary needs
- 💰 **Budget-Aware** - Recommendations that match your budget (Budget/Medium/Luxury)
- 👥 **Group Types** - Tailored for Solo, Couple, Family, or Friends travel
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🔗 **Booking Integration** - Direct links to book activities and make reservations

## Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Hook Form** with Zod validation
- **TanStack Query** for data fetching
- **Wouter** for routing
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **PostgreSQL** for data storage
- **CORS** enabled for cross-origin requests
- **In-memory storage** for development

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/kicko-trips.git
cd kicko-trips
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
kicko-trips/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and types
│   │   └── hooks/          # Custom React hooks
├── server/                 # Express backend
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data storage interface
│   └── utils/              # Backend utilities
│       ├── aiLogic.ts      # AI itinerary generation
│       ├── sampleData.ts   # Mock destination data
│       └── weatherSimulator.ts # Weather simulation
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database and validation schemas
└── README.md
```

## API Endpoints

### `GET /api/dropdowns`
Returns form dropdown options for destinations, trip types, budgets, etc.

### `POST /api/generate-itinerary`
Generates a personalized itinerary based on user input.

**Request body:**
```json
{
  "destination": "bali",
  "startDate": "2025-07-10",
  "endDate": "2025-07-14", 
  "tripType": ["Relaxation", "Foodie"],
  "pace": "Easy",
  "budget": "Medium",
  "groupType": "Couple",
  "dietaryRestrictions": "Halal",
  "mustSee": "Uluwatu Temple",
  "avoid": "Nightclubs"
}
```

**Response:**
```json
{
  "tripSummary": {
    "destination": "Bali",
    "days": 4,
    "weather": "30°C, humid with light showers",
    "style": "Relaxation + Foodie"
  },
  "itinerary": [
    {
      "day": "Day 1",
      "date": "July 10, 2025",
      "summary": "Beach intro and halal-friendly dinner",
      "activities": [
        {
          "time": "2:00 PM",
          "title": "Check-in at Canggu Villa",
          "reason": "Quiet retreat ideal for couples and relaxation."
        },
        {
          "time": "4:00 PM", 
          "title": "Sunset at Uluwatu Temple",
          "reason": "One of your must-see picks; sunset is the best time.",
          "action": {
            "label": "Book sunset tour",
            "url": "https://klook.com/search/Uluwatu%20sunset"
          }
        }
      ]
    }
  ]
}
```

## Available Destinations

- **Bali, Indonesia** - Temples, beaches, cultural experiences
- **Tokyo, Japan** - Modern culture, traditional sites, amazing food
- **Paris, France** - Art, history, romance, cuisine
- **Bangkok, Thailand** - Street food, temples, floating markets

## Customization Options

- **Trip Types**: Relaxation, Adventure, Cultural, Foodie
- **Pace**: Easy, Moderate, Fast
- **Budget**: Budget, Medium, Luxury
- **Group Types**: Solo, Couple, Family, Friends
- **Dietary Restrictions**: None, Vegetarian, Vegan, Halal, Kosher

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (optional, uses in-memory storage by default)
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- 🔐 User authentication and saved itineraries
- 🌐 Real-time weather API integration
- 🤖 OpenAI API integration for enhanced AI recommendations
- 📍 Google Maps integration with interactive maps
- 💳 Stripe integration for booking payments
- 📧 Email itinerary sharing
- 🌍 Support for more destinations worldwide

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with React and Express.js
- UI components from shadcn/ui
- Icons from Lucide React
- Sample images from Unsplash

---

**Kicko Trips** - Your AI-powered travel companion for creating unforgettable journeys around the world.