import React from 'react';
import ARTLanding from './ARTLanding';
import ServicesGrid from './ServicesGrid';
import BusinessModel from './BusinessModel';
import Wireframes from './Wireframes';
import UIUXDesign from './UIUXDesign';
import ARTMobileApp from './ARTMobileApp';

const ARTServicesApp: React.FC = () => {
  return (
    <div className="min-h-screen">
      <ARTLanding />
      <ServicesGrid />
      <BusinessModel />
      <Wireframes />
      <UIUXDesign />
      <ARTMobileApp />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">ART Services</h4>
              <p className="text-gray-300 text-sm">
                Licensed 24/7 roadside assistance and towing service provider across the UK.
              </p>

            </div>
            <div>
              <h5 className="font-semibold mb-3">Services</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Towing Services</li>
                <li>Fuel Delivery</li>
                <li>Tire Change</li>
                <li>Lockout Assistance</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Contact</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>📞 Emergency: 999</li>
                <li>📱 Hotline: 0800 278 4357</li>
                <li>📧 info@artservices.co.uk</li>
                <li>📍 London, United Kingdom</li>
              </ul>

            </div>
            <div>
              <h5 className="font-semibold mb-3">Available 24/7</h5>
              <div className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium inline-block">
                🟢 Always Ready to Help
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 ART Services. All rights reserved. Licensed roadside assistance provider.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ARTServicesApp;