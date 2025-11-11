import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageSquare, MapPin, Clock, Star, Navigation } from 'lucide-react';

const mapImages = [
  'https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759416726719_7308bed6.webp',
  'https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759416728522_c6edcb81.webp',
  'https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759416730256_47fc0abd.webp'
];

export default function CustomerTracking({ trackingId }: { trackingId: string }) {
  const [currentMap, setCurrentMap] = useState(0);
  const [eta, setEta] = useState(18);
  const [status, setStatus] = useState('Driver En Route');

  useEffect(() => {
    const mapInterval = setInterval(() => {
      setCurrentMap((prev) => (prev + 1) % mapImages.length);
    }, 5000);

    const etaInterval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1));
    }, 60000);

    return () => {
      clearInterval(mapInterval);
      clearInterval(etaInterval);
    };
  }, []);

  const driver = {
    name: 'James Wilson',
    photo: 'https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759417257533_6ada058c.webp',
    rating: 4.8,
    vehicle: 'Mercedes Sprinter Tow Truck',
    plate: 'LDN 4567',
    phone: '+44 7700 900123'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Service</h1>
          <p className="text-gray-600">Tracking ID: <span className="font-mono font-semibold">{trackingId}</span></p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-0 overflow-hidden">
              <div className="relative h-96">
                <img src={mapImages[currentMap]} alt="Live tracking map" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">{status}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Service Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Type:</span>
                  <span className="font-semibold">Emergency Tow</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Location:</span>
                  <span className="font-semibold">M25, Junction 15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination:</span>
                  <span className="font-semibold">Central London Garage</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-blue-600">{status}</Badge>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Estimated Arrival</h3>
              </div>
              <div className="text-center py-4">
                <div className="text-5xl font-bold text-blue-600">{eta}</div>
                <div className="text-gray-600 mt-2">minutes</div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Driver</h3>
              <div className="flex items-center gap-4 mb-4">
                <img src={driver.photo} alt={driver.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold">{driver.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{driver.rating}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-semibold">{driver.vehicle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plate:</span>
                  <span className="font-semibold">{driver.plate}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
