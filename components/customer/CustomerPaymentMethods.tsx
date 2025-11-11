import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiry: string;
}

export const CustomerPaymentMethods: React.FC = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/25' },
  ]);

  const handleDelete = (id: string) => {
    setMethods(methods.filter(m => m.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </span>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Card
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {methods.map(method => (
            <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold">{method.type} •••• {method.last4}</p>
                  <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(method.id)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
