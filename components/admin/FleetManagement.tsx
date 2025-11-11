import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, MapPin, Phone, Clock, Navigation, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Vehicle {
  id: string;
  driver: string;
  vehicleType: string;
  region: string;
  status: 'available' | 'busy' | 'offline';
  currentJob: string | null;
  location: string;
  lastUpdate: string;
  mapPosition: { x: number; y: number };
}

const statusColors = {
  available: 'bg-green-100 text-green-800',
  busy: 'bg-orange-100 text-orange-800',
  offline: 'bg-gray-100 text-gray-800'
};

export const FleetManagement = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [regionFilter, setRegionFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchFleetData = async () => {
    const { data, error } = await supabase.from('drivers').select('*');
    
    if (!error && data) {
      const vehicleData: Vehicle[] = data.map((driver, idx) => ({
        id: driver.id,
        driver: driver.name,
        vehicleType: driver.vehicle_type || 'Tow Truck',
        region: driver.region || 'London',
        status: driver.status || 'available',
        currentJob: driver.current_job || null,
        location: driver.current_location || 'London',
        lastUpdate: new Date().toLocaleTimeString(),
        mapPosition: { x: 20 + (idx * 15) % 60, y: 30 + (idx * 20) % 40 }
      }));
      setVehicles(vehicleData);
      setFilteredVehicles(vehicleData);
    }
    setLastUpdate(new Date());
  };

  useEffect(() => {
    fetchFleetData();
    const interval = setInterval(fetchFleetData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = vehicles;
    if (regionFilter !== 'all') filtered = filtered.filter(v => v.region === regionFilter);
    if (serviceFilter !== 'all') filtered = filtered.filter(v => v.vehicleType === serviceFilter);
    if (statusFilter !== 'all') filtered = filtered.filter(v => v.status === statusFilter);
    setFilteredVehicles(filtered);
  }, [regionFilter, serviceFilter, statusFilter, vehicles]);

  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.status === 'available').length,
    busy: vehicles.filter(v => v.status === 'busy').length,
    offline: vehicles.filter(v => v.status === 'offline').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Fleet Management</h2>
          <p className="text-sm text-gray-600">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </div>
        <Button onClick={fetchFleetData}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">On Job</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.busy}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.offline}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="London">London</SelectItem>
                <SelectItem value="Manchester">Manchester</SelectItem>
                <SelectItem value="Birmingham">Birmingham</SelectItem>
                <SelectItem value="Glasgow">Glasgow</SelectItem>
              </SelectContent>
            </Select>

            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Tow Truck">Tow Truck</SelectItem>
                <SelectItem value="Mobile Mechanic">Mobile Mechanic</SelectItem>
                <SelectItem value="EV Specialist">EV Specialist</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Live Map - {filteredVehicles.length} Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img 
                src="https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759418569248_0ceb07db.webp"
                alt="Fleet tracking map"
                className="w-full h-full object-cover"
              />
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                    selectedVehicle === vehicle.id ? 'scale-125 z-10' : 'scale-100'
                  }`}
                  style={{ left: `${vehicle.mapPosition.x}%`, top: `${vehicle.mapPosition.y}%` }}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <Car className={`h-6 w-6 ${
                    vehicle.status === 'available' ? 'text-green-600' :
                    vehicle.status === 'busy' ? 'text-orange-600' : 'text-gray-400'
                  } drop-shadow-lg`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle List ({filteredVehicles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredVehicles.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                    selectedVehicle === vehicle.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{vehicle.driver}</span>
                    <Badge className={statusColors[vehicle.status]}>
                      {vehicle.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Car className="h-3 w-3" />
                      {vehicle.vehicleType}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {vehicle.region}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      Location: {vehicle.location}
                    </div>
                    {vehicle.currentJob && (
                      <div className="mt-1">Current Job: {vehicle.currentJob}</div>
                    )}
                  </div>
                  
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      <MapPin className="h-3 w-3 mr-1" />
                      Track
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
