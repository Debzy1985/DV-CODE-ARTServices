import { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Clock, User, Star, Navigation, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mapImages = [
  'https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759416726719_7308bed6.webp',
  'https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759416728522_c6edcb81.webp',
  'https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759416730256_47fc0abd.webp'
];

export default function CustomerMobileDemo() {
  const [currentMap, setCurrentMap] = useState(0);
  const [eta, setEta] = useState(12);
  const [showCall, setShowCall] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const mapTimer = setInterval(() => {
      setCurrentMap((prev) => (prev + 1) % mapImages.length);
    }, 4000);
    
    const etaTimer = setInterval(() => {
      setEta((prev) => Math.max(1, prev - 1));
    }, 60000);

    return () => {
      clearInterval(mapTimer);
      clearInterval(etaTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Mobile App Demo</h1>
          <p className="text-gray-600">Live Tracking Experience</p>
        </div>

        {/* Mobile Phone Frame */}
        <div className="relative mx-auto" style={{ maxWidth: '380px' }}>
          <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
            <div className="bg-white rounded-[2.5rem] overflow-hidden h-[720px] flex flex-col">
              
              {/* Status Bar */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 flex items-center justify-between text-white">
                <ChevronLeft className="w-6 h-6" />
                <span className="font-semibold">Live Tracking</span>
                <div className="w-6" />
              </div>

              {/* Map Section */}
              <div className="relative h-64 bg-gray-200">
                <img 
                  src={mapImages[currentMap]} 
                  alt="Live GPS Map" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-600 rounded-full p-3 shadow-lg animate-pulse">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                </div>
                <Badge className="absolute top-4 left-4 bg-green-500">
                  Driver En Route
                </Badge>
              </div>

              {/* ETA Card */}
              <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Estimated Arrival</span>
                  </div>
                  <span className="text-2xl font-bold">{eta} min</span>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                
                {/* Driver Info Card */}
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src="https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759417582581_21b765ba.webp"
                      alt="Driver"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">Michael Chen</h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                        <span className="text-gray-600 text-sm ml-1">(4.9)</span>
                      </div>
                      <p className="text-sm text-gray-600">Tesla Model 3 • ABC-1234</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button 
                      onClick={() => setShowCall(!showCall)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button 
                      onClick={() => setShowMessage(!showMessage)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </Card>

                {/* Service Details */}
                <Card className="p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Service Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Pickup Location</p>
                      <p className="font-medium">123 Main St, Downtown</p>
                    </div>
                    <div className="h-px bg-gray-200" />
                    <div>
                      <p className="text-sm text-gray-600">Destination</p>
                      <p className="font-medium">456 Oak Ave, Uptown</p>
                    </div>
                    <div className="h-px bg-gray-200" />
                    <div>
                      <p className="text-sm text-gray-600">Service Type</p>
                      <p className="font-medium">EV Charging Service</p>
                    </div>
                  </div>
                </Card>

                {/* Status Timeline */}
                <Card className="p-4">
                  <h3 className="font-bold mb-3">Status Updates</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <p className="font-medium">Driver Assigned</p>
                        <p className="text-sm text-gray-600">2:45 PM</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <p className="font-medium">En Route to Pickup</p>
                        <p className="text-sm text-gray-600">2:48 PM</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse" />
                      <div>
                        <p className="font-medium">Arriving Soon</p>
                        <p className="text-sm text-gray-600">ETA: {eta} minutes</p>
                      </div>
                    </div>
                  </div>
                </Card>

              </div>

            </div>
          </div>
        </div>

        {/* Call/Message Overlays */}
        {showCall && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCall(false)}>
            <Card className="p-6 max-w-sm mx-4">
              <h3 className="text-xl font-bold mb-2">Calling Driver...</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </Card>
          </div>
        )}

        {showMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowMessage(false)}>
            <Card className="p-6 max-w-sm mx-4">
              <h3 className="text-xl font-bold mb-2">Message Driver</h3>
              <p className="text-gray-600">Chat feature coming soon!</p>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
