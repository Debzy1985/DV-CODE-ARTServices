import React, { useState } from 'react';
import Header from './Header';
import TowRequestForm from './TowRequestForm';
import ServiceCard from './ServiceCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type RequestStatus = 'idle' | 'searching' | 'confirmed' | 'in-progress';

interface TowRequest {
  location: string;
  destination: string;
  phone: string;
  vehicleType: string;
  description: string;
}

const mockServices = [
  { id: 1, name: 'QuickTow Pro', rating: 4.8, eta: '15 min', distance: '2.3 km', price: '$85', available: true },
  { id: 2, name: 'RoadRescue 24/7', rating: 4.6, eta: '22 min', distance: '3.1 km', price: '$92', available: true },
  { id: 3, name: 'FastTrack Towing', rating: 4.9, eta: '18 min', distance: '2.8 km', price: '$88', available: false },
];

const TowApp: React.FC = () => {
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [currentRequest, setCurrentRequest] = useState<TowRequest | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const { toast } = useToast();

  const handleRequestSubmit = (data: TowRequest) => {
    setCurrentRequest(data);
    setStatus('searching');
    toast({
      title: "Searching for tow services",
      description: "We're finding the best available drivers near you.",
    });
  };

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setStatus('confirmed');
    toast({
      title: "Service confirmed!",
      description: `${service.name} will arrive in ${service.eta}`,
    });
  };

  const handleNewRequest = () => {
    setStatus('idle');
    setCurrentRequest(null);
    setSelectedService(null);
  };

  if (status === 'idle') {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1758044587257_ff89bbc9.webp')`
        }}
      >
        <Header requestStatus={status} />
        <div className="p-4 pt-8">
          <TowRequestForm onSubmit={handleRequestSubmit} />
        </div>
      </div>
    );
  }

  if (status === 'searching') {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1758044588869_64ef6be5.webp')`
        }}
      >
        <Header requestStatus={status} />
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Available Tow Services</h2>
          <div className="space-y-4 max-w-md mx-auto">
            {mockServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                onSelect={() => handleServiceSelect(service)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header requestStatus={status} />
      <div className="p-4">
        <Card className="max-w-md mx-auto shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-100">
          <CardHeader className="text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6" />
              Service Confirmed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800">{selectedService?.name}</h3>
              <p className="text-green-600 font-medium">Arriving in {selectedService?.eta}</p>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span><strong>From:</strong> {currentRequest?.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span><strong>To:</strong> {currentRequest?.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <span><strong>Contact:</strong> {currentRequest?.phone}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total Cost:</span>
                <span className="text-2xl font-bold text-green-600">{selectedService?.price}</span>
              </div>
              <Button 
                onClick={handleNewRequest}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                New Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TowApp;