import { Card } from '@/components/ui/card';
import { DollarSign, TrendingUp, Clock, Star } from 'lucide-react';

interface EarningsTrackerProps {
  todayEarnings: number;
  weekEarnings: number;
  monthEarnings: number;
  hoursWorked: number;
  rating: number;
  completedJobs: number;
}

export function EarningsTracker({ 
  todayEarnings, 
  weekEarnings, 
  monthEarnings,
  hoursWorked,
  rating,
  completedJobs
}: EarningsTrackerProps) {
  return (
    <div className="space-y-3">
      <Card className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Today's Earnings</p>
            <p className="text-3xl font-bold">${todayEarnings.toFixed(2)}</p>
          </div>
          <DollarSign className="w-12 h-12 opacity-80" />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <p className="text-xs text-gray-600">This Week</p>
          </div>
          <p className="text-xl font-bold">${weekEarnings}</p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            <p className="text-xs text-gray-600">This Month</p>
          </div>
          <p className="text-xl font-bold">${monthEarnings}</p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-purple-600" />
            <p className="text-xs text-gray-600">Hours</p>
          </div>
          <p className="text-xl font-bold">{hoursWorked}h</p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <p className="text-xs text-gray-600">Rating</p>
          </div>
          <p className="text-xl font-bold">{rating} ⭐</p>
        </Card>
      </div>

      <Card className="p-3 bg-blue-50">
        <p className="text-sm text-center">
          <span className="font-bold text-blue-600">{completedJobs}</span> jobs completed today
        </p>
      </Card>
    </div>
  );
}
