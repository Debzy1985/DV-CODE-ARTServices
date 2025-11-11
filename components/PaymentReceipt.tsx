import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Download, Phone, MapPin, Clock, Truck } from 'lucide-react';
import { useState } from 'react';

interface PaymentReceiptProps {
  serviceRequest: {
    id: string;
    serviceType: string;
    vehicleType: string;
    totalPrice: number;
    mechanicName: string;
    mechanicRating: number;
    eta: string;
    location: string;
    completedAt: string;
    status: string;
  };
  onRate?: (rating: number) => void;
  onContactSupport?: () => void;
}

export const PaymentReceipt = ({ serviceRequest, onRate, onContactSupport }: PaymentReceiptProps) => {
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleRating = (stars: number) => {
    setRating(stars);
    setHasRated(true);
    onRate?.(stars);
  };

  const downloadReceipt = () => {
    const receiptData = `
ART Recovery Services - Receipt
==============================
Service ID: ${serviceRequest.id}
Date: ${new Date(serviceRequest.completedAt).toLocaleDateString()}
Service Type: ${serviceRequest.serviceType}
Vehicle Type: ${serviceRequest.vehicleType}
Mechanic: ${serviceRequest.mechanicName}
Location: ${serviceRequest.location}
Total: £${serviceRequest.totalPrice}
Status: ${serviceRequest.status}
    `;
    
    const blob = new Blob([receiptData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${serviceRequest.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Service Receipt
        </CardTitle>
        <Badge variant={serviceRequest.status === 'completed' ? 'default' : 'secondary'}>
          {serviceRequest.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Service ID:</span>
            <span className="font-mono text-sm">{serviceRequest.id}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Service Type:</span>
            <span className="font-medium">{serviceRequest.serviceType}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Vehicle Type:</span>
            <span className="font-medium">{serviceRequest.vehicleType}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Mechanic:</span>
            <div className="flex items-center gap-1">
              <span className="font-medium">{serviceRequest.mechanicName}</span>
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{serviceRequest.mechanicRating}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">ETA:</span>
            <span className="font-medium">{serviceRequest.eta}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Location:</span>
            <span className="font-medium text-right max-w-48 truncate">{serviceRequest.location}</span>
          </div>
        </div>

        <Separator />
        
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total Price:</span>
          <span>£{serviceRequest.totalPrice}</span>
        </div>

        <Separator />

        {!hasRated && serviceRequest.status === 'completed' && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Rate this service:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  className="p-1"
                  onClick={() => handleRating(star)}
                >
                  <Star 
                    className={`h-6 w-6 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                </Button>
              ))}
            </div>
          </div>
        )}

        {hasRated && (
          <div className="text-center text-sm text-green-600">
            Thank you for rating this service!
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={downloadReceipt} variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={onContactSupport} variant="outline" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};