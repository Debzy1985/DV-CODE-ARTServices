import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Star } from 'lucide-react';

interface ServiceCardProps {
  name: string;
  rating: number;
  eta: string;
  distance: string;
  price: string;
  available: boolean;
  onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  rating,
  eta,
  distance,
  price,
  available,
  onSelect
}) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
        available 
          ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 hover:border-green-400' 
          : 'border-gray-200 bg-gray-50 opacity-60'
      }`}
      onClick={available ? onSelect : undefined}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-600">{rating}</span>
            </div>
          </div>
          <Badge 
            variant={available ? "default" : "secondary"}
            className={available ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {available ? 'Available' : 'Busy'}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>ETA: {eta}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-red-500" />
            <span>{distance} away</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Estimated Cost:</span>
            <span className="text-xl font-bold text-green-600">{price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;