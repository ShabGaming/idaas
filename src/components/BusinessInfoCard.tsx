import { Building, Star, MapPin, ExternalLink, Flame, Beer, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const BusinessInfoCard = () => {
  const [showRiskLocations, setShowRiskLocations] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));

  return (
    <Card className="shadow-lg animate-fade-in hover:shadow-xl transition-shadow">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          Business Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Business details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Business Name</label>
              <p className="text-xl font-semibold text-foreground">Evergreen Bistro</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <p className="text-lg font-medium">Restaurant</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Rating</label>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-medium">4.5</span>
                  <Badge variant="secondary" className="ml-2">A+</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Building</label>
              <p className="text-lg font-medium">Queen Plaza</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Location
              </label>
              <p className="text-base">123 Queen St W, Toronto, ON M5H 2M9</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <ExternalLink className="h-4 w-4" />
                Website
              </label>
              <a 
                href="https://www.evergreenbistro-demo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline text-base transition-colors"
              >
                www.evergreenbistro-demo.com
              </a>
            </div>
          </div>

          {/* Right: Embedded map with controls */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">Location Map</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={showRiskLocations ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowRiskLocations(!showRiskLocations)}
                  className="text-xs transition-all"
                >
                  {showRiskLocations ? "Hide" : "Show"} Risk Exposures
                </Button>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleZoomOut}>
                    -
                  </Button>
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleZoomIn}>
                    +
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden rounded-md border">
              <div 
                className="absolute inset-0 transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
              >
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

                {/* Risk exposure markers - conditional */}
                {showRiskLocations && (
                  <>
                    <div className="absolute top-[40%] left-[55%] animate-fade-in" style={{ animationDelay: '0.4s' }}>
                      <div className="relative group cursor-pointer">
                        <div className="bg-orange-500 text-white p-2 rounded-full shadow-lg">
                          <Beer className="h-4 w-4" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card px-2 py-1 rounded shadow-md whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          Bar - Same Building
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-[60%] left-[45%] animate-fade-in" style={{ animationDelay: '0.5s' }}>
                      <div className="relative group cursor-pointer">
                        <div className="bg-amber-600 text-white p-2 rounded-full shadow-lg">
                          <Home className="h-4 w-4" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card px-2 py-1 rounded shadow-md whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          Tire Retailer - 50m
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur p-3 rounded shadow-lg text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-primary p-1 rounded-full">
                    <Building className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span>Target Business</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-red-600 p-1 rounded-full">
                    <Flame className="h-3 w-3 text-white" />
                  </div>
                  <span>Fire Hall</span>
                </div>
                {showRiskLocations && (
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-500 p-1 rounded-full">
                      <Beer className="h-3 w-3 text-white" />
                    </div>
                    <span>Risk Exposure</span>
                  </div>
                )}
              </div>
            </div>

            
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInfoCard;
