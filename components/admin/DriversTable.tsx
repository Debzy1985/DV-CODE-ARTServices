import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getDrivers } from "@/lib/supabase";
import { DownloadButton } from "@/components/DownloadButton";

interface Driver {
  id: string;
  name: string;
  phone: string;
  status: string;
  vehicle_type: string;
  rating: number;
  completed_jobs: number;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-100 text-green-800';
    case 'offline': return 'bg-gray-100 text-gray-800';
    case 'busy': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const DriversTable = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data || []);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      setDrivers([
        {
          id: '1',
          name: 'John Smith',
          phone: '+1234567890',
          status: 'online',
          vehicle_type: 'Flatbed',
          rating: 4.8,
          completed_jobs: 156
        },
        {
          id: '2',
          name: 'Mike Johnson',
          phone: '+1234567891',
          status: 'busy',
          vehicle_type: 'Hook & Chain',
          rating: 4.6,
          completed_jobs: 89
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading drivers...</div>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Driver Management</CardTitle>
        <DownloadButton 
          data={drivers}
          filename="drivers-list"
          label="Download Drivers"
          headers={['id', 'name', 'phone', 'status', 'vehicle_type', 'rating', 'completed_jobs']}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Jobs</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{driver.name}</div>
                      <div className="text-sm text-gray-500">{driver.id.slice(0, 8)}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {driver.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(driver.status)}>
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell>{driver.vehicle_type || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {driver.rating}
                  </div>
                </TableCell>
                <TableCell>{driver.completed_jobs}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">Toggle</Button>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};