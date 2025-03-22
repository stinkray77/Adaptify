import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="relative">
      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div className="ml-16">
        <h3 className="text-lg leading-6 font-medium text-neutral">{title}</h3>
        <p className="mt-2 text-base text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
