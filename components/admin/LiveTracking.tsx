import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Clock, Phone, Car } from "lucide-react";
import { useState, useEffect } from "react";

interface ActiveService {
  id: string;
  driver: string;
  customer: string;
  service: string;
  startTime: string;
  estimatedArrival: string;
  currentLocation: string;
  destination: string;
  status: 'en-route' | 'arrived' | 'in-service';
  mapPosition: { x: number; y: number };
}

const mockActiveServices: ActiveService[] = [
  {
    id: "REQ-001",
    driver: "Mike Johnson",
    customer: "John Doe",
    service: "Towing",
    startTime: "10:30 AM",
    estimatedArrival: "11:15 AM",
    currentLocation: "Westminster Bridge",
    destination: "Kensington",
    status: "en-route",
    mapPosition: { x: 35, y: 45 }
  },
  {
    id: "REQ-004",
    driver: "Peter Smith",
    customer: "Mary Johnson",
    service: "Jump Start",
    startTime: "11:00 AM",
    estimatedArrival: "11:30 AM",
    currentLocation: "Tower Bridge",
    destination: "Canary Wharf",
    status: "arrived",
    mapPosition: { x: 65, y: 55 }
  },
  {
    id: "REQ-005",
    driver: "Ahmed Hassan",
    customer: "David Wilson",
    service: "Fuel Delivery",
    startTime: "10:45 AM",
    estimatedArrival: "11:20 AM",
    currentLocation: "Oxford Street",
    destination: "Camden Town",
    status: "in-service",
    mapPosition: { x: 50, y: 30 }
  }
];

const mapImages = [
  "https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759416726719_7308bed6.webp",
  "https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759416728522_c6edcb81.webp",
  "https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759416730256_47fc0abd.webp"
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'en-route': return 'bg-blue-100 text-blue-800';
    case 'arrived': return 'bg-green-100 text-green-800';
    case 'in-service': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const LiveTracking = () => {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMapIndex((prev) => (prev + 1) % mapImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Live Service Tracking</h2>
        <Button onClick={() => setCurrentMapIndex((prev) => (prev + 1) % mapImages.length)}>
          Refresh Map
        </Button>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Map View - {mockActiveServices.length} Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img 
                src={mapImages[currentMapIndex]} 
                alt="Live tracking map"
                className="w-full h-full object-cover"
              />
              {mockActiveServices.map((service) => (
                <div
                  key={service.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                    selectedService === service.id ? 'scale-125' : 'scale-100'
                  }`}
                  style={{ left: `${service.mapPosition.x}%`, top: `${service.mapPosition.y}%` }}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="relative">
                    <Car className={`h-6 w-6 ${
                      service.status === 'en-route' ? 'text-blue-600' :
                      service.status === 'arrived' ? 'text-green-600' : 'text-orange-600'
                    } animate-pulse`} />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {service.driver}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Services ({mockActiveServices.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {mockActiveServices.map((service) => (
                <div 
                  key={service.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedService === service.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{service.id}</span>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Driver:</span> {service.driver}
                    </div>
                    <div>
                      <span className="text-gray-500">Customer:</span> {service.customer}
                    </div>
                    <div>
                      <span className="text-gray-500">Service:</span> {service.service}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ETA: {service.estimatedArrival}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <Navigation className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-gray-600">
                      {service.currentLocation} → {service.destination}
                    </span>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <MapPin className="h-3 w-3 mr-1" />
                      Track
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};