export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownData {
  destinations: DropdownOption[];
  tripTypes: DropdownOption[];
  paces: DropdownOption[];
  budgets: DropdownOption[];
  groupTypes: DropdownOption[];
  dietaryRestrictions: DropdownOption[];
}

export interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  tripType: string[];
  pace: string;
  budget: string;
  groupType: string;
  dietaryRestrictions: string;
  mustSee: string;
  avoid: string;
}

export interface ItineraryActivity {
  time: string;
  title: string;
  reason: string;
  action?: {
    label: string;
    url: string;
  };
}

export interface ItineraryDay {
  day: string;
  date: string;
  summary: string;
  activities: ItineraryActivity[];
}

export interface GeneratedItinerary {
  tripSummary: {
    destination: string;
    days: number;
    weather: string;
    style: string;
  };
  itinerary: ItineraryDay[];
}
