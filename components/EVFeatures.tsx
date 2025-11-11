import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Battery, Zap, Shield, Clock } from 'lucide-react';

const EVFeatures: React.FC = () => {
  const evServices = [
    {
      icon: <Battery className="h-8 w-8 text-green-500" />,
      title: "EV Battery Service",
      description: "Specialized EV battery diagnostics, replacement, and emergency power assistance",
      features: ["Battery Health Check", "Emergency Power", "Battery Replacement", "Diagnostic Tools"]
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Mobile EV Charging",
      description: "On-demand mobile charging service to get you back on the road quickly",
      features: ["Fast Charging", "Emergency Charge", "Multiple Connectors", "24/7 Available"]
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Specialized EV Towing",
      description: "Flatbed towing designed specifically for electric vehicles to prevent damage",
      features: ["Flatbed Only", "EV-Safe Transport", "Trained Technicians", "Insurance Covered"]
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: "24/7 EV Support",
      description: "Round-the-clock support for all electric vehicle emergencies and needs",
      features: ["24/7 Availability", "EV Specialists", "Quick Response", "Emergency Hotline"]
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-green-100 text-green-800 mb-4">⚡ EV SERVICES</Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Comprehensive Electric Vehicle Support
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Specialized services designed for electric vehicles with trained technicians and proper equipment
          </p>
          <a 
            href="/coverage" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Coverage Map & Pricing
          </a>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {evServices.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                  {service.icon}
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EVFeatures;