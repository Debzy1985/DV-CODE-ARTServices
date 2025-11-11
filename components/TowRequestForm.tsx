import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const TowRequestForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    serviceType: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const serviceTypes = [
    'Standard Recovery',
    'EV Recovery (Flatbed)',
    'Heavy Duty Recovery',
    'Jump Start',
    'Tire Change',
    'EV Charging Assistance',
    'Fuel Delivery',
    'Lockout Service',
    'Battery Replacement',
    'EV Battery Service'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!supabase) {
        // Demo mode - simulate success
        toast({
          title: "Request Submitted",
          description: "Your service request has been submitted successfully. A driver will be assigned shortly."
        });
        // Reset form
        setFormData({
          customerName: '',
          phone: '',
          serviceType: '',
          location: '',
          description: ''
        });
        return;
      }

      const { data, error } = await supabase
        .from('service_requests')
        .insert({
          customer_name: formData.customerName,
          service_type: formData.serviceType,
          location: formData.location,
          status: 'pending',
          amount: getServicePrice(formData.serviceType)
        })
        .select()
        .single();

      if (error) throw error;


      toast({
        title: "Request Submitted",
        description: "Your service request has been submitted successfully. A driver will be assigned shortly."
      });

      // Reset form
      setFormData({
        customerName: '',
        phone: '',
        serviceType: '',
        location: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getServicePrice = (serviceType: string) => {
    const prices: Record<string, number> = {
      'Standard Recovery': 150,
      'EV Recovery (Flatbed)': 250,
      'Heavy Duty Recovery': 350,
      'Jump Start': 50,
      'Tire Change': 80,
      'EV Charging Assistance': 120,
      'Fuel Delivery': 60,
      'Lockout Service': 70,
      'Battery Replacement': 120,
      'EV Battery Service': 180
    };
    return prices[serviceType] || 100;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Request Service
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="customerName"
                placeholder="Enter your full name"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service} - £{getServicePrice(service).toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                placeholder="Enter your location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your situation..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Request Service'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};