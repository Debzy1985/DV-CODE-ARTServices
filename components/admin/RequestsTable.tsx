import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getServiceRequests, updateJobStatus } from "@/lib/supabase";
import { DownloadButton } from "@/components/DownloadButton";

interface ServiceRequest {
  id: string;
  customer_name: string;
  service_type: string;
  location: string;
  status: string;
  amount: number;
  created_at: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'assigned': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-orange-100 text-orange-800';
    case 'completed': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const RequestsTable = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getServiceRequests();
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setRequests([
        {
          id: '1',
          customer_name: 'Alice Brown',
          service_type: 'Emergency Towing',
          location: '123 Main St',
          status: 'pending',
          amount: 120,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          customer_name: 'Bob Wilson',
          service_type: 'Roadside Assistance',
          location: '456 Oak Ave',
          status: 'completed',
          amount: 80,
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      await updateJobStatus(id, status);
      fetchRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="text-center py-4">Loading requests...</div>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Service Requests</CardTitle>
        <DownloadButton 
          data={requests}
          filename="service-requests"
          label="Download Requests"
          headers={['id', 'customer_name', 'service_type', 'location', 'status', 'amount', 'created_at']}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id.slice(0, 8)}</TableCell>
                <TableCell>{request.customer_name}</TableCell>
                <TableCell>{request.service_type}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {request.location}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>£{request.amount?.toLocaleString() || '0'}</TableCell>
                <TableCell>{formatTime(request.created_at)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateRequestStatus(request.id, 'assigned')}
                      disabled={request.status !== 'pending'}
                    >
                      Assign
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
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