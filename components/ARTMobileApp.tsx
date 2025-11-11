import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MobileApp from './MobileApp';

const ARTMobileApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('app');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">📱 ART Services Mobile App</h1>
          <p className="text-blue-200 text-lg">24/7 Emergency Roadside Assistance across the UK</p>

          <Badge className="mt-4 bg-green-500 text-white px-4 py-2">
            🟢 Live Demo Available
          </Badge>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="app" className="text-lg py-3">📱 Live App</TabsTrigger>
            <TabsTrigger value="features" className="text-lg py-3">✨ Features</TabsTrigger>
            <TabsTrigger value="services" className="text-lg py-3">🛠️ Services</TabsTrigger>
          </TabsList>

          <TabsContent value="app" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Mobile App Demo */}
              <div className="bg-white rounded-2xl shadow-2xl p-2 max-w-sm mx-auto">
                <div className="bg-black rounded-xl p-1">
                  <div className="bg-white rounded-lg overflow-hidden" style={{height: '600px'}}>
                    <MobileApp />
                  </div>
                </div>
              </div>
              
              {/* App Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🚀 Try the App
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Experience our mobile app interface designed specifically for emergency roadside assistance across the UK.
                    </p>


                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm">1</span>
                        <span>Select your emergency service type</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm">2</span>
                        <span>Enter location and contact details</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm">3</span>
                        <span>Choose from available service providers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm">4</span>
                        <span>Track your service in real-time</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">📊 App Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">15 min</div>
                        <div className="text-sm text-gray-600">Avg Response Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">4.8⭐</div>
                        <div className="text-sm text-gray-600">User Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">24/7</div>
                        <div className="text-sm text-gray-600">Availability</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">50+</div>
                        <div className="text-sm text-gray-600">Service Areas</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: '🚨',
                  title: 'Emergency Request',
                  description: 'Quick service request with location sharing and service type selection'
                },
                {
                  icon: '📍',
                  title: 'Real-time Tracking',
                  description: 'Track your service provider in real-time with ETA updates'
                },
                {
                  icon: '💳',
                  title: 'Multiple Payment',
                  description: 'Pay via mobile money, bank transfer, or cash on delivery'
                },
                {
                  icon: '⭐',
                  title: 'Provider Ratings',
                  description: 'Choose from rated service providers with transparent pricing'
                },
                {
                  icon: '📞',
                  title: 'Direct Communication',
                  description: 'Call or message your service provider directly through the app'
                },
                {
                  icon: '🔐',
                  title: 'Secure & Licensed',
                  description: 'All service providers are licensed and background-checked'
                }
              ].map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: '🚛',
                  title: 'Towing Services',
                  description: 'Local and long-haul towing with flatbed and wheel-lift options',
                  price: 'From £50'
                },
                {
                  icon: '⛽',
                  title: 'Fuel Delivery',
                  description: 'Emergency fuel delivery up to 10L gasoline or 15L diesel',
                  price: 'From £25'
                },
                {
                  icon: '🛞',
                  title: 'Tire Services',
                  description: 'Tire change, repair, and inflation services on-site',
                  price: 'From £30'
                },
                {
                  icon: '🔐',
                  title: 'Lockout Assistance',
                  description: 'Professional vehicle unlocking without damage',
                  price: 'From £40'
                },
                {
                  icon: '🔋',
                  title: 'Jump Start',
                  description: 'Battery jump start service to get you moving again',
                  price: 'From £20'
                },
                {
                  icon: '⚙️',
                  title: 'Winch Out',
                  description: 'Vehicle recovery from mud, sand, or difficult terrain',
                  price: 'From £60'
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {service.price}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ARTMobileApp;