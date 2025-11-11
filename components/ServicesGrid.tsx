import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Fuel, Wrench, Key, Anchor, Package, Trash2, Crown } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: "Local & Long-Haul Towing",
    description: "Comprehensive towing services with flatbed and tow dolly methods for all vehicle types.",
    features: ["Flatbed Towing", "Wheel Lift", "Long Distance"]
  },
  {
    icon: Fuel,
    title: "Fuel & Diesel Delivery",
    description: "Emergency fuel delivery directly to your location. Up to 10L gasoline or 15L diesel.",
    features: ["Emergency Delivery", "Gasoline & Diesel", "Quick Response"]
  },
  {
    icon: Wrench,
    title: "Tire Change & Pumping",
    description: "Professional tire change services and inflation for under-inflated tires.",
    features: ["Flat Tire Repair", "Tire Inflation", "Mobile Service"]
  },
  {
    icon: Key,
    title: "Lockouts & Jumpstarts",
    description: "Emergency vehicle unlocking and battery jump-start services available 24/7.",
    features: ["Vehicle Unlocking", "Battery Jumpstart", "Emergency Access"]
  },
  {
    icon: Anchor,
    title: "Winch Outs",
    description: "Professional winch-out services for vehicles stuck in challenging terrains.",
    features: ["Mud Recovery", "Sand Extraction", "Safe Retrieval"]
  },
  {
    icon: Package,
    title: "Heavy Equipment Transport",
    description: "Specialized transport for industrial machinery, generators, and large equipment.",
    features: ["Industrial Machinery", "Generators", "Secure Transport"]
  },
  {
    icon: Trash2,
    title: "Junk Car Removal",
    description: "Free removal service for old, non-functional vehicles with responsible disposal.",
    features: ["Free Service", "All Vehicle Types", "Eco-Friendly"]
  },
  {
    icon: Crown,
    title: "Antique & Vintage Cars",
    description: "Specialized care for antique, luxury, and vintage vehicles with premium handling.",
    features: ["Premium Care", "Specialized Equipment", "Value Preservation"]
  }
];

const ServicesGrid: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive roadside assistance and towing services available 24/7 throughout Lagos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-4">
                    {service.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;