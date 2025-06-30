import NavigationHeader from "@/components/navigation-header";
import HeroSection from "@/components/hero-section";
import TripPlanningForm from "@/components/trip-planning-form";
import ItineraryDisplay from "@/components/itinerary-display";
import FeaturesSection from "@/components/features-section";
import { useState } from "react";
import { GeneratedItinerary } from "@/lib/types";

export default function Home() {
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);

  const handleItineraryGenerated = (itinerary: GeneratedItinerary) => {
    setGeneratedItinerary(itinerary);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <TripPlanningForm onItineraryGenerated={handleItineraryGenerated} />
          <ItineraryDisplay itinerary={generatedItinerary} />
        </div>
      </div>

      <FeaturesSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <i className="fas fa-paper-plane mr-2"></i>
                Kicko Trips
              </h3>
              <p className="text-gray-300 mb-4">
                Your AI-powered travel companion for creating unforgettable journeys around the world.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">© 2024 Kicko Trips. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
