import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  eta: string;
  distance: string;
  price: string;
  image: string;
}

const MobileApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'request' | 'providers' | 'tracking'>('request');
  const [formData, setFormData] = useState({
    serviceType: '',
    location: '',
    destination: '',
    phone: '',
    description: ''
  });
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const { toast } = useToast();

  const serviceProviders: ServiceProvider[] = [
    {
      id: '1',
      name: 'UK Tow Pro',
      rating: 4.8,
      eta: '15 mins',
      distance: '2.3 km',
      price: '£85',
      image: '🚛'
    },
    {
      id: 2,
      name: 'Quick Response Towing',
      rating: 4.7,
      reviews: 156,
      eta: '22 mins',
      distance: '4.1 km', 
      price: '£72',
      image: '🚗'
    },
    {
      id: 3,
      name: 'Professional Auto Rescue',
      rating: 4.9,
      reviews: 203,
      eta: '18 mins',
      distance: '3.2 km',
      price: '£90',
    }
  ];

  const handleSubmitRequest = () => {
    if (!formData.serviceType || !formData.location || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentView('providers');
    toast({
      title: "Request Submitted!",
      description: "Finding available service providers nearby..."
    });
  };

  const handleSelectProvider = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setCurrentView('tracking');
    toast({
      title: "Service Confirmed!",
      description: `${provider.name} is on the way. ETA: ${provider.eta}`
    });
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1758044589754_bbc51f4c.webp')`
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg mb-6 shadow-lg backdrop-blur-sm bg-opacity-90">
        <h1 className="text-2xl font-bold">🚛 ART Services</h1>
        <p className="text-blue-100">24/7 Roadside Assistance & EV Support</p>
      </div>

      {/* Request Form View */}
      {currentView === 'request' && (
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              🆘 Request Emergency Service
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => setFormData({...formData, serviceType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service needed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard-towing">🚛 Standard Towing</SelectItem>
                  <SelectItem value="ev-towing">⚡ EV Towing (Flatbed)</SelectItem>
                  <SelectItem value="heavy-duty">🏗️ Heavy Duty Towing</SelectItem>
                  <SelectItem value="fuel">⛽ Fuel Delivery</SelectItem>
                  <SelectItem value="ev-charging">🔌 EV Charging Assistance</SelectItem>
                  <SelectItem value="tire">🛞 Tire Change</SelectItem>
                  <SelectItem value="lockout">🔐 Lockout Assistance</SelectItem>
                  <SelectItem value="jumpstart">🔋 Jump Start</SelectItem>
                  <SelectItem value="ev-battery">⚡ EV Battery Service</SelectItem>
                  <SelectItem value="winch">⚙️ Winch Out</SelectItem>
                </SelectContent>
            </div>
            
            <div>
              <Label htmlFor="location">Current Location *</Label>
              <Input
                id="location"
                placeholder="Enter your current location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="destination">Destination (if towing)</Label>
              <Input
                id="destination"
                placeholder="Where should we tow your vehicle?"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="Your contact number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Additional Details</Label>
              <Textarea
                id="description"
                placeholder="Describe your situation..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            
            <Button 
              onClick={handleSubmitRequest}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3"
            >
              🚨 Request Emergency Service
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Service Providers View */}
      {currentView === 'providers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Available Providers</h2>
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('request')}
              className="text-sm"
            >
              ← Back
            </Button>
          </div>
          
          {serviceProviders.map((provider) => (
            <Card key={provider.id} className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleSelectProvider(provider)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{provider.image}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{provider.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>⭐ {provider.rating}</span>
                        <span>•</span>
                        <span>📍 {provider.distance}</span>
                        <span>•</span>
                        <span>⏱️ {provider.eta}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">{provider.price}</div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Available
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tracking View */}
      {currentView === 'tracking' && selectedProvider && (
        <div className="space-y-6">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle>✅ Service Confirmed</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-4xl">{selectedProvider.image}</div>
                <h3 className="text-xl font-semibold">{selectedProvider.name}</h3>
                <Badge className="bg-green-100 text-green-800 px-4 py-2">
                  🚛 On the way - ETA {selectedProvider.eta}
                </Badge>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{formData.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium text-green-600">{selectedProvider.price}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    📞 Call Driver
                  </Button>
                  <Button variant="outline" className="flex-1">
                    💬 Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('request')}
            className="w-full"
          >
            🏠 New Request
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileApp;