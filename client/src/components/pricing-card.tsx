import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
  periodText?: string;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  popular = false,
  ctaText,
  ctaLink,
  periodText = "/month"
}: PricingCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-lg overflow-hidden relative",
      popular && "border-2 border-primary transform scale-105"
    )}>
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg text-sm font-medium">
          Popular
        </div>
      )}
      <div className="px-6 py-8">
        <h3 className="text-2xl font-medium text-neutral text-center">{title}</h3>
        <div className="mt-4 flex justify-center">
          <span className="text-5xl font-extrabold text-neutral">{price}</span>
          {periodText && price !== "Custom" && (
            <span className="ml-1 text-xl font-medium text-gray-500 self-end">
              {periodText}
            </span>
          )}
        </div>
        <p className="mt-4 text-sm text-gray-500 text-center">{description}</p>
      </div>
      <div className="border-t border-gray-200 px-6 py-6">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="ml-3 text-sm text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-8 bg-gray-50">
        <Button 
          asChild 
          variant={popular ? "default" : "outline"}
          className="w-full"
        >
          <a href={ctaLink}>{ctaText}</a>
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
