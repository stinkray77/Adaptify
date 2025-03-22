import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Play, Book, Video, Users, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Recommendation {
  id: number;
  employeeId: number;
  technologyId: number;
  recommendationType: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
}

interface RecommendationsProps {
  recommendations: Recommendation[];
  employeesMap: Record<number, string>;
  technologiesMap: Record<number, string>;
}

const RecommendationTypeIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case "video tutorial":
      return <Video className="h-4 w-4" />;
    case "interactive guide":
      return <Play className="h-4 w-4" />;
    case "hands-on workshop":
      return <Users className="h-4 w-4" />;
    case "documentation review":
      return <FileText className="h-4 w-4" />;
    case "peer training":
      return <Users className="h-4 w-4" />;
    default:
      return <Book className="h-4 w-4" />;
  }
};

const Recommendations = ({ recommendations, employeesMap, technologiesMap }: RecommendationsProps) => {
  const [completingIds, setCompletingIds] = useState<number[]>([]);
  const { toast } = useToast();

  const handleComplete = async (id: number) => {
    setCompletingIds((prev) => [...prev, id]);
    
    try {
      await apiRequest("PATCH", `/api/recommendations/${id}/complete`, {});
      
      // Invalidate cache to refresh data
      await queryClient.invalidateQueries({ queryKey: ['/api/dashboard/summary'] });
      
      toast({
        title: "Recommendation completed",
        description: "The training recommendation has been marked as completed.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error completing recommendation:", error);
      toast({
        title: "Error",
        description: "Failed to complete the recommendation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setCompletingIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Training Recommendations</CardTitle>
        <CardDescription>Targeted recommendations based on user activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">
              No pending recommendations at this time
            </div>
          ) : (
            recommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className={cn(
                  "p-4 border rounded-lg",
                  recommendation.isCompleted ? "bg-gray-50" : "bg-white"
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium flex items-center gap-1">
                      <RecommendationTypeIcon type={recommendation.recommendationType} />
                      <span>{recommendation.recommendationType}</span>
                      <Badge variant="outline" className="ml-2">
                        {technologiesMap[recommendation.technologyId] || "Unknown Technology"}
                      </Badge>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      For: {employeesMap[recommendation.employeeId] || "Unknown Employee"}
                    </p>
                    <p className="mt-2">{recommendation.description}</p>
                  </div>
                  <div>
                    {recommendation.isCompleted ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <Check className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleComplete(recommendation.id)}
                        disabled={completingIds.includes(recommendation.id)}
                      >
                        {completingIds.includes(recommendation.id) ? "Completing..." : "Mark Complete"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;
