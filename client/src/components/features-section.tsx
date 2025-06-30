import { Brain, Clock, Heart } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Kicko Trips?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform creates personalized travel experiences tailored to your preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Planning</h3>
            <p className="text-gray-600">Advanced algorithms analyze your preferences to create perfect itineraries</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Time</h3>
            <p className="text-gray-600">Get detailed day-by-day plans in minutes, not hours of research</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized</h3>
            <p className="text-gray-600">Every recommendation is tailored to your unique travel style and preferences</p>
          </div>
        </div>
      </div>
    </section>
  );
}
