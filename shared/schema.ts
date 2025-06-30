import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  destination: text("destination").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  tripType: text("trip_type").array().notNull(),
  pace: text("pace").notNull(),
  budget: text("budget").notNull(),
  groupType: text("group_type").notNull(),
  dietaryRestrictions: text("dietary_restrictions"),
  mustSee: text("must_see"),
  avoid: text("avoid"),
  generatedItinerary: jsonb("generated_itinerary").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Form validation schemas
export const generateItinerarySchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  tripType: z.array(z.string()).min(1, "At least one trip type is required"),
  pace: z.enum(["Easy", "Moderate", "Fast"]),
  budget: z.enum(["Budget", "Medium", "Luxury"]),
  groupType: z.enum(["Solo", "Couple", "Family", "Friends"]),
  dietaryRestrictions: z.string().optional().transform(val => val === "None" ? undefined : val),
  mustSee: z.string().optional(),
  avoid: z.string().optional(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GenerateItineraryRequest = z.infer<typeof generateItinerarySchema>;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;
export type Itinerary = typeof itineraries.$inferSelect;
