import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema from the existing code
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// New schemas for our application

// Waitlist subscribers
export const waitlistSubscribers = pgTable("waitlist_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertWaitlistSchema = createInsertSchema(waitlistSubscribers).pick({
  email: true,
});

export type InsertWaitlistSubscriber = z.infer<typeof insertWaitlistSchema>;
export type WaitlistSubscriber = typeof waitlistSubscribers.$inferSelect;

// Departments for organization structure
export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const insertDepartmentSchema = createInsertSchema(departments).pick({
  name: true,
});

export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type Department = typeof departments.$inferSelect;

// Technologies being tracked
export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export const insertTechnologySchema = createInsertSchema(technologies).pick({
  name: true, 
  description: true,
});

export type InsertTechnology = z.infer<typeof insertTechnologySchema>;
export type Technology = typeof technologies.$inferSelect;

// Employee records
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  departmentId: integer("department_id").notNull(),
});

export const insertEmployeeSchema = createInsertSchema(employees).pick({
  name: true,
  email: true,
  departmentId: true,
});

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;

// User activity tracking
export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  technologyId: integer("technology_id").notNull(),
  featureUsed: text("feature_used").notNull(),
  usageCount: integer("usage_count").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  successful: boolean("successful").notNull(),
});

export const insertUserActivitySchema = createInsertSchema(userActivities).pick({
  employeeId: true,
  technologyId: true,
  featureUsed: true,
  usageCount: true,
  successful: true,
});

export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;
export type UserActivity = typeof userActivities.$inferSelect;

// Training recommendations
export const trainingRecommendations = pgTable("training_recommendations", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  technologyId: integer("technology_id").notNull(),
  recommendationType: text("recommendation_type").notNull(),
  description: text("description").notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTrainingRecommendationSchema = createInsertSchema(trainingRecommendations).pick({
  employeeId: true,
  technologyId: true,
  recommendationType: true,
  description: true,
});

export type InsertTrainingRecommendation = z.infer<typeof insertTrainingRecommendationSchema>;
export type TrainingRecommendation = typeof trainingRecommendations.$inferSelect;

// Analytics data (aggregate metrics)
export const analyticsData = pgTable("analytics_data", {
  id: serial("id").primaryKey(),
  departmentId: integer("department_id"),
  technologyId: integer("technology_id").notNull(),
  metricName: text("metric_name").notNull(),
  metricValue: json("metric_value").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertAnalyticsDataSchema = createInsertSchema(analyticsData).pick({
  departmentId: true,
  technologyId: true,
  metricName: true,
  metricValue: true,
});

export type InsertAnalyticsData = z.infer<typeof insertAnalyticsDataSchema>;
export type AnalyticsData = typeof analyticsData.$inferSelect;
