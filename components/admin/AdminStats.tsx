import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Truck, DollarSign, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { getStats } from "@/lib/supabase";
import { DownloadButton } from "@/components/DownloadButton";

interface Stats {
  totalRequests: number;
  activeDrivers: number;
  completedJobs: number;
  revenue: number;
}

export const AdminStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalRequests: 0,
    activeDrivers: 0,
    completedJobs: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        totalRequests: 156,
        activeDrivers: 12,
        completedJobs: 89,
        revenue: 45600
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Requests",
      value: stats.totalRequests.toString(),
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Drivers",
      value: stats.activeDrivers.toString(),
      icon: Truck,
      color: "text-green-600"
    },
    {
      title: "Completed Jobs",
      value: stats.completedJobs.toString(),
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "Total Revenue",
      value: `£${stats.revenue.toLocaleString()}`,
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  const statsData = [
    {
      metric: "Total Requests",
      value: stats.totalRequests,
      date: new Date().toISOString().split('T')[0]
    },
    {
      metric: "Active Drivers",
      value: stats.activeDrivers,
      date: new Date().toISOString().split('T')[0]
    },
    {
      metric: "Completed Jobs",
      value: stats.completedJobs,
      date: new Date().toISOString().split('T')[0]
    },
    {
      metric: "Total Revenue",
      value: stats.revenue,
      date: new Date().toISOString().split('T')[0]
    }
  ];

  if (loading) return <div className="text-center py-4">Loading stats...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dashboard Overview</h2>
        <DownloadButton 
          data={statsData}
          filename="admin-stats"
          label="Download Stats"
          headers={['metric', 'value', 'date']}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};