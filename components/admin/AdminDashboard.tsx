import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminStats } from "./AdminStats";
import { RequestsTable } from "./RequestsTable";
import { DriversTable } from "./DriversTable";
import { LiveTracking } from "./LiveTracking";
import { FleetManagement } from "./FleetManagement";

import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";

const AdminHeader = () => (
  <div className="flex items-center justify-between p-6 border-b bg-white">
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600">Manage ART Services operations</p>
    </div>
    <div className="flex items-center gap-4">
      <Button variant="outline" size="sm">
        <Search className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm">
        <Bell className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm">
        <User className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const DashboardContent = () => (
  <div className="space-y-6">
    <AdminStats />
    <RequestsTable />
  </div>
);

const PaymentsContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Payment Management</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">Payment processing and transaction history will be displayed here.</p>
    </CardContent>
  </Card>
);

const AnalyticsContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Analytics & Reports</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">Charts and analytics data will be displayed here.</p>
    </CardContent>
  </Card>
);

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'requests':
        return <RequestsTable />;
      case 'drivers':
        return <DriversTable />;
      case 'tracking':
        return <LiveTracking />;
      case 'fleet':
        return <FleetManagement />;
      case 'payments':
        return <PaymentsContent />;
      case 'analytics':
        return <AnalyticsContent />;
      default:
        return <DashboardContent />;
    }

  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};