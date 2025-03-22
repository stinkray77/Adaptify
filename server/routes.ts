import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertWaitlistSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // API error handler helper
  function handleErrors(res: any, error: unknown) {
    console.error('API error:', error);
    
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return res.status(400).json({ error: validationError.message });
    }
    
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }

  // Waitlist API routes
  app.post('/api/waitlist', async (req, res) => {
    try {
      const data = insertWaitlistSchema.parse(req.body);
      const subscriber = await storage.addToWaitlist(data);
      return res.status(201).json(subscriber);
    } catch (error) {
      return handleErrors(res, error);
    }
  });
  
  app.get('/api/waitlist', async (req, res) => {
    try {
      const subscribers = await storage.getWaitlistSubscribers();
      return res.json(subscribers);
    } catch (error) {
      return handleErrors(res, error);
    }
  });

  // Department API routes
  app.get('/api/departments', async (req, res) => {
    try {
      const departments = await storage.getDepartments();
      return res.json(departments);
    } catch (error) {
      return handleErrors(res, error);
    }
  });
  
  app.get('/api/departments/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid department ID' });
      }
      
      const department = await storage.getDepartmentById(id);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
      
      return res.json(department);
    } catch (error) {
      return handleErrors(res, error);
    }
  });

  // Technology API routes
  app.get('/api/technologies', async (req, res) => {
    try {
      const technologies = await storage.getTechnologies();
      return res.json(technologies);
    } catch (error) {
      return handleErrors(res, error);
    }
  });
  
  app.get('/api/technologies/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid technology ID' });
      }
      
      const technology = await storage.getTechnologyById(id);
      if (!technology) {
        return res.status(404).json({ error: 'Technology not found' });
      }
      
      return res.json(technology);
    } catch (error) {
      return handleErrors(res, error);
    }
  });

  // Employee API routes
  app.get('/api/employees', async (req, res) => {
    try {
      const departmentId = req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined;
      
      if (departmentId !== undefined) {
        if (isNaN(departmentId)) {
          return res.status(400).json({ error: 'Invalid department ID' });
        }
        
        const employees = await storage.getEmployeesByDepartment(departmentId);
        return res.json(employees);
      }
      
      const employees = await storage.getEmployees();
      return res.json(employees);
    } catch (error) {
      return handleErrors(res, error);
    }
  });
  
  app.get('/api/employees/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid employee ID' });
      }
      
      const employee = await storage.getEmployeeById(id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      
      return res.json(employee);
    } catch (error) {
      return handleErrors(res, error);
    }
  });

  // User Activity API routes
  app.get('/api/activities', async (req, res) => {
    try {
      const employeeId = req.query.employeeId ? parseInt(req.query.employeeId as string) : undefined;
      const technologyId = req.query.technologyId ? parseInt(req.query.technologyId as string) : undefined;
      const departmentId = req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined;
      
      if (employeeId !== undefined) {
        if (isNaN(employeeId)) {
          return res.status(400).json({ error: 'Invalid employee ID' });
        }
        
        const activities = await storage.getUserActivitiesByEmployee(employeeId);
        return res.json(activities);
      }
      
      if (technologyId !== undefined) {
        if (isNaN(technologyId)) {
          return res.status(400).json({ error: 'Invalid technology ID' });
        }
        
        const activities = await storage.getUserActivitiesByTechnology(technologyId);
        return res.json(activities);
      }
      
      if (departmentId !== undefined) {
        if (isNaN(departmentId)) {
          return res.status(400).json({ error: 'Invalid department ID' });
        }
        
        const activities = await storage.getUserActivitiesByDepartment(departmentId);
        return res.json(activities);
      }
      
      const activities = await storage.getUserActivities();
      return res.json(activities);
    } catch (error) {
      return handleErrors(res, error);
    }
  });

  // Training Recommendation API routes
  app.get('/api/recommendations', async (req, res) => {
    try {
      const employeeId = req.query.employeeId ? parseInt(req.query.employeeId as string) : undefined;
      
      if (employeeId !== undefined) {
        if (isNaN(employeeId)) {
          return res.status(400).json({ error: 'Invalid employee ID' });
        }
        
        const recommendations = await storage.getTrainingRecommendationsByEmployee(employeeId);
        return res.json(recommendations);
      }
      
      const recommendations = await storage.getTrainingRecommendations();
      return res.json(recommendations);
    } catch (error) {
      return handleErrors(res, error);
    }
  });
  
  app.patch('/api/recommendations/:id/complete', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid recommendation ID' });
      }
      
      const recommendation = await storage.completeTrainingRecommendation(id);
      if (!recommendation) {
        return res.status(404).json({ error: 'Recommendation not found' });
      }
      
      return res.json(recommendation);
    } catch (error) {
      return handleErrors(res, error);
    }
  });

  // Analytics API routes
  app.get('/api/analytics', async (req, res) => {
    try {
      const departmentId = req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined;
      const technologyId = req.query.technologyId ? parseInt(req.query.technologyId as string) : undefined;
      
      if (departmentId !== undefined) {
        if (isNaN(departmentId)) {
          return res.status(400).json({ error: 'Invalid department ID' });
        }
        
        const analytics = await storage.getAnalyticsDataByDepartment(departmentId);
        return res.json(analytics);
      }
      
      if (technologyId !== undefined) {
        if (isNaN(technologyId)) {
          return res.status(400).json({ error: 'Invalid technology ID' });
        }
        
        const analytics = await storage.getAnalyticsDataByTechnology(technologyId);
        return res.json(analytics);
      }
      
      const analytics = await storage.getAnalyticsData();
      return res.json(analytics);
    } catch (error) {
      return handleErrors(res, error);
    }
  });

  // Dashboard summary API route
  app.get('/api/dashboard/summary', async (req, res) => {
    try {
      // Get high level summary stats for the dashboard
      const [
        departments,
        technologies,
        employees,
        activities,
        recommendations,
        analytics
      ] = await Promise.all([
        storage.getDepartments(),
        storage.getTechnologies(),
        storage.getEmployees(),
        storage.getUserActivities(),
        storage.getTrainingRecommendations(),
        storage.getAnalyticsData()
      ]);
      
      // Calculate adoption rate by technology
      const adoptionByTechnology: Record<string, any> = {};
      for (const tech of technologies) {
        const analyticsForTech = analytics.filter(a => a.technologyId === tech.id && a.metricName === "adoption_rate");
        if (analyticsForTech.length > 0) {
          const overallAdoption = analyticsForTech.find(a => !a.departmentId);
          adoptionByTechnology[tech.name] = overallAdoption?.metricValue || { value: 0, unit: "percent", trend: "neutral" };
        }
      }
      
      // Calculate adoption rate by department
      const adoptionByDepartment: Record<string, any> = {};
      for (const dept of departments) {
        const analyticsForDept = analytics.filter(a => a.departmentId === dept.id && a.metricName === "adoption_rate");
        if (analyticsForDept.length > 0) {
          const avgAdoption = analyticsForDept.reduce((sum, a) => sum + (a.metricValue as any).value, 0) / analyticsForDept.length;
          adoptionByDepartment[dept.name] = {
            value: Math.round(avgAdoption),
            unit: "percent",
            trend: Math.random() > 0.5 ? "up" : "down" // Random for demonstration
          };
        }
      }
      
      // Calculate success rate (successful vs failed activities)
      const successfulActivities = activities.filter(a => a.successful).length;
      const successRate = activities.length > 0 ? (successfulActivities / activities.length) * 100 : 0;
      
      // Calculate feature usage
      const featureUsage: Record<string, number> = {};
      activities.forEach(activity => {
        featureUsage[activity.featureUsed] = (featureUsage[activity.featureUsed] || 0) + activity.usageCount;
      });
      
      // Sort features by usage
      const sortedFeatures = Object.entries(featureUsage)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
      
      // Calculate recommended training by type
      const trainingByType: Record<string, number> = {};
      recommendations.forEach(rec => {
        trainingByType[rec.recommendationType] = (trainingByType[rec.recommendationType] || 0) + 1;
      });
      
      return res.json({
        counts: {
          departments: departments.length,
          technologies: technologies.length,
          employees: employees.length,
          activities: activities.length,
          recommendations: recommendations.length
        },
        adoptionByTechnology,
        adoptionByDepartment,
        successRate: {
          value: Math.round(successRate),
          unit: "percent",
          trend: "up" // For demonstration
        },
        featureUsage: sortedFeatures,
        trainingByType,
        recentActivities: activities
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 10),
        pendingRecommendations: recommendations
          .filter(r => !r.isCompleted)
          .slice(0, 10)
      });
    } catch (error) {
      return handleErrors(res, error);
    }
  });

  return httpServer;
}
