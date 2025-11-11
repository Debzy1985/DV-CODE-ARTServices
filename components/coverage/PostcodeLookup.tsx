import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';

interface PostcodeResult {
  postcode: string;
  region: string;
  covered: boolean;
  responseTime?: string;
  basePrice?: number;
  nearestCity?: string;
}

export const PostcodeLookup = () => {
  const [postcode, setPostcode] = useState('');
  const [result, setResult] = useState<PostcodeResult | null>(null);
  const [loading, setLoading] = useState(false);

  const postcodeData: Record<string, PostcodeResult> = {
    'E': { postcode: 'E', region: 'East London', covered: true, responseTime: '15-20 mins', basePrice: 45, nearestCity: 'London' },
    'EC': { postcode: 'EC', region: 'East Central London', covered: true, responseTime: '15-20 mins', basePrice: 45, nearestCity: 'London' },
    'N': { postcode: 'N', region: 'North London', covered: true, responseTime: '18-25 mins', basePrice: 45, nearestCity: 'London' },
    'NW': { postcode: 'NW', region: 'North West London', covered: true, responseTime: '18-25 mins', basePrice: 45, nearestCity: 'London' },
    'SE': { postcode: 'SE', region: 'South East London', covered: true, responseTime: '18-25 mins', basePrice: 45, nearestCity: 'London' },
    'SW': { postcode: 'SW', region: 'South West London', covered: true, responseTime: '18-25 mins', basePrice: 45, nearestCity: 'London' },
    'W': { postcode: 'W', region: 'West London', covered: true, responseTime: '15-20 mins', basePrice: 45, nearestCity: 'London' },
    'WC': { postcode: 'WC', region: 'West Central London', covered: true, responseTime: '15-20 mins', basePrice: 45, nearestCity: 'London' },
    'M': { postcode: 'M', region: 'Manchester', covered: true, responseTime: '18-30 mins', basePrice: 38, nearestCity: 'Manchester' },
    'L': { postcode: 'L', region: 'Liverpool', covered: true, responseTime: '20-35 mins', basePrice: 38, nearestCity: 'Liverpool' },
    'B': { postcode: 'B', region: 'Birmingham', covered: true, responseTime: '20-35 mins', basePrice: 38, nearestCity: 'Birmingham' },
    'LS': { postcode: 'LS', region: 'Leeds', covered: true, responseTime: '22-40 mins', basePrice: 36, nearestCity: 'Leeds' },
    'EH': { postcode: 'EH', region: 'Edinburgh', covered: true, responseTime: '25-45 mins', basePrice: 42, nearestCity: 'Edinburgh' },
    'G': { postcode: 'G', region: 'Glasgow', covered: true, responseTime: '25-45 mins', basePrice: 42, nearestCity: 'Glasgow' },
    'CF': { postcode: 'CF', region: 'Cardiff', covered: true, responseTime: '25-45 mins', basePrice: 38, nearestCity: 'Cardiff' },
    'BT': { postcode: 'BT', region: 'Belfast', covered: true, responseTime: '30-50 mins', basePrice: 40, nearestCity: 'Belfast' },
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const prefix = postcode.toUpperCase().replace(/[0-9\s]/g, '');
      const found = postcodeData[prefix];
      
      if (found) {
        setResult(found);
      } else {
        setResult({
          postcode: postcode.toUpperCase(),
          region: 'Unknown',
          covered: false
        });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-4">Check Your Postcode</h3>
      <p className="text-gray-600 mb-6">
        Enter your postcode to see if we cover your area and get instant pricing
      </p>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="e.g., SW1A 1AA"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={loading || !postcode}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {result && (
        <div className={`p-4 rounded-lg border-2 ${
          result.covered ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
        }`}>
          <div className="flex items-start gap-3">
            {result.covered ? (
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 mt-1" />
            )}
            
            <div className="flex-1">
              <h4 className="font-semibold text-lg mb-2">
                {result.covered ? 'Great News! We Cover Your Area' : 'Not Yet Available'}
              </h4>
              
              {result.covered ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>{result.region} - {result.nearestCity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>Response Time: {result.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-orange-600" />

                    <span>Starting from £{result.basePrice}</span>
                  </div>
                  <Button className="mt-4 w-full">Book Service Now</Button>
                </div>
              ) : (
                <p className="text-sm text-gray-700">
                  We're expanding rapidly. Join our waitlist to be notified when we launch in your area.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
