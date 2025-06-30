export interface Destination {
  id: string;
  name: string;
  country: string;
  activities: Activity[];
  restaurants: Restaurant[];
  accommodations: Accommodation[];
}

export interface Activity {
  id: string;
  name: string;
  type: string[];
  description: string;
  duration: string;
  price: string;
  bestTime: string;
  bookingUrl?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  dietaryOptions: string[];
  priceRange: string;
  location: string;
  rating: number;
  reservationUrl?: string;
}

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  priceRange: string;
  location: string;
  amenities: string[];
}

const destinations: Destination[] = [
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    activities: [
      {
        id: "uluwatu-temple",
        name: "Uluwatu Temple Sunset Tour",
        type: ["Cultural", "Relaxation"],
        description: "Ancient clifftop temple with stunning sunset views and traditional Kecak dance performance",
        duration: "3 hours",
        price: "Medium",
        bestTime: "4:00 PM - 7:00 PM",
        bookingUrl: "https://klook.com/search/Uluwatu%20sunset"
      },
      {
        id: "rice-terraces",
        name: "Jatiluwih Rice Terraces",
        type: ["Cultural", "Adventure"],
        description: "UNESCO World Heritage rice terraces with hiking trails and local farming experiences",
        duration: "4 hours",
        price: "Budget",
        bestTime: "8:00 AM - 12:00 PM"
      },
      {
        id: "monkey-forest",
        name: "Sacred Monkey Forest Sanctuary",
        type: ["Adventure", "Cultural"],
        description: "Nature reserve and Hindu temple complex home to over 700 Balinese long-tailed macaques",
        duration: "2 hours",
        price: "Budget",
        bestTime: "9:00 AM - 4:00 PM"
      },
      {
        id: "spa-treatment",
        name: "Traditional Balinese Spa",
        type: ["Relaxation"],
        description: "Authentic spa experience with traditional massage and herbal treatments",
        duration: "2 hours",
        price: "Medium",
        bestTime: "10:00 AM - 8:00 PM"
      }
    ],
    restaurants: [
      {
        id: "jimbaran-seafood",
        name: "Jimbaran Bay Seafood",
        cuisine: "Indonesian Seafood",
        dietaryOptions: ["Halal", "Pescatarian"],
        priceRange: "Medium",
        location: "Jimbaran Beach",
        rating: 4.5,
        reservationUrl: "https://maps.google.com/jimbaran-seafood"
      },
      {
        id: "bebek-bengil",
        name: "Bebek Bengil (Dirty Duck Diner)",
        cuisine: "Indonesian",
        dietaryOptions: ["Halal"],
        priceRange: "Medium",
        location: "Ubud",
        rating: 4.3
      },
      {
        id: "locavore",
        name: "Locavore",
        cuisine: "Modern Indonesian",
        dietaryOptions: ["Vegetarian", "Vegan"],
        priceRange: "Luxury",
        location: "Ubud",
        rating: 4.8
      }
    ],
    accommodations: [
      {
        id: "canggu-villa",
        name: "Canggu Beach Villa",
        type: "Villa",
        priceRange: "Medium",
        location: "Canggu",
        amenities: ["Private Pool", "Beach Access", "Kitchen", "WiFi"]
      }
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    activities: [
      {
        id: "senso-ji",
        name: "Senso-ji Temple",
        type: ["Cultural"],
        description: "Tokyo's oldest temple with traditional shopping street Nakamise-dori",
        duration: "2 hours",
        price: "Budget",
        bestTime: "8:00 AM - 5:00 PM"
      },
      {
        id: "shibuya-crossing",
        name: "Shibuya Crossing Experience",
        type: ["Cultural", "Adventure"],
        description: "World's busiest pedestrian crossing with observation deck views",
        duration: "1 hour",
        price: "Budget",
        bestTime: "5:00 PM - 8:00 PM"
      },
      {
        id: "tsukiji-market",
        name: "Tsukiji Outer Market Food Tour",
        type: ["Foodie", "Cultural"],
        description: "Fresh sushi breakfast and street food exploration in famous fish market area",
        duration: "3 hours",
        price: "Medium",
        bestTime: "6:00 AM - 10:00 AM"
      }
    ],
    restaurants: [
      {
        id: "sukiyabashi-jiro",
        name: "Sukiyabashi Jiro",
        cuisine: "Sushi",
        dietaryOptions: ["Pescatarian"],
        priceRange: "Luxury",
        location: "Ginza",
        rating: 4.9
      },
      {
        id: "ramen-yokocho",
        name: "Shinjuku Ramen Yokocho",
        cuisine: "Ramen",
        dietaryOptions: ["Vegetarian options available"],
        priceRange: "Budget",
        location: "Shinjuku",
        rating: 4.2
      }
    ],
    accommodations: [
      {
        id: "tokyo-hotel",
        name: "Park Hyatt Tokyo",
        type: "Hotel",
        priceRange: "Luxury",
        location: "Shinjuku",
        amenities: ["City Views", "Spa", "Fine Dining", "Business Center"]
      }
    ]
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    activities: [
      {
        id: "eiffel-tower",
        name: "Eiffel Tower Experience",
        type: ["Cultural"],
        description: "Iconic iron tower with panoramic city views from multiple observation levels",
        duration: "2 hours",
        price: "Medium",
        bestTime: "9:00 AM - 11:00 PM"
      },
      {
        id: "louvre-museum",
        name: "Louvre Museum Tour",
        type: ["Cultural"],
        description: "World's largest art museum featuring Mona Lisa and Venus de Milo",
        duration: "4 hours",
        price: "Medium",
        bestTime: "9:00 AM - 6:00 PM"
      },
      {
        id: "seine-cruise",
        name: "Seine River Cruise",
        type: ["Relaxation", "Cultural"],
        description: "Scenic boat tour along the Seine with views of Notre Dame and other landmarks",
        duration: "1.5 hours",
        price: "Medium",
        bestTime: "2:00 PM - 8:00 PM"
      }
    ],
    restaurants: [
      {
        id: "le-comptoir",
        name: "Le Comptoir du Relais",
        cuisine: "French Bistro",
        dietaryOptions: ["Vegetarian"],
        priceRange: "Medium",
        location: "Saint-Germain",
        rating: 4.4
      },
      {
        id: "lami-jean",
        name: "L'Ami Jean",
        cuisine: "French",
        dietaryOptions: ["Vegetarian options available"],
        priceRange: "Medium",
        location: "7th Arrondissement",
        rating: 4.6
      }
    ],
    accommodations: [
      {
        id: "paris-hotel",
        name: "Hotel des Grands Boulevards",
        type: "Boutique Hotel",
        priceRange: "Medium",
        location: "2nd Arrondissement",
        amenities: ["Historic Building", "Restaurant", "Bar", "WiFi"]
      }
    ]
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    activities: [
      {
        id: "grand-palace",
        name: "Grand Palace Complex",
        type: ["Cultural"],
        description: "Ornate royal palace complex with Wat Phra Kaew temple and Emerald Buddha",
        duration: "3 hours",
        price: "Budget",
        bestTime: "8:00 AM - 3:30 PM"
      },
      {
        id: "floating-market",
        name: "Damnoen Saduak Floating Market",
        type: ["Cultural", "Foodie"],
        description: "Traditional floating market with boat vendors selling fresh fruits and local dishes",
        duration: "4 hours",
        price: "Medium",
        bestTime: "7:00 AM - 11:00 AM"
      },
      {
        id: "thai-massage",
        name: "Traditional Thai Massage",
        type: ["Relaxation"],
        description: "Authentic Thai massage therapy combining acupressure and yoga-like stretching",
        duration: "2 hours",
        price: "Budget",
        bestTime: "10:00 AM - 10:00 PM"
      }
    ],
    restaurants: [
      {
        id: "jay-fai",
        name: "Jay Fai",
        cuisine: "Thai Street Food",
        dietaryOptions: ["Halal options available"],
        priceRange: "Budget",
        location: "Bangkok Old Town",
        rating: 4.7
      },
      {
        id: "bo-lan",
        name: "Bo.Lan",
        cuisine: "Thai Fine Dining",
        dietaryOptions: ["Vegetarian", "Vegan"],
        priceRange: "Luxury",
        location: "Thonglor",
        rating: 4.6
      }
    ],
    accommodations: [
      {
        id: "bangkok-hotel",
        name: "The Siam Hotel",
        type: "Luxury Hotel",
        priceRange: "Luxury",
        location: "Dusit District",
        amenities: ["River Views", "Spa", "Pool", "Thai Cooking Classes"]
      }
    ]
  }
];

