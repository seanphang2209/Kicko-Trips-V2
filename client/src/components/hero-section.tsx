import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative hero-gradient text-white">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" 
           style={{backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"}}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Plan Your Perfect Trip with AI
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Get personalized day-by-day itineraries powered by artificial intelligence. 
            Just tell us your preferences and let Kicko create your dream vacation.
          </p>
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 shadow-lg px-8 py-4 text-lg font-semibold"
            onClick={() => {
              const formSection = document.getElementById('trip-planning-form');
              formSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Start Planning Now
          </Button>
        </div>
      </div>
    </div>
  );
}
