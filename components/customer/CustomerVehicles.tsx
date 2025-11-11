import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Plus, Trash2 } from 'lucide-react';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  plate: string;
}

export const CustomerVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: '1', make: 'Toyota', model: 'Camry', year: '2020', plate: 'ABC123' },
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: string) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Saved Vehicles
          </span>
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-1" />
            Add Vehicle
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showForm && (
          <div className="mb-4 p-4 border rounded-lg space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Make</Label>
                <Input placeholder="Toyota" />
              </div>
              <div>
                <Label>Model</Label>
                <Input placeholder="Camry" />
              </div>
              <div>
                <Label>Year</Label>
                <Input placeholder="2020" />
              </div>
              <div>
                <Label>Plate</Label>
                <Input placeholder="ABC123" />
              </div>
            </div>
            <Button size="sm" className="w-full">Save Vehicle</Button>
          </div>
        )}
        <div className="space-y-3">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                <p className="text-sm text-muted-foreground">Plate: {vehicle.plate}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(vehicle.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
