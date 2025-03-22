import { useEffect } from "react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WaitlistSuccess = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16 px-4 flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-neutral mb-2">You're on the list!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for joining our waitlist. We'll notify you as soon as InsightAdopt is ready for early access.
            </p>
            
            <div className="space-y-4 w-full">
              <Button asChild className="w-full">
                <Link href="/dashboard">Explore Demo Dashboard</Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Return to Homepage</Link>
              </Button>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-6 w-full">
              <p className="text-sm text-gray-500">
                Have any questions? Contact us at <a href="mailto:support@insightadopt.com" className="text-primary hover:underline">support@insightadopt.com</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default WaitlistSuccess;
