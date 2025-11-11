import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Target, DollarSign, Building, Shield, Zap, AlertTriangle } from 'lucide-react';

const BusinessModel: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Business Model & Strategy</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive approach to dominating the Lagos roadside assistance market
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <Target className="w-6 h-6 mr-2" />
                Mission Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To deliver fast, reliable, and efficient roadside assistance to vehicle owners in Lagos, 
                ensuring safety, peace of mind, and timely service.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <TrendingUp className="w-6 h-6 mr-2" />
                Vision Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                To become the leading provider of roadside assistance and towing services in Lagos, 
                expanding our operations across Nigeria with exceptional customer service and innovative technology.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* SWOT Analysis */}
        <div className="mb-12">
          <h4 className="text-2xl font-bold text-center mb-8">SWOT Analysis</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-green-700">
                  <li>• Highly qualified service providers</li>
                  <li>• Established transportation network</li>
                  <li>• Cost advantages</li>
                  <li>• Strong customer loyalty</li>
                  <li>• Reputation for reliability</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Weaknesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-red-700">
                  <li>• Limited initial capital</li>
                  <li>• Scalability challenges</li>
                  <li>• High operational costs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-blue-700">
                  <li>• Growth of online services</li>
                  <li>• Market expansion</li>
                  <li>• Increasing vehicle numbers</li>
                  <li>• Aging vehicle fleet</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Threats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-yellow-700">
                  <li>• Economic downturn</li>
                  <li>• Increased competition</li>
                  <li>• Regulatory changes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Target Audience */}
        <div className="mb-12">
          <h4 className="text-2xl font-bold text-center mb-8">Target Audience</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Individual Vehicle Owners", desc: "Emergency roadside assistance for personal vehicles" },
              { icon: Building, title: "Vehicle Servicing Centers", desc: "Partnerships with auto repair shops" },
              { icon: DollarSign, title: "Private Companies", desc: "Car dealerships, logistics firms, fleet operators" },
              { icon: Shield, title: "Insurance Companies", desc: "Roadside assistance partnerships" }
            ].map((audience, index) => {
              const IconComponent = audience.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{audience.desc}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;