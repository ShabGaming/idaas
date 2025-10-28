import { MapPin, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MapView = () => {
  return (
    <Card className="shadow-lg animate-fade-in hover:shadow-xl transition-shadow">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Location Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-[400px] bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
          {/* Simplified map representation */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-4 h-full">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>
          
          {/* Main business marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
              <div className="relative bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
                <Building className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card px-3 py-1 rounded shadow-md whitespace-nowrap text-sm font-medium">
                Evergreen Bistro
              </div>
            </div>
          </div>
          
          {/* Fire hall markers */}
          <div className="absolute top-[30%] right-[25%] animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group cursor-pointer">
              <div className="bg-red-600 text-white p-2 rounded-full shadow-lg">
                <Flame className="h-5 w-5" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card px-2 py-1 rounded shadow-md whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Fire Hall - 0.8 km
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-[25%] left-[30%] animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative group cursor-pointer">
              <div className="bg-red-600 text-white p-2 rounded-full shadow-lg">
                <Flame className="h-5 w-5" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card px-2 py-1 rounded shadow-md whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Fire Hall - 1.2 km
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur p-3 rounded shadow-lg text-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-primary p-1 rounded-full">
                <Building className="h-3 w-3 text-primary-foreground" />
              </div>
              <span>Target Business</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-red-600 p-1 rounded-full">
                <Flame className="h-3 w-3 text-white" />
              </div>
              <span>Fire Hall</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Building = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

export default MapView;
