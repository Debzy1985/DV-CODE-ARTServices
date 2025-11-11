import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';

export const CustomerAccountSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input defaultValue="John Doe" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" defaultValue="john.doe@example.com" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="tel" defaultValue="+44 7700 900000" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};
