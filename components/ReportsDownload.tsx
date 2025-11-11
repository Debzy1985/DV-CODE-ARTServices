import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadButton } from "@/components/DownloadButton";
import { FileText, Users, Truck, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { getServiceRequests, getDrivers, getStats, getVendorStats } from "@/lib/supabase";

export const ReportsDownload = () => {
  const [allData, setAllData] = useState({
    requests: [],
    drivers: [],
    adminStats: [],
    vendorStats: []
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [requests, drivers, adminStats, vendorStats] = await Promise.all([
        getServiceRequests().catch(() => []),
        getDrivers().catch(() => []),
        getStats().catch(() => ({ totalRequests: 0, activeDrivers: 0, completedJobs: 0, revenue: 0 })),
        getVendorStats().catch(() => ({ totalJobs: 0, activeJobs: 0, earnings: 0, rating: 0 }))
      ]);

      setAllData({
        requests: requests || [],
        drivers: drivers || [],
        adminStats: [{ ...adminStats, date: new Date().toISOString().split('T')[0] }],
        vendorStats: [{ ...vendorStats, date: new Date().toISOString().split('T')[0] }]
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const reports = [
    {
      title: "Service Requests Report",
      description: "Complete list of all service requests",
      icon: FileText,
      data: allData.requests,
      filename: "all-service-requests",
      headers: ['id', 'customer_name', 'service_type', 'location', 'status', 'amount', 'created_at']
    },
    {
      title: "Drivers Report",
      description: "Complete drivers database",
      icon: Users,
      data: allData.drivers,
      filename: "all-drivers",
      headers: ['id', 'name', 'phone', 'status', 'vehicle_type', 'rating', 'completed_jobs']
    },
    {
      title: "Admin Statistics",
      description: "Administrative dashboard statistics",
      icon: BarChart3,
      data: allData.adminStats,
      filename: "admin-statistics",
      headers: ['totalRequests', 'activeDrivers', 'completedJobs', 'revenue', 'date']
    },
    {
      title: "Vendor Statistics",
      description: "Vendor performance statistics",
      icon: Truck,
      data: allData.vendorStats,
      filename: "vendor-statistics",
      headers: ['totalJobs', 'activeJobs', 'earnings', 'rating', 'date']
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Download All Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, index) => {
            const IconComponent = report.icon;
            return (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-gray-500">{report.description}</p>
                  </div>
                </div>
                <DownloadButton
                  data={report.data}
                  filename={report.filename}
                  label={`Download ${report.title}`}
                  headers={report.headers}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};