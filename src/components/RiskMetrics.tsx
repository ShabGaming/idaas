import { Shield, Info, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

type Metadata = {
  source: "firehalls_db" | "building_db" | "exposure_db";
  dataType: string;
};

type RiskMetricsProps = {
  devMode?: boolean;
};

const RiskMetrics = ({ devMode = false }: RiskMetricsProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

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
    { label: "Year Built", value: "1978", tooltip: "Original construction year", metadata: { source: "building_db" as const, dataType: "integer" } },
    { label: "Total Area", value: "12,500 sq ft", tooltip: "Total building square footage", metadata: { source: "building_db" as const, dataType: "string" } },
    { label: "Number of Stories", value: "3", tooltip: "Floors above ground", metadata: { source: "building_db" as const, dataType: "integer" } },
    { label: "Basement Size", value: "4,000 sq ft", tooltip: "Below-grade space", metadata: { source: "building_db" as const, dataType: "string" } },
    { label: "Electrical Update", value: "2015", tooltip: "Last major electrical system upgrade", metadata: { source: "building_db" as const, dataType: "integer" } },
    { label: "Heating Update", value: "2016", tooltip: "Last HVAC system upgrade", metadata: { source: "building_db" as const, dataType: "integer" } },
    { label: "Plumbing Update", value: "2012", tooltip: "Last plumbing system upgrade", metadata: { source: "building_db" as const, dataType: "integer" } },
  ];

  const renderFieldWithMetadata = (
    fieldId: string,
    label: string,
    value: React.ReactNode,
    metadata: Metadata,
    className?: string,
    tooltipText?: string
  ) => {
    if (devMode) {
      return (
        <div
          className={`relative ${className || "cursor-help"}`}
          onMouseEnter={() => setHoveredField(fieldId)}
          onMouseLeave={() => setHoveredField(null)}
        >
          {value}
          {hoveredField === fieldId && (
            <div
              className="absolute z-50 w-64 p-3 mb-2 bg-popover border border-border rounded-md shadow-lg text-popover-foreground pointer-events-auto"
              style={{ bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "4px" }}
              onMouseEnter={() => setHoveredField(fieldId)}
              onMouseLeave={() => setHoveredField(null)}
            >
              <div className="space-y-2">
                {tooltipText && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Description:</span>
                    <p className="text-sm">{tooltipText}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Source:</span>
                  <p className="text-sm font-semibold">{metadata.source}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Data Type:</span>
                  <p className="text-sm font-semibold">{metadata.dataType}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    return <div className={className}>{value}</div>;
  };

  return (
    <Card className="shadow-lg animate-fade-in hover:shadow-xl transition-shadow">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Location Exposure & Risk Information
            </CardTitle>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-6 space-y-6">
        {/* Restaurant Indicator */}
        <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
          <TooltipProvider>
            {!devMode ? (
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
            ) : (
              <div className="flex items-center gap-2 cursor-help">
                <span className="font-medium">Restaurant in Building</span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </TooltipProvider>
          {renderFieldWithMetadata(
            "restaurant-in-building",
            "Restaurant in Building",
            <Badge className="bg-primary text-primary-foreground">Yes</Badge>,
            { source: "exposure_db", dataType: "boolean" },
            undefined,
            "Indicates if restaurants operate in same building"
          )}
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
                {renderFieldWithMetadata(
                  `risk-occupant-${occupant.name.toLowerCase().replace(/\s+/g, "-")}`,
                  occupant.name,
                  <Badge variant={occupant.present ? "destructive" : "secondary"} className="text-xs">
                    {occupant.present ? "Yes" : "No"}
                  </Badge>,
                  { source: "exposure_db", dataType: "boolean" }
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Building Occupants */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Total Occupants</label>
            {renderFieldWithMetadata(
              "total-occupants",
              "Total Occupants",
              <p className="text-2xl font-bold">8</p>,
              { source: "exposure_db", dataType: "integer" }
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Neighborhood Risk</label>
            {renderFieldWithMetadata(
              "neighborhood-risk",
              "Neighborhood Risk",
              <p className="text-2xl font-bold">Medium</p>,
              { source: "exposure_db", dataType: "string" }
            )}
          </div>
        </div>

        {/* Other Businesses */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Other Businesses</label>
          <div className="flex flex-wrap gap-2">
            {["Café Express", "Tech Repair Hub", "Yoga Studio", "Print Shop", "Law Office", "Dental Clinic", "Marketing Agency"].map((business) => (
              <div key={business}>
                {renderFieldWithMetadata(
                  `other-business-${business.toLowerCase().replace(/\s+/g, "-")}`,
                  business,
                  <Badge variant="outline">{business}</Badge>,
                  { source: "exposure_db", dataType: "string" }
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Heritage Status */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <TooltipProvider>
            {!devMode ? (
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
            ) : (
              <div className="flex items-center gap-2 cursor-help">
                <span className="font-medium">Heritage Status</span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </TooltipProvider>
          {renderFieldWithMetadata(
            "heritage-status",
            "Heritage Status",
            <Badge variant="secondary">No</Badge>,
            { source: "building_db", dataType: "boolean" },
            undefined,
            "Whether building has heritage designation"
          )}
        </div>

        {/* Building Information */}
        <div>
          <h4 className="font-semibold mb-3">Building Information</h4>
          <div className="grid grid-cols-2 gap-3">
            {buildingInfo.map((info) => (
              <TooltipProvider key={info.label}>
                {!devMode ? (
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
                ) : (
                  <div className="p-3 bg-muted/30 rounded cursor-help hover:bg-muted/50 transition-colors">
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                      {info.label}
                      <Info className="h-3 w-3" />
                    </label>
                    {renderFieldWithMetadata(
                      `building-info-${info.label.toLowerCase().replace(/\s+/g, "-")}`,
                      info.label,
                      <p className="text-lg font-semibold mt-1">{info.value}</p>,
                      info.metadata,
                      undefined,
                      info.tooltip
                    )}
                  </div>
                )}
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Sprinkler System */}
        <div className="grid grid-cols-2 gap-4">
          <TooltipProvider>
            {!devMode ? (
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
            ) : (
              <div className="p-3 bg-green-50 border border-green-200 rounded cursor-help">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  Sprinkler System
                  <Info className="h-3 w-3" />
                </label>
                {renderFieldWithMetadata(
                  "sprinkler-system",
                  "Sprinkler System",
                  <p className="text-lg font-semibold mt-1">Present</p>,
                  { source: "building_db", dataType: "boolean" },
                  undefined,
                  "Active fire suppression system installed"
                )}
              </div>
            )}
          </TooltipProvider>

          <TooltipProvider>
            {!devMode ? (
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
            ) : (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded cursor-help">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  Distance to Fire Hall
                  <Info className="h-3 w-3" />
                </label>
                {renderFieldWithMetadata(
                  "distance-to-fire-hall",
                  "Distance to Fire Hall",
                  <p className="text-lg font-semibold mt-1">0.8 km</p>,
                  { source: "firehalls_db", dataType: "string" },
                  undefined,
                  "Distance to nearest fire station"
                )}
              </div>
            )}
          </TooltipProvider>
        </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default RiskMetrics;
