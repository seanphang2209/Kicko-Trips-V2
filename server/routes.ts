import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateItinerarySchema } from "@shared/schema";
import { generateItinerary } from "./utils/aiLogic";
import { getDropdownData } from "./utils/sampleData";
import cors from "cors";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable CORS for frontend connection
  app.use(cors({
    origin: true,
    credentials: true
  }));

  // GET /api/dropdowns - Returns metadata for dynamic dropdowns
  app.get("/api/dropdowns", async (req, res) => {
    try {
      const dropdownData = await getDropdownData();
      res.json(dropdownData);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
      res.status(500).json({ error: "Failed to fetch dropdown data" });
    }
  });

  // POST /api/generate-itinerary - Accepts user input and returns personalized itinerary
  app.post("/api/generate-itinerary", async (req, res) => {
    try {
      // Validate request body
      const validationResult = generateItinerarySchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: validationResult.error.errors
        });
      }

      const tripRequest = validationResult.data;

      // Generate itinerary using AI logic
      const generatedItinerary = await generateItinerary(tripRequest);

      // Store the itinerary (optional - for future user accounts)
      const itineraryRecord = await storage.createItinerary({
        userId: null, // Anonymous for now
        destination: tripRequest.destination,
        startDate: tripRequest.startDate,
        endDate: tripRequest.endDate,
        tripType: tripRequest.tripType,
        pace: tripRequest.pace,
        budget: tripRequest.budget,
        groupType: tripRequest.groupType,
        dietaryRestrictions: tripRequest.dietaryRestrictions || null,
        mustSee: tripRequest.mustSee || null,
        avoid: tripRequest.avoid || null,
        generatedItinerary,
      });

      res.json(generatedItinerary);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      res.status(500).json({ error: "Failed to generate itinerary" });
    }
  });

  // GET /api/itinerary/:id - Get specific itinerary by ID
  app.get("/api/itinerary/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itinerary = await storage.getItineraryById(id);
      
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      res.json(itinerary.generatedItinerary);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      res.status(500).json({ error: "Failed to fetch itinerary" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
