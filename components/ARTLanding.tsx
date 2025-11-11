import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Clock, MapPin, Star, Shield } from 'lucide-react';

const ARTLanding: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/687c280bbe5bd423bd10f60d_1759422831225_436f18c7.png" 
              alt="ART Services Logo" 
              className="h-16 w-auto"
            />
          </div>

          <div className="flex items-center space-x-4">
            <a href="/mobile-demo" className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
              📱 Live Demo
            </a>
            <a href="/driver-app" className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
              🚗 Driver App
            </a>
            <a href="/coverage" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Coverage Map
            </a>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              <Clock className="w-3 h-3 mr-1" />
              24/7 Available
            </Badge>
            <a href="/customer">
              <Button variant="outline">
                Customer Login
              </Button>
            </a>
            <a href="/admin">
              <Button variant="outline">
                Admin Login
              </Button>
            </a>
            <a href="/vendor">
              <Button className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
                Vendor Login
              </Button>
            </a>

          </div>
        </div>
      </header>


      {/* Hero Section with Background */}
      <section 
        className="py-20 px-4 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1758044588070_2f2f2227.webp')`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            United Kingdom's Most <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Reliable</span> Roadside Assistance
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Fast, professional, and licensed 24/7 towing and roadside assistance throughout United Kingdom. 
            Specialized EV services and traditional vehicle support.

          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-3">
              Request Service Now
            </Button>
            <a href="/mobile-demo">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3">
                📱 Try Mobile App Demo
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>

  );
};

export default ARTLanding;
