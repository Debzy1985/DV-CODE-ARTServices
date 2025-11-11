import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceRequest {
  id: string;
  service: string;
  date: string;
  status: 'completed' | 'in-progress' | 'cancelled';
  location: string;
  cost: string;
}

export const CustomerTrackingHistory: React.FC = () => {
  const navigate = useNavigate();
  const requests: ServiceRequest[] = [
    { id: '1', service: 'Towing Service', date: '2024-10-01', status: 'completed', location: 'Main St & 5th Ave', cost: '£85.00' },
    { id: '2', service: 'Battery Jump', date: '2024-09-15', status: 'completed', location: 'Park Road', cost: '£45.00' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Service History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {requests.map(request => (
            <div key={request.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{request.service}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {request.location}
                  </p>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted-foreground">{request.date}</span>
                <span className="font-semibold">{request.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
