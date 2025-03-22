import { Star, StarHalf } from "lucide-react";

interface TestimonialCardProps {
  rating: number;
  content: string;
  author: {
    initials: string;
    name: string;
    title: string;
  };
}

const TestimonialCard = ({ rating, content, author }: TestimonialCardProps) => {
  // Generate an array of stars based on the rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden shadow p-6">
      <div className="flex items-center mb-4">
        <div className="text-yellow-400 flex">
          {renderStars()}
        </div>
      </div>
      <p className="text-gray-600 mb-4">
        {content}
      </p>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
            <span>{author.initials}</span>
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-neutral">{author.name}</p>
          <p className="text-sm text-gray-500">{author.title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
