import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Navigation } from 'lucide-react';

interface JobRequest {
  id: string;
  service: string;
  customer: string;
  location: string;
  distance: string;
  estimatedEarnings: number;
  urgency: 'high' | 'medium' | 'low';
  time: string;
}

interface JobRequestCardProps {
  job: JobRequest;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export function JobRequestCard({ job, onAccept, onReject }: JobRequestCardProps) {
  const urgencyColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  return (
    <Card className="p-4 border-2 border-blue-200 bg-white shadow-lg animate-pulse-slow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{job.service}</h3>
          <p className="text-sm text-gray-600">{job.customer}</p>
        </div>
        <Badge className={urgencyColors[job.urgency]}>
          {job.urgency.toUpperCase()}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
          <span>{job.location} • {job.distance}</span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-2 text-blue-600" />
          <span>{job.time}</span>
        </div>
        <div className="flex items-center text-sm font-bold text-green-600">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>Est. ${job.estimatedEarnings}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => onReject(job.id)} variant="outline" className="flex-1">
          Reject
        </Button>
        <Button onClick={() => onAccept(job.id)} className="flex-1 bg-green-600 hover:bg-green-700">
          <Navigation className="w-4 h-4 mr-2" />
          Accept
        </Button>
      </div>
    </Card>
  );
}
