import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, ChevronDown, ChevronUp, Users, BarChart, FileCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    direction: "up" | "down" | "neutral";
    value: string;
  };
  description?: string;
}

const MetricCard = ({ title, value, icon, trend, description }: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend.direction === "up" ? (
              <ChevronUp className="mr-1 h-4 w-4 text-emerald-500" />
            ) : trend.direction === "down" ? (
              <ChevronDown className="mr-1 h-4 w-4 text-red-500" />
            ) : null}
            <span className={cn(
              trend.direction === "up" && "text-emerald-500",
              trend.direction === "down" && "text-red-500"
            )}>
              {trend.value}
            </span>
            <span className="ml-1">{description}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardMetricsProps {
  metrics: {
    totalEmployees: number;
    totalActivities: number;
    adoptionRate: number;
    pendingRecommendations: number;
    successRate: number;
  };
}

const DashboardMetrics = ({ metrics }: DashboardMetricsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Employees"
        value={metrics.totalEmployees}
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        title="Adoption Rate"
        value={`${metrics.adoptionRate}%`}
        icon={<BarChart className="h-4 w-4" />}
        trend={{ direction: "up", value: "2.5%" }}
        description="from last month"
      />
      <MetricCard
        title="Success Rate"
        value={`${metrics.successRate}%`}
        icon={<BadgeCheck className="h-4 w-4" />}
        trend={{ direction: "up", value: "1.2%" }}
        description="from last month"
      />
      <MetricCard
        title="Pending Recommendations"
        value={metrics.pendingRecommendations}
        icon={<FileCheck className="h-4 w-4" />}
        trend={{ direction: "down", value: "3" }}
        description="from last week"
      />
    </div>
  );
};

export default DashboardMetrics;
