import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardMetrics from "@/components/ui/dashboard-metrics";
import ActivityChart from "@/components/ui/activity-chart";
import DepartmentChart from "@/components/ui/department-chart";
import Recommendations from "@/components/ui/recommendations";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedTechnology, setSelectedTechnology] = useState<string>("all");
  
  // Fetch dashboard summary data
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/dashboard/summary'],
    staleTime: 60000, // 1 minute
  });

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load dashboard data. Please refresh the page or try again later.
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  // Create activity chart data
  const getActivityChartData = () => {
    if (!data) return [];

    // Sample data for the activity chart (in a real app, this would come from the API)
    return [
      { name: "Dashboard", successful: 250, failed: 30 },
      { name: "Reports", successful: 180, failed: 40 },
      { name: "Configuration", successful: 120, failed: 60 },
      { name: "Search", successful: 200, failed: 20 },
      { name: "Export", successful: 150, failed: 35 }
    ];
  };

  // Create department chart data
  const getDepartmentChartData = () => {
    if (!data || !data.adoptionByDepartment) return [];

    return Object.entries(data.adoptionByDepartment).map(([name, stats]: [string, any]) => ({
      name,
      value: stats.value
    }));
  };

  // Map employee IDs to names and technology IDs to names for recommendations
  const getEmployeesMap = () => {
    // In a real app, this would be fetched from the API
    return {
      1: "John Smith",
      2: "Sarah Johnson",
      3: "Michael Brown",
      4: "Emily Davis",
      5: "David Wilson",
      6: "Jennifer Lee",
      7: "Robert Taylor",
      8: "Lisa Martinez",
      9: "James Anderson",
      10: "Patricia Thomas"
    };
  };

  const getTechnologiesMap = () => {
    // In a real app, this would be fetched from the API
    return {
      1: "CRM System",
      2: "ERP Solution",
      3: "Collaboration Tools",
      4: "Data Analytics Platform"
    };
  };

  // Loading skeleton for the dashboard
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-6">
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-6 w-full max-w-2xl" />
          </div>
          
          <div className="mb-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="col-span-2">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-80 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-80 w-full" />
              </CardContent>
            </Card>
          </div>
          
          <Card className="col-span-2 mb-8">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-4 w-32 mb-3" />
                        <Skeleton className="h-4 w-full max-w-md" />
                      </div>
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral mb-2">Technology Adoption Dashboard</h1>
          <p className="text-gray-500 max-w-3xl">
            Monitor user activity, track adoption rates, and identify training opportunities across your organization.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedTechnology} onValueChange={setSelectedTechnology}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Technologies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Technologies</SelectItem>
              <SelectItem value="crm">CRM System</SelectItem>
              <SelectItem value="erp">ERP Solution</SelectItem>
              <SelectItem value="collab">Collaboration Tools</SelectItem>
              <SelectItem value="analytics">Data Analytics Platform</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="technologies">Technologies</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            {/* Dashboard Metrics */}
            <DashboardMetrics 
              metrics={{
                totalEmployees: data?.counts?.employees || 0,
                totalActivities: data?.counts?.activities || 0,
                adoptionRate: data?.successRate?.value || 0,
                pendingRecommendations: data?.counts?.recommendations || 0,
                successRate: data?.successRate?.value || 0
              }} 
            />
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
              {/* Activity Chart */}
              <ActivityChart 
                data={getActivityChartData()} 
                title="Feature Usage" 
                description="Successful vs. failed interactions by feature"
              />
              
              {/* Department Chart */}
              <DepartmentChart 
                data={getDepartmentChartData()} 
                title="Adoption by Department" 
                description="Percent of successful technology adoption"
              />
            </div>
            
            {/* Training Recommendations */}
            <div className="mt-6">
              <Recommendations 
                recommendations={data?.pendingRecommendations || []}
                employeesMap={getEmployeesMap()}
                technologiesMap={getTechnologiesMap()}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Proficiency</CardTitle>
                <CardDescription>Individual user performance and adoption metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>User proficiency details would be shown here in a production application.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="technologies">
            <Card>
              <CardHeader>
                <CardTitle>Technology Adoption</CardTitle>
                <CardDescription>Adoption metrics by technology</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Technology adoption details would be shown here in a production application.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Management</CardTitle>
                <CardDescription>Manage and track training recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Training management details would be shown here in a production application.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
