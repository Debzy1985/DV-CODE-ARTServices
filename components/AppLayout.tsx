import React from 'react';
import ARTLanding from './ARTLanding';
import EVFeatures from './EVFeatures';
import MobileApp from './MobileApp';
import LiveMobileDemo from './LiveMobileDemo';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <ARTLanding />
      <EVFeatures />
      
      {/* Live Mobile Demo Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">📱 Live Mobile App Demo</h2>
            <p className="text-blue-200 text-xl">Watch our customer app in action with real-time simulation</p>
          </div>
          <LiveMobileDemo />
        </div>
      </div>

      {/* Original Interactive Mobile App */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">🎮 Try It Yourself</h2>
            <p className="text-gray-600 text-lg">Interactive mobile app experience - test all features</p>
          </div>
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <MobileApp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
