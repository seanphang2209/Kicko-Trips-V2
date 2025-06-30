import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Thermometer, 
  Palette, 
  Clock, 
  Info, 
  Star, 
  Utensils, 
  ExternalLink,
  Eye,
  Plus
} from "lucide-react";
import { GeneratedItinerary } from "@/lib/types";

interface ItineraryDisplayProps {
  itinerary: GeneratedItinerary | null;
}

export default function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  if (!itinerary) {
    return (
      <div className="space-y-8">
        <Card className="trip-card">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Itinerary Yet</h3>
              <p className="text-gray-600">Fill out the form to generate your personalized travel plan</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTimeSlotClass = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    const isPM = time.includes('PM');
    const hour24 = isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour;
    
    if (hour24 < 12) return "activity-time-morning";
    if (hour24 < 17) return "activity-time-afternoon";
    return "activity-time-evening";
  };

  return (
    <div className="space-y-8">
      {/* Trip Summary Card */}
      <Card className="trip-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Your {itinerary.tripSummary.destination} Adventure
            </CardTitle>
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {itinerary.tripSummary.days} days
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Thermometer className="text-blue-600 mr-2 h-4 w-4" />
                <span className="font-medium text-gray-900">Weather</span>
              </div>
              <p className="text-sm text-gray-600">{itinerary.tripSummary.weather}</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Palette className="text-emerald-600 mr-2 h-4 w-4" />
                <span className="font-medium text-gray-900">Style</span>
              </div>
              <p className="text-sm text-gray-600">{itinerary.tripSummary.style}</p>
            </div>
          </div>

          {/* Sample destination image */}
          <div className="rounded-xl overflow-hidden mb-4">
            <img 
              src={getDestinationImage(itinerary.tripSummary.destination)}
              alt={`${itinerary.tripSummary.destination} landscape`} 
              className="w-full h-48 object-cover"
            />
          </div>
        </CardContent>
      </Card>

      {/* Daily Itinerary */}
      {itinerary.itinerary.slice(0, 1).map((day, dayIndex) => (
        <Card key={dayIndex} className="trip-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900">{day.day}</CardTitle>
              <Badge variant="secondary" className="text-sm text-gray-500">
                {day.date}
              </Badge>
            </div>
            <p className="text-gray-600">{day.summary}</p>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {day.activities.map((activity, activityIndex) => (
                <div key={activityIndex}>
                  <div className="flex items-start space-x-4">
                    <div className={`activity-time-circle ${getTimeSlotClass(activity.time)}`}>
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-2">{activity.title}</h5>
                      <p className="text-gray-600 mb-3">{activity.reason}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          {activity.title.includes('must-see') || activity.reason.includes('must-see') ? (
                            <>
                              <Star className="mr-1 h-4 w-4" />
                              <span>Must-see attraction</span>
                            </>
                          ) : activity.title.toLowerCase().includes('dinner') || activity.title.toLowerCase().includes('restaurant') ? (
                            <>
                              <Utensils className="mr-1 h-4 w-4" />
                              <span>Recommended dining</span>
                            </>
                          ) : (
                            <>
                              <Info className="mr-1 h-4 w-4" />
                              <span>Curated experience</span>
                            </>
                          )}
                        </div>
                        {activity.action && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-primary text-white hover:bg-primary/90 border-primary"
                            onClick={() => window.open(activity.action!.url, '_blank')}
                          >
                            <ExternalLink className="mr-1 h-4 w-4" />
                            {activity.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {activityIndex < day.activities.length - 1 && (
                    <Separator className="my-6" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* More Days Preview */}
      {itinerary.itinerary.length > 1 && (
        <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-dashed border-gray-200">
          <CardContent className="pt-8 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900">
                {itinerary.itinerary.length - 1} More Amazing Days
              </h4>
              <p className="text-gray-600">Complete itinerary with activities, meals, and experiences</p>
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90">
              <Eye className="mr-2 h-4 w-4" />
              View Complete Itinerary
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function getDestinationImage(destination: string): string {
  const images: Record<string, string> = {
    'Bali': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300',
    'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300',
    'Paris': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300',
    'Bangkok': 'https://images.unsplash.com/photo-1563492065-8ba135136cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300'
  };
  
  return images[destination] || images['Bali'];
}
