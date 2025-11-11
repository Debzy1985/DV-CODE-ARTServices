import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Clock, Power, MapPin } from 'lucide-react';

interface ShiftManagerProps {
  isOnline: boolean;
  onToggleOnline: () => void;
  shiftStartTime: string | null;
  currentLocation: string;
}

export function ShiftManager({ 
  isOnline, 
  onToggleOnline, 
  shiftStartTime,
  currentLocation 
}: ShiftManagerProps) {
  const getShiftDuration = () => {
    if (!shiftStartTime) return '0h 0m';
    const start = new Date(shiftStartTime);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Power className={`w-6 h-6 ${isOnline ? 'text-green-600' : 'text-gray-400'}`} />
          <div>
            <h3 className="font-bold">Shift Status</h3>
            <Badge className={isOnline ? 'bg-green-500' : 'bg-gray-400'}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </Badge>
          </div>
        </div>
        <Switch checked={isOnline} onCheckedChange={onToggleOnline} />
      </div>

      {isOnline && (
        <>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              <span>Shift Duration: <strong>{getShiftDuration()}</strong></span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              <span>{currentLocation}</span>
            </div>
          </div>

          <Button onClick={onToggleOnline} variant="destructive" className="w-full">
            End Shift
          </Button>
        </>
      )}

      {!isOnline && (
        <Button onClick={onToggleOnline} className="w-full bg-green-600 hover:bg-green-700">
          Start Shift
        </Button>
      )}
    </Card>
  );
}
