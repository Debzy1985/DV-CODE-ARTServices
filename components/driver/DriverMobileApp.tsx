import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Home, DollarSign, Settings, Menu } from 'lucide-react';
import { JobRequestCard } from './JobRequestCard';
import { EarningsTracker } from './EarningsTracker';
import { ShiftManager } from './ShiftManager';
import { NavigationView } from './NavigationView';

export function DriverMobileApp() {
  const [isOnline, setIsOnline] = useState(false);
  const [activeJob, setActiveJob] = useState<string | null>(null);
  const [shiftStartTime, setShiftStartTime] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(2);
  const [earnings, setEarnings] = useState({
    today: 145.50,
    week: 892.00,
    month: 3456.00,
    hours: 6.5,
    rating: 4.8,
    completed: 8
  });

  const [jobRequests] = useState([
    {
      id: '1',
      service: 'Tow Service',
      customer: 'John Smith',
      location: '123 Main St, Downtown',
      distance: '2.3 mi',
      estimatedEarnings: 45,
      urgency: 'high' as const,
      time: '2 min ago'
    },
    {
      id: '2',
      service: 'Jump Start',
      customer: 'Sarah Johnson',
      location: '456 Oak Ave',
      distance: '4.1 mi',
      estimatedEarnings: 35,
      urgency: 'medium' as const,
      time: '5 min ago'
    }
  ]);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      setShiftStartTime(new Date().toISOString());
    } else {
      setShiftStartTime(null);
      setActiveJob(null);
    }
  };

  const handleAcceptJob = (id: string) => {
    setActiveJob(id);
    setNotifications(notifications - 1);
    setEarnings(prev => ({ ...prev, completed: prev.completed + 1 }));
  };

  const handleRejectJob = (id: string) => {
    setNotifications(notifications - 1);
  };

  const handleArrived = () => {
    setActiveJob(null);
    setEarnings(prev => ({ 
      ...prev, 
      today: prev.today + 45,
      week: prev.week + 45 
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 pb-6">
        <div className="flex justify-between items-center mb-4">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/687c280bbe5bd423bd10f60d_1759422831225_436f18c7.png" 
            alt="ART Services" 
            className="h-10 w-auto"
          />

          <div className="flex gap-3">
            <div className="relative">
              <Bell className="w-6 h-6" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {notifications}
                </Badge>
              )}
            </div>
            <Menu className="w-6 h-6" />
          </div>
        </div>
        
        <ShiftManager
          isOnline={isOnline}
          onToggleOnline={handleToggleOnline}
          shiftStartTime={shiftStartTime}
          currentLocation="Downtown Area"
        />
      </div>

      <div className="p-4">
        {activeJob ? (
          <NavigationView
            customerName="John Smith"
            customerPhone="(555) 123-4567"
            destination="123 Main St, Downtown"
            distance="2.3 mi"
            eta="8 min"
            onArrived={handleArrived}
            onCall={() => alert('Calling customer...')}
            onMessage={() => alert('Opening messages...')}
          />
        ) : (
          <Tabs defaultValue="jobs" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="jobs">Job Requests</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobs" className="space-y-4 mt-4">
              {isOnline ? (
                jobRequests.map(job => (
                  <JobRequestCard
                    key={job.id}
                    job={job}
                    onAccept={handleAcceptJob}
                    onReject={handleRejectJob}
                  />
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-gray-500">Go online to receive job requests</p>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="earnings" className="mt-4">
              <EarningsTracker {...earnings} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
