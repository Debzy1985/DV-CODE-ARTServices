import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation, Phone, MessageSquare, MapPin, Clock } from 'lucide-react';

interface NavigationViewProps {
  customerName: string;
  customerPhone: string;
  destination: string;
  distance: string;
  eta: string;
  onArrived: () => void;
  onCall: () => void;
  onMessage: () => void;
}

export function NavigationView({
  customerName,
  customerPhone,
  destination,
  distance,
  eta,
  onArrived,
  onCall,
  onMessage
}: NavigationViewProps) {
  return (
    <div className="space-y-4">
      <Card className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg">En Route to Customer</h3>
          <Badge className="bg-green-500">ACTIVE</Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{destination}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Navigation className="w-4 h-4 mr-2" />
              <span className="text-sm">{distance}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">ETA: {eta}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759419638675_2f881e8d.webp" 
          alt="Navigation Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-bold">
          {distance}
        </div>
      </div>

      <Card className="p-4">
        <h4 className="font-bold mb-2">Customer Details</h4>
        <p className="text-sm mb-1">{customerName}</p>
        <p className="text-sm text-gray-600 mb-3">{customerPhone}</p>
        
        <div className="flex gap-2">
          <Button onClick={onCall} variant="outline" className="flex-1">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button onClick={onMessage} variant="outline" className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </Button>
        </div>
      </Card>

      <Button onClick={onArrived} className="w-full bg-green-600 hover:bg-green-700">
        I've Arrived
      </Button>
    </div>
  );
}
