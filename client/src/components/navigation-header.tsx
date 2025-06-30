import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

export default function NavigationHeader() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary flex items-center">
                <Plane className="mr-2 h-6 w-6" />
                Kicko Trips
              </h1>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">My Trips</a>
              <a href="#" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Support</a>
              <Button className="bg-primary text-white hover:bg-primary/90">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
