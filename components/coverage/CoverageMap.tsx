import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign } from 'lucide-react';


interface CoverageArea {
  id: string;
  region: string;
  cities: string[];
  postcodes: string[];
  responseTime: string;
  basePrice: number;
  status: 'excellent' | 'good' | 'limited';
}

export const CoverageMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const coverageAreas: CoverageArea[] = [
    {
      id: '1',
      region: 'Greater London',
      cities: ['London', 'Westminster', 'Camden', 'Islington', 'Hackney'],
      postcodes: ['E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC'],
      responseTime: '15-25 mins',
      basePrice: 45,
      status: 'excellent'
    },
    {
      id: '2',
      region: 'South East England',
      cities: ['Brighton', 'Oxford', 'Reading', 'Southampton', 'Portsmouth'],
      postcodes: ['BN', 'OX', 'RG', 'SO', 'PO', 'GU', 'HP'],
      responseTime: '20-35 mins',
      basePrice: 40,
      status: 'excellent'
    },
    {
      id: '3',
      region: 'North West England',
      cities: ['Manchester', 'Liverpool', 'Preston', 'Chester', 'Bolton'],
      postcodes: ['M', 'L', 'PR', 'CH', 'BL', 'WA', 'OL'],
      responseTime: '18-30 mins',
      basePrice: 38,
      status: 'excellent'
    },
    {
      id: '4',
      region: 'West Midlands',
      cities: ['Birmingham', 'Coventry', 'Wolverhampton', 'Stoke', 'Worcester'],
      postcodes: ['B', 'CV', 'WV', 'ST', 'WR', 'DY'],
      responseTime: '20-35 mins',
      basePrice: 38,
      status: 'good'
    },
    {
      id: '5',
      region: 'Yorkshire',
      cities: ['Leeds', 'Sheffield', 'York', 'Bradford', 'Hull'],
      postcodes: ['LS', 'S', 'YO', 'BD', 'HU', 'HD'],
      responseTime: '22-40 mins',
      basePrice: 36,
      status: 'good'
    },
    {
      id: '6',
      region: 'Scotland',
      cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'],
      postcodes: ['EH', 'G', 'AB', 'DD', 'IV', 'FK'],
      responseTime: '25-45 mins',
      basePrice: 42,
      status: 'good'
    },
    {
      id: '7',
      region: 'Wales',
      cities: ['Cardiff', 'Swansea', 'Newport', 'Wrexham', 'Bangor'],
      postcodes: ['CF', 'SA', 'NP', 'LL', 'SY'],
      responseTime: '25-45 mins',
      basePrice: 38,
      status: 'good'
    },
    {
      id: '8',
      region: 'Northern Ireland',
      cities: ['Belfast', 'Derry', 'Lisburn', 'Newry', 'Armagh'],
      postcodes: ['BT'],
      responseTime: '30-50 mins',
      basePrice: 40,
      status: 'limited'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'limited': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <img
          src="https://d64gsuwffb70l.cloudfront.net/687c293affd067bf719540b5_1759418104966_fdaf0610.webp"
          alt="UK Coverage Map"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {coverageAreas.map((area) => (
          <Card
            key={area.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              selectedRegion === area.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedRegion(area.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{area.region}</h3>
                <Badge className={`${getStatusColor(area.status)} text-white mt-1`}>
                  {area.status.toUpperCase()}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-gray-600">
                  {area.cities.slice(0, 3).join(', ')}
                  {area.cities.length > 3 && ` +${area.cities.length - 3} more`}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-gray-600">Response: {area.responseTime}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-orange-600" />

                <span className="text-gray-600">From £{area.basePrice}</span>
              </div>
              
              <div className="mt-2 pt-2 border-t">
                <p className="text-xs text-gray-500">
                  Postcodes: {area.postcodes.join(', ')}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
