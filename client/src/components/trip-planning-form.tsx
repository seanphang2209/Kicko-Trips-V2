import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Loader2, MapPin, Calendar, Heart, Gauge, DollarSign, Users, Utensils, Star, Ban, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { generateItinerarySchema } from "@shared/schema";
import { TripFormData, DropdownData, GeneratedItinerary } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const formSchema = generateItinerarySchema;

interface TripPlanningFormProps {
  onItineraryGenerated: (itinerary: GeneratedItinerary) => void;
}

export default function TripPlanningForm({ onItineraryGenerated }: TripPlanningFormProps) {
  const { toast } = useToast();
  
  // Fetch dropdown data
  const { data: dropdownData, isLoading: isLoadingDropdowns } = useQuery<DropdownData>({
    queryKey: ['/api/dropdowns'],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
      tripType: [],
      pace: "Easy",
      budget: "Medium",
      groupType: "Couple",
      dietaryRestrictions: "None",
      mustSee: "",
      avoid: "",
    },
  });

  // Generate itinerary mutation
  const generateMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await apiRequest('POST', '/api/generate-itinerary', data);
      return await response.json();
    },
    onSuccess: (data: GeneratedItinerary) => {
      onItineraryGenerated(data);
      toast({
        title: "Itinerary Generated!",
        description: "Your personalized travel plan is ready.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
      console.error('Error generating itinerary:', error);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    generateMutation.mutate(data);
  };

  if (isLoadingDropdowns) {
    return (
      <Card className="trip-card">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="trip-card" id="trip-planning-form">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Create Your Itinerary</CardTitle>
        <p className="text-gray-600">Tell us about your dream trip and we'll create a personalized plan for you.</p>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Destination */}
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                    <MapPin className="mr-2 h-4 w-4 text-primary" />
                    Destination
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a destination" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dropdownData?.destinations.map((dest) => (
                        <SelectItem key={dest.value} value={dest.value}>
                          {dest.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      End Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Trip Type */}
            <FormField
              control={form.control}
              name="tripType"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                    <Heart className="mr-2 h-4 w-4 text-primary" />
                    Trip Type (Select all that apply)
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {dropdownData?.tripTypes.map((type) => (
                      <FormField
                        key={type.value}
                        control={form.control}
                        name="tripType"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(type.value)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), type.value]
                                    : field.value?.filter((value) => value !== type.value) || [];
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {type.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Pace & Budget */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                      <Gauge className="mr-2 h-4 w-4 text-primary" />
                      Pace
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dropdownData?.paces.map((pace) => (
                          <SelectItem key={pace.value} value={pace.value}>
                            {pace.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                      <DollarSign className="mr-2 h-4 w-4 text-primary" />
                      Budget
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dropdownData?.budgets.map((budget) => (
                          <SelectItem key={budget.value} value={budget.value}>
                            {budget.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Group Type & Dietary */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="groupType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                      <Users className="mr-2 h-4 w-4 text-primary" />
                      Group Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dropdownData?.groupTypes.map((group) => (
                          <SelectItem key={group.value} value={group.value}>
                            {group.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                      <Utensils className="mr-2 h-4 w-4 text-primary" />
                      Dietary Restrictions
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dropdownData?.dietaryRestrictions.map((dietary) => (
                          <SelectItem key={dietary.value} value={dietary.value}>
                            {dietary.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Must See & Avoid */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mustSee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                      <Star className="mr-2 h-4 w-4 text-primary" />
                      Must See (optional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Uluwatu Temple" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avoid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                      <Ban className="mr-2 h-4 w-4 text-primary" />
                      Avoid (optional)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Nightclubs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <Button 
              type="submit" 
              disabled={generateMutation.isPending}
              className="w-full bg-primary text-white hover:bg-primary/90 py-4 text-lg font-semibold shadow-lg"
            >
              {generateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Your Itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate My Itinerary
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
