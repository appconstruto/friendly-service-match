
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ReviewCardProps {
  review: {
    id: string;
    client: string;
    clientImage?: string;
    rating: number;
    date: string;
    service: string;
    comment: string;
    helpful: number;
    providerResponse?: string;
  };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={review.clientImage} alt={review.client} />
            <AvatarFallback>
              {review.client.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{review.client}</h4>
                <p className="text-sm text-gray-600">{review.service}</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('pt-BR')}
              </span>
            </div>
            
            <div className="flex items-center mb-3">
              {renderStars(review.rating)}
              <span className="ml-2 text-sm font-medium text-gray-700">
                {review.rating}/5
              </span>
            </div>
            
            <p className="text-gray-700 mb-4">{review.comment}</p>
            
            {review.providerResponse && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <MessageCircle className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-600">
                    Resposta do prestador
                  </span>
                </div>
                <p className="text-sm text-gray-700">{review.providerResponse}</p>
              </div>
            )}
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Útil ({review.helpful})
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
