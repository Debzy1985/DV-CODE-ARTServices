import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const LiveMobileDemo: React.FC = () => {
  const [demoStep, setDemoStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const demoSteps = [
    { title: 'Request Service', description: 'Customer selects service type and location' },
    { title: 'Find Providers', description: 'System finds nearby available drivers' },
    { title: 'Live Tracking', description: 'Real-time GPS tracking of driver arrival' },
    { title: 'Service Complete', description: 'Payment and rating confirmation' }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % demoSteps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPlaying, demoSteps.length]);

  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 py-12">
      {/* Phone Mockup */}
      <div className="relative">
        <div className="w-[320px] h-[640px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
            
            {/* Demo Content */}
            <div className="h-full overflow-y-auto pt-8 pb-4 px-4">
              {demoStep === 0 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg">
                    <h2 className="text-xl font-bold">🚛 ART Services</h2>
                    <p className="text-sm">24/7 Roadside Assistance</p>
                  </div>
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">🆘 Request Service</h3>
                    <div className="space-y-2">
                      <div className="bg-white p-2 rounded border">⚡ EV Towing</div>
                      <div className="bg-white p-2 rounded border">📍 London, SW1A 1AA</div>
                      <div className="bg-white p-2 rounded border">📞 +44 7700 900123</div>
                      <button className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold mt-2">
                        Request Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {demoStep === 1 && (
                <div className="space-y-3 animate-fade-in">
                  <h3 className="font-bold text-lg">Available Providers</h3>
                  {[
                    { name: 'UK Tow Pro', eta: '12 mins', price: '£85', rating: '4.8' },
                    { name: 'Quick Response', eta: '18 mins', price: '£72', rating: '4.7' },
                    { name: 'Pro Auto Rescue', eta: '15 mins', price: '£90', rating: '4.9' }
                  ].map((provider, idx) => (
                    <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-blue-500 transition-all">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{provider.name}</p>
                          <p className="text-xs text-gray-600">⭐ {provider.rating} • ⏱️ {provider.eta}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{provider.price}</p>
                          <Badge className="bg-green-100 text-green-800 text-xs">Available</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {demoStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <h3 className="font-bold text-green-800 mb-2">✅ Driver En Route</h3>
                    <div className="text-center space-y-3">
                      <div className="text-4xl">🚛</div>
                      <p className="font-semibold">UK Tow Pro</p>
                      <Badge className="bg-green-500 text-white">ETA: 12 minutes</Badge>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 h-48 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100"></div>
                    <div className="relative text-center">
                      <div className="text-6xl animate-pulse">📍</div>
                      <p className="text-sm text-gray-600 mt-2">Live GPS Tracking</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600">📞 Call</Button>
                    <Button variant="outline" className="flex-1">💬 Chat</Button>
                  </div>
                </div>
              )}

              {demoStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-lg p-6 text-center">
                    <div className="text-5xl mb-3">✅</div>
                    <h3 className="text-xl font-bold mb-2">Service Complete!</h3>
                    <p className="text-sm">Your vehicle has been safely towed</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-semibold">EV Towing</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-semibold">45 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="font-bold text-green-600">£85.00</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm mb-2">Rate your experience</p>
                    <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Live Indicator */}
        <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          LIVE DEMO
        </div>
      </div>

      {/* Demo Controls */}
      <div className="space-y-4 max-w-md">
        <h3 className="text-2xl font-bold text-gray-800">Interactive Mobile Experience</h3>
        <p className="text-gray-600">Watch how customers interact with our mobile app in real-time</p>
        
        <div className="space-y-3">
          {demoSteps.map((step, idx) => (
            <Card 
              key={idx}
              className={`p-4 cursor-pointer transition-all ${
                demoStep === idx 
                  ? 'border-2 border-blue-500 bg-blue-50' 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => {
                setDemoStep(idx);
                setIsPlaying(false);
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  demoStep === idx ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full"
          variant={isPlaying ? "outline" : "default"}
        >
          {isPlaying ? '⏸️ Pause Demo' : '▶️ Play Demo'}
        </Button>
      </div>
    </div>
  );
};

export default LiveMobileDemo;
