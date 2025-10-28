import { Shield, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RiskMetrics = () => {
  const riskOccupants = [
    { name: "Bar", present: true },
    { name: "Tire Retailer", present: true },
    { name: "Mattress Retailer", present: false },
    { name: "Furniture Retailer", present: false },
    { name: "Fireworks Retailer", present: false },
    { name: "Paint Retailer", present: false },
    { name: "Combustibles Retailer", present: false },
    { name: "Explosives Retailer", present: false },
    { name: "Pawn Shop", present: false },
    { name: "Tattoo Parlor", present: false },
  ];

  const buildingInfo = [
    { label: "Year Built", value: "1978", tooltip: "Original construction year" },
    { label: "Total Area", value: "12,500 sq ft", tooltip: "Total building square footage" },
    { label: "Number of Stories", value: "3", tooltip: "Floors above ground" },
    { label: "Basement Size", value: "4,000 sq ft", tooltip: "Below-grade space" },
    { label: "Electrical Update", value: "2015", tooltip: "Last major electrical system upgrade" },
    { label: "Heating Update", value: "2016", tooltip: "Last HVAC system upgrade" },
    { label: "Plumbing Update", value: "2012", tooltip: "Last plumbing system upgrade" },
  ];

  return (
    <Card className="shadow-lg animate-fade-in hover:shadow-xl transition-shadow">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Location Exposure & Risk Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Restaurant Indicator */}
        <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-help">
                  <span className="font-medium">Restaurant in Building</span>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Indicates if restaurants operate in same building</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Badge className="bg-primary text-primary-foreground">Yes</Badge>
        </div>

        {/* Risk Occupants */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            Risk Occupants in Same Building
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>High-risk business types that increase exposure</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {riskOccupants.map((occupant) => (
              <div
                key={occupant.name}
                className={`flex items-center justify-between p-2 rounded ${
                  occupant.present ? "bg-red-50 border border-red-200" : "bg-muted/30"
                }`}
              >
                <span className="text-sm">{occupant.name}</span>
                <Badge variant={occupant.present ? "destructive" : "secondary"} className="text-xs">
                  {occupant.present ? "Yes" : "No"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Building Occupants */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Total Occupants</label>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Neighborhood Risk</label>
            <Badge variant="secondary" className="mt-1 bg-orange-100 text-orange-800">Medium</Badge>
          </div>
        </div>

        {/* Other Businesses */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Other Businesses</label>
          <div className="flex flex-wrap gap-2">
            {["Café Express", "Tech Repair Hub", "Yoga Studio", "Print Shop", "Law Office", "Dental Clinic", "Marketing Agency"].map((business) => (
              <Badge key={business} variant="outline">{business}</Badge>
            ))}
          </div>
        </div>

        {/* Heritage Status */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-help">
                  <span className="font-medium">Heritage Status</span>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Whether building has heritage designation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Badge variant="secondary">No</Badge>
        </div>

        {/* Building Information */}
        <div>
          <h4 className="font-semibold mb-3">Building Information</h4>
          <div className="grid grid-cols-2 gap-3">
            {buildingInfo.map((info) => (
              <TooltipProvider key={info.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-3 bg-muted/30 rounded cursor-help hover:bg-muted/50 transition-colors">
                      <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        {info.label}
                        <Info className="h-3 w-3" />
                      </label>
                      <p className="text-lg font-semibold mt-1">{info.value}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{info.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Sprinkler System */}
        <div className="grid grid-cols-2 gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-3 bg-green-50 border border-green-200 rounded cursor-help">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    Sprinkler System
                    <Info className="h-3 w-3" />
                  </label>
                  <p className="text-lg font-semibold mt-1">Present</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Active fire suppression system installed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded cursor-help">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    Distance to Fire Hall
                    <Info className="h-3 w-3" />
                  </label>
                  <p className="text-lg font-semibold mt-1">0.8 km</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Distance to nearest fire station</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskMetrics;