export const getDestinations = (): Destination[] => destinations;

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(dest => dest.id === id);
};

export const getDropdownData = async () => {
  return {
    destinations: destinations.map(dest => ({
      value: dest.id,
      label: `${dest.name}, ${dest.country}`
    })),
    tripTypes: [
      { value: "Relaxation", label: "Relaxation" },
      { value: "Adventure", label: "Adventure" },
      { value: "Cultural", label: "Cultural" },
      { value: "Foodie", label: "Foodie" }
    ],
    paces: [
      { value: "Easy", label: "Easy" },
      { value: "Moderate", label: "Moderate" },
      { value: "Fast", label: "Fast" }
    ],
    budgets: [
      { value: "Budget", label: "Budget" },
      { value: "Medium", label: "Medium" },
      { value: "Luxury", label: "Luxury" }
    ],
    groupTypes: [
      { value: "Solo", label: "Solo" },
      { value: "Couple", label: "Couple" },
      { value: "Family", label: "Family" },
      { value: "Friends", label: "Friends" }
    ],
    dietaryRestrictions: [
      { value: "None", label: "None" },
      { value: "Vegetarian", label: "Vegetarian" },
      { value: "Vegan", label: "Vegan" },
      { value: "Halal", label: "Halal" },
      { value: "Kosher", label: "Kosher" }
    ]
  };
};
