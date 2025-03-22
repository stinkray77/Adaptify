import { 
  users, type User, type InsertUser,
  waitlistSubscribers, type WaitlistSubscriber, type InsertWaitlistSubscriber,
  departments, type Department, type InsertDepartment,
  technologies, type Technology, type InsertTechnology,
  employees, type Employee, type InsertEmployee,
  userActivities, type UserActivity, type InsertUserActivity,
  trainingRecommendations, type TrainingRecommendation, type InsertTrainingRecommendation,
  analyticsData, type AnalyticsData, type InsertAnalyticsData
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist operations
  addToWaitlist(email: InsertWaitlistSubscriber): Promise<WaitlistSubscriber>;
  getWaitlistSubscribers(): Promise<WaitlistSubscriber[]>;
  
  // Department operations
  createDepartment(department: InsertDepartment): Promise<Department>;
  getDepartments(): Promise<Department[]>;
  getDepartmentById(id: number): Promise<Department | undefined>;
  
  // Technology operations
  createTechnology(technology: InsertTechnology): Promise<Technology>;
  getTechnologies(): Promise<Technology[]>;
  getTechnologyById(id: number): Promise<Technology | undefined>;
  
  // Employee operations
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  getEmployees(): Promise<Employee[]>;
  getEmployeeById(id: number): Promise<Employee | undefined>;
  getEmployeesByDepartment(departmentId: number): Promise<Employee[]>;
  
  // User Activity operations
  createUserActivity(activity: InsertUserActivity): Promise<UserActivity>;
  getUserActivities(): Promise<UserActivity[]>;
  getUserActivitiesByEmployee(employeeId: number): Promise<UserActivity[]>;
  getUserActivitiesByTechnology(technologyId: number): Promise<UserActivity[]>;
  getUserActivitiesByDepartment(departmentId: number): Promise<UserActivity[]>;
  
  // Training Recommendation operations
  createTrainingRecommendation(recommendation: InsertTrainingRecommendation): Promise<TrainingRecommendation>;
  getTrainingRecommendations(): Promise<TrainingRecommendation[]>;
  getTrainingRecommendationsByEmployee(employeeId: number): Promise<TrainingRecommendation[]>;
  completeTrainingRecommendation(id: number): Promise<TrainingRecommendation | undefined>;
  
  // Analytics operations
  createAnalyticsData(data: InsertAnalyticsData): Promise<AnalyticsData>;
  getAnalyticsData(): Promise<AnalyticsData[]>;
  getAnalyticsDataByDepartment(departmentId: number): Promise<AnalyticsData[]>;
  getAnalyticsDataByTechnology(technologyId: number): Promise<AnalyticsData[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlistSubscribers: Map<number, WaitlistSubscriber>;
  private departments: Map<number, Department>;
  private technologies: Map<number, Technology>;
  private employees: Map<number, Employee>;
  private userActivities: Map<number, UserActivity>;
  private trainingRecommendations: Map<number, TrainingRecommendation>;
  private analyticsData: Map<number, AnalyticsData>;
  
  // ID counters for each entity
  private userIdCounter = 1;
  private waitlistIdCounter = 1;
  private departmentIdCounter = 1;
  private technologyIdCounter = 1;
  private employeeIdCounter = 1;
  private activityIdCounter = 1;
  private recommendationIdCounter = 1;
  private analyticsIdCounter = 1;

  constructor() {
    this.users = new Map();
    this.waitlistSubscribers = new Map();
    this.departments = new Map();
    this.technologies = new Map();
    this.employees = new Map();
    this.userActivities = new Map();
    this.trainingRecommendations = new Map();
    this.analyticsData = new Map();
    
    // Initialize with sample data
    this.initSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Waitlist methods
  async addToWaitlist(insertSubscriber: InsertWaitlistSubscriber): Promise<WaitlistSubscriber> {
    // Check for existing email
    const existingSubscriber = Array.from(this.waitlistSubscribers.values()).find(
      (subscriber) => subscriber.email === insertSubscriber.email
    );
    
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.waitlistIdCounter++;
    const subscriber: WaitlistSubscriber = { 
      ...insertSubscriber, 
      id, 
      createdAt: new Date() 
    };
    this.waitlistSubscribers.set(id, subscriber);
    return subscriber;
  }

  async getWaitlistSubscribers(): Promise<WaitlistSubscriber[]> {
    return Array.from(this.waitlistSubscribers.values());
  }

  // Department methods
  async createDepartment(insertDepartment: InsertDepartment): Promise<Department> {
    const id = this.departmentIdCounter++;
    const department: Department = { ...insertDepartment, id };
    this.departments.set(id, department);
    return department;
  }

  async getDepartments(): Promise<Department[]> {
    return Array.from(this.departments.values());
  }

  async getDepartmentById(id: number): Promise<Department | undefined> {
    return this.departments.get(id);
  }

  // Technology methods
  async createTechnology(insertTechnology: InsertTechnology): Promise<Technology> {
    const id = this.technologyIdCounter++;
    const technology: Technology = { ...insertTechnology, id };
    this.technologies.set(id, technology);
    return technology;
  }

  async getTechnologies(): Promise<Technology[]> {
    return Array.from(this.technologies.values());
  }

  async getTechnologyById(id: number): Promise<Technology | undefined> {
    return this.technologies.get(id);
  }

  // Employee methods
  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
    const id = this.employeeIdCounter++;
    const employee: Employee = { ...insertEmployee, id };
    this.employees.set(id, employee);
    return employee;
  }

  async getEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }

  async getEmployeeById(id: number): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async getEmployeesByDepartment(departmentId: number): Promise<Employee[]> {
    return Array.from(this.employees.values()).filter(
      (employee) => employee.departmentId === departmentId
    );
  }

  // User Activity methods
  async createUserActivity(insertActivity: InsertUserActivity): Promise<UserActivity> {
    const id = this.activityIdCounter++;
    const activity: UserActivity = { 
      ...insertActivity, 
      id, 
      timestamp: new Date()
    };
    this.userActivities.set(id, activity);
    return activity;
  }

  async getUserActivities(): Promise<UserActivity[]> {
    return Array.from(this.userActivities.values());
  }

  async getUserActivitiesByEmployee(employeeId: number): Promise<UserActivity[]> {
    return Array.from(this.userActivities.values()).filter(
      (activity) => activity.employeeId === employeeId
    );
  }

  async getUserActivitiesByTechnology(technologyId: number): Promise<UserActivity[]> {
    return Array.from(this.userActivities.values()).filter(
      (activity) => activity.technologyId === technologyId
    );
  }

  async getUserActivitiesByDepartment(departmentId: number): Promise<UserActivity[]> {
    const departmentEmployees = await this.getEmployeesByDepartment(departmentId);
    const employeeIds = departmentEmployees.map(employee => employee.id);
    
    return Array.from(this.userActivities.values()).filter(
      (activity) => employeeIds.includes(activity.employeeId)
    );
  }

  // Training Recommendation methods
  async createTrainingRecommendation(insertRecommendation: InsertTrainingRecommendation): Promise<TrainingRecommendation> {
    const id = this.recommendationIdCounter++;
    const recommendation: TrainingRecommendation = { 
      ...insertRecommendation, 
      id, 
      isCompleted: false, 
      createdAt: new Date()
    };
    this.trainingRecommendations.set(id, recommendation);
    return recommendation;
  }

  async getTrainingRecommendations(): Promise<TrainingRecommendation[]> {
    return Array.from(this.trainingRecommendations.values());
  }

  async getTrainingRecommendationsByEmployee(employeeId: number): Promise<TrainingRecommendation[]> {
    return Array.from(this.trainingRecommendations.values()).filter(
      (recommendation) => recommendation.employeeId === employeeId
    );
  }

  async completeTrainingRecommendation(id: number): Promise<TrainingRecommendation | undefined> {
    const recommendation = this.trainingRecommendations.get(id);
    if (!recommendation) return undefined;
    
    const updatedRecommendation = { ...recommendation, isCompleted: true };
    this.trainingRecommendations.set(id, updatedRecommendation);
    return updatedRecommendation;
  }

  // Analytics methods
  async createAnalyticsData(insertData: InsertAnalyticsData): Promise<AnalyticsData> {
    const id = this.analyticsIdCounter++;
    const data: AnalyticsData = { 
      ...insertData, 
      id, 
      timestamp: new Date()
    };
    this.analyticsData.set(id, data);
    return data;
  }

  async getAnalyticsData(): Promise<AnalyticsData[]> {
    return Array.from(this.analyticsData.values());
  }

  async getAnalyticsDataByDepartment(departmentId: number): Promise<AnalyticsData[]> {
    return Array.from(this.analyticsData.values()).filter(
      (data) => data.departmentId === departmentId
    );
  }

  async getAnalyticsDataByTechnology(technologyId: number): Promise<AnalyticsData[]> {
    return Array.from(this.analyticsData.values()).filter(
      (data) => data.technologyId === technologyId
    );
  }

  // Initialize sample data for demonstration
  private async initSampleData() {
    // Sample departments
    const departments = [
      { name: "IT" },
      { name: "Marketing" },
      { name: "Sales" },
      { name: "Finance" },
      { name: "HR" }
    ];
    
    for (const dept of departments) {
      await this.createDepartment(dept);
    }
    
    // Sample technologies
    const technologies = [
      { name: "CRM System", description: "Customer relationship management software" },
      { name: "ERP Solution", description: "Enterprise resource planning system" },
      { name: "Collaboration Tools", description: "Team communication and file sharing" },
      { name: "Data Analytics Platform", description: "Business intelligence and reporting" }
    ];
    
    for (const tech of technologies) {
      await this.createTechnology(tech);
    }
    
    // Sample employees
    const employees = [
      { name: "John Smith", email: "john@example.com", departmentId: 1 },
      { name: "Sarah Johnson", email: "sarah@example.com", departmentId: 1 },
      { name: "Michael Brown", email: "michael@example.com", departmentId: 2 },
      { name: "Emily Davis", email: "emily@example.com", departmentId: 2 },
      { name: "David Wilson", email: "david@example.com", departmentId: 3 },
      { name: "Jennifer Lee", email: "jennifer@example.com", departmentId: 3 },
      { name: "Robert Taylor", email: "robert@example.com", departmentId: 4 },
      { name: "Lisa Martinez", email: "lisa@example.com", departmentId: 4 },
      { name: "James Anderson", email: "james@example.com", departmentId: 5 },
      { name: "Patricia Thomas", email: "patricia@example.com", departmentId: 5 }
    ];
    
    for (const emp of employees) {
      await this.createEmployee(emp);
    }
    
    // Sample user activities
    const generateActivities = async () => {
      const features = [
        "Dashboard", "Reports", "Configuration", "Search", "Export", "Import", 
        "User Management", "Settings", "Notifications", "Calendar"
      ];
      
      // Generate random activities for each employee
      for (let empId = 1; empId <= employees.length; empId++) {
        // Each employee uses 1-2 technologies
        const techCount = 1 + Math.floor(Math.random() * 2);
        
        for (let t = 0; t < techCount; t++) {
          const techId = 1 + Math.floor(Math.random() * technologies.length);
          
          // Each employee has 10-20 activities per technology
          const activityCount = 10 + Math.floor(Math.random() * 11);
          
          for (let a = 0; a < activityCount; a++) {
            const featureIndex = Math.floor(Math.random() * features.length);
            const usageCount = 1 + Math.floor(Math.random() * 10);
            const successful = Math.random() > 0.3; // 70% success rate
            
            await this.createUserActivity({
              employeeId: empId,
              technologyId: techId,
              featureUsed: features[featureIndex],
              usageCount,
              successful
            });
          }
        }
      }
    };
    
    // Sample training recommendations
    const generateRecommendations = async () => {
      const recommendationTypes = [
        "Video Tutorial", "Interactive Guide", "Hands-on Workshop", 
        "Documentation Review", "Peer Training"
      ];
      
      const descriptions = [
        "Learn the basics of using the reporting features",
        "Advanced data visualization techniques",
        "Efficient workflow configuration",
        "Best practices for data management",
        "Collaboration features deep dive",
        "Security and permissions overview",
        "Integration with other systems"
      ];
      
      // Generate 1-2 recommendations for each employee
      for (let empId = 1; empId <= employees.length; empId++) {
        const recommendationCount = 1 + Math.floor(Math.random() * 2);
        
        for (let r = 0; r < recommendationCount; r++) {
          const techId = 1 + Math.floor(Math.random() * technologies.length);
          const typeIndex = Math.floor(Math.random() * recommendationTypes.length);
          const descIndex = Math.floor(Math.random() * descriptions.length);
          
          await this.createTrainingRecommendation({
            employeeId: empId,
            technologyId: techId,
            recommendationType: recommendationTypes[typeIndex],
            description: descriptions[descIndex]
          });
        }
      }
    };
    
    // Sample analytics data
    const generateAnalytics = async () => {
      const metricNames = [
        "adoption_rate", "proficiency_score", "feature_usage", 
        "completion_rate", "time_spent"
      ];
      
      // Generate department-level analytics
      for (let deptId = 1; deptId <= departments.length; deptId++) {
        for (let techId = 1; techId <= technologies.length; techId++) {
          for (const metric of metricNames) {
            let metricValue;
            
            switch (metric) {
              case "adoption_rate":
                // Percentage between 50-95%
                metricValue = { 
                  value: 50 + Math.floor(Math.random() * 46),
                  unit: "percent",
                  trend: Math.random() > 0.5 ? "up" : "down"
                };
                break;
              case "proficiency_score":
                // Score between 1-10
                metricValue = {
                  value: 1 + Math.floor(Math.random() * 10),
                  unit: "score",
                  trend: Math.random() > 0.5 ? "up" : "down"
                };
                break;
              case "feature_usage":
                // Counts of features used
                metricValue = {
                  features: {
                    "Dashboard": 50 + Math.floor(Math.random() * 100),
                    "Reports": 30 + Math.floor(Math.random() * 80),
                    "Configuration": 10 + Math.floor(Math.random() * 40),
                    "Search": 40 + Math.floor(Math.random() * 90),
                    "Export": 20 + Math.floor(Math.random() * 60)
                  },
                  total: 200 + Math.floor(Math.random() * 300)
                };
                break;
              case "completion_rate":
                // Percentage between 30-100%
                metricValue = {
                  value: 30 + Math.floor(Math.random() * 71),
                  unit: "percent",
                  trend: Math.random() > 0.5 ? "up" : "down"
                };
                break;
              case "time_spent":
                // Minutes spent using the technology
                metricValue = {
                  value: 10 + Math.floor(Math.random() * 120),
                  unit: "minutes",
                  trend: Math.random() > 0.5 ? "up" : "down"
                };
                break;
            }
            
            await this.createAnalyticsData({
              departmentId: deptId,
              technologyId: techId,
              metricName: metric,
              metricValue
            });
          }
        }
      }
      
      // Generate technology-level analytics (without department)
      for (let techId = 1; techId <= technologies.length; techId++) {
        for (const metric of metricNames) {
          let metricValue;
          
          switch (metric) {
            case "adoption_rate":
              metricValue = { 
                value: 50 + Math.floor(Math.random() * 46),
                unit: "percent",
                trend: Math.random() > 0.5 ? "up" : "down"
              };
              break;
            case "feature_usage":
              metricValue = {
                features: {
                  "Dashboard": 150 + Math.floor(Math.random() * 300),
                  "Reports": 120 + Math.floor(Math.random() * 250),
                  "Configuration": 80 + Math.floor(Math.random() * 120),
                  "Search": 140 + Math.floor(Math.random() * 280),
                  "Export": 110 + Math.floor(Math.random() * 220)
                },
                total: 600 + Math.floor(Math.random() * 1000)
              };
              break;
            default:
              metricValue = {
                value: Math.floor(Math.random() * 100),
                unit: metric === "proficiency_score" ? "score" : "percent",
                trend: Math.random() > 0.5 ? "up" : "down"
              };
          }
          
          await this.createAnalyticsData({
            departmentId: undefined,
            technologyId: techId,
            metricName: metric,
            metricValue
          });
        }
      }
    };
    
    await generateActivities();
    await generateRecommendations();
    await generateAnalytics();
  }
}

export const storage = new MemStorage();
