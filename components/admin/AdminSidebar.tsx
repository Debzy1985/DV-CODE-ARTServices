import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  MapPin, 
  DollarSign, 
  Settings,
  BarChart3,
  MessageSquare,
  Truck
} from "lucide-react";


interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'requests',
    label: 'Service Requests',
    icon: Car
  },
  {
    id: 'drivers',
    label: 'Drivers',
    icon: Users
  },
  {
    id: 'tracking',
    label: 'Live Tracking',
    icon: MapPin
  },
  {
    id: 'fleet',
    label: 'Fleet Management',
    icon: Truck
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: DollarSign
  },
  {
    id: 'analytics',

    label: 'Analytics',
    icon: BarChart3
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: MessageSquare
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings
  }
];

export const AdminSidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-gray-50">
      <div className="p-6 flex items-center gap-3">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/687c280bbe5bd423bd10f60d_1759422831225_436f18c7.png" 
          alt="ART Services Logo" 
          className="h-12 w-auto"
        />
      </div>

      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeTab === item.id && "bg-orange-600 text-white"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};