import { type GenerateItineraryRequest } from "@shared/schema";
import { getDestinationById } from "./sampleData";
import { generateWeatherForecast } from "./weatherSimulator";
import { differenceInDays, parseISO, format, addDays } from "date-fns";

interface ItineraryActivity {
  time: string;
  title: string;
  reason: string;
  action?: {
    label: string;
    url: string;
  };
}

interface ItineraryDay {
  day: string;
  date: string;
  summary: string;
  activities: ItineraryActivity[];
}

interface GeneratedItinerary {
  tripSummary: {
    destination: string;
    days: number;
    weather: string;
    style: string;
  };
  itinerary: ItineraryDay[];
}

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM"
];

export const generateItinerary = async (request: GenerateItineraryRequest): Promise<GeneratedItinerary> => {
  const destination = getDestinationById(request.destination);
  if (!destination) {
    throw new Error("Destination not found");
  }

  const startDate = parseISO(request.startDate);
  const endDate = parseISO(request.endDate);
  const days = differenceInDays(endDate, startDate) + 1;

  // Generate weather forecast
  const weather = generateWeatherForecast(request.destination);

  // Filter activities based on trip type and preferences
  const relevantActivities = destination.activities.filter(activity => {
    return request.tripType.some(type => activity.type.includes(type));
  });

  // Filter restaurants based on dietary restrictions
  const relevantRestaurants = destination.restaurants.filter(restaurant => {
    if (!request.dietaryRestrictions) return true;
    return restaurant.dietaryOptions.includes(request.dietaryRestrictions);
  });

  // Generate daily itinerary
  const itinerary: ItineraryDay[] = [];

  for (let dayIndex = 0; dayIndex < days; dayIndex++) {
    const currentDate = addDays(startDate, dayIndex);
    const dayActivities: ItineraryActivity[] = [];

    // Determine number of activities based on pace
    let activitiesPerDay = 3; // Easy pace
    if (request.pace === "Moderate") activitiesPerDay = 4;
    if (request.pace === "Fast") activitiesPerDay = 6;

    // First day - arrival and check-in
    if (dayIndex === 0) {
      dayActivities.push({
        time: "2:00 PM",
        title: `Check-in at ${destination.accommodations[0]?.name || 'hotel'}`,
        reason: `Perfect for ${request.groupType.toLowerCase()} seeking ${request.tripType.join(' and ').toLowerCase()} experience.`
      });
    }

    // Add must-see attractions if specified
    if (request.mustSee && dayIndex === 0) {
      const mustSeeActivity = relevantActivities.find(activity => 
        activity.name.toLowerCase().includes(request.mustSee!.toLowerCase())
      );
      
      if (mustSeeActivity) {
        dayActivities.push({
          time: mustSeeActivity.bestTime.split(' - ')[0] || "4:00 PM",
          title: mustSeeActivity.name,
          reason: `One of your must-see picks; ${mustSeeActivity.bestTime.includes('sunset') ? 'sunset is the best time' : 'perfect timing for this experience'}.`,
          action: mustSeeActivity.bookingUrl ? {
            label: "Book Tour",
            url: mustSeeActivity.bookingUrl
          } : undefined
        });
      }
    }

    // Add random relevant activities
    const remainingSlots = activitiesPerDay - dayActivities.length;
    const shuffledActivities = [...relevantActivities].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < Math.min(remainingSlots - 1, shuffledActivities.length); i++) {
      const activity = shuffledActivities[i];
      const timeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
      
      // Skip if this is something to avoid
      if (request.avoid && activity.name.toLowerCase().includes(request.avoid.toLowerCase())) {
        continue;
      }

      dayActivities.push({
        time: timeSlot,
        title: activity.name,
        reason: generateActivityReason(activity, request),
        action: activity.bookingUrl ? {
          label: "Book Activity",
          url: activity.bookingUrl
        } : undefined
      });
    }

    // Add dining experience
    const restaurant = relevantRestaurants[Math.floor(Math.random() * relevantRestaurants.length)];
    if (restaurant) {
      dayActivities.push({
        time: "7:00 PM",
        title: `Dinner at ${restaurant.name}`,
        reason: generateRestaurantReason(restaurant, request),
        action: restaurant.reservationUrl ? {
          label: "View on Maps",
          url: restaurant.reservationUrl
        } : undefined
      });
    }

    // Sort activities by time
    dayActivities.sort((a, b) => {
      const timeA = convertTo24Hour(a.time);
      const timeB = convertTo24Hour(b.time);
      return timeA.localeCompare(timeB);
    });

    itinerary.push({
      day: `Day ${dayIndex + 1}`,
      date: format(currentDate, 'MMMM d, yyyy'),
      summary: generateDaySummary(dayActivities, request.tripType),
      activities: dayActivities
    });
  }

  return {
    tripSummary: {
      destination: destination.name,
      days,
      weather: weather.description,
      style: request.tripType.join(' + ')
    },
    itinerary
  };
};

const generateActivityReason = (activity: any, request: GenerateItineraryRequest): string => {
  const reasons = [
    `Perfect for your ${request.tripType.join(' and ').toLowerCase()} preferences.`,
    `Ideal ${request.pace.toLowerCase()}-paced activity for ${request.groupType.toLowerCase()}.`,
    `Highly rated experience matching your ${request.budget.toLowerCase()} budget.`,
    `Recommended based on your interest in ${request.tripType[0].toLowerCase()} activities.`
  ];
  
  return reasons[Math.floor(Math.random() * reasons.length)];
};

const generateRestaurantReason = (restaurant: any, request: GenerateItineraryRequest): string => {
  let reason = `Top-rated ${restaurant.cuisine.toLowerCase()} restaurant`;
  
  if (request.dietaryRestrictions && restaurant.dietaryOptions.includes(request.dietaryRestrictions)) {
    reason += ` with excellent ${request.dietaryRestrictions.toLowerCase()} options`;
  }
  
  reason += ` in ${restaurant.location}.`;
  
  return reason;
};

const generateDaySummary = (activities: ItineraryActivity[], tripTypes: string[]): string => {
  const summaries = [
    `${tripTypes[0]} focused day with local experiences`,
    `Perfect blend of ${tripTypes.join(' and ').toLowerCase()}`,
    `Cultural immersion and authentic dining`,
    `Adventure-filled day with scenic highlights`,
    `Relaxing day with premium experiences`
  ];
  
  return summaries[Math.floor(Math.random() * summaries.length)];
};

const convertTo24Hour = (time12h: string): string => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (hours === 12) {
    hours = 0;
  }
  
  if (modifier === 'PM') {
    hours += 12;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
