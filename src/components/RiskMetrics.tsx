import { Shield, Info, ChevronDown, Lock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect } from "react";

type Metadata = {
  source: "firehalls_db" | "building_db" | "exposure_db";
  dataType: string;
};

type RiskMetricsProps = {
  devMode?: boolean;
};

// Permission configuration - user has access to firehalls_db and building_db, but not exposure_db
const USER_PERMISSIONS: Record<"firehalls_db" | "building_db" | "exposure_db", boolean> = {
  firehalls_db: true,
  building_db: true,
  exposure_db: false,
};

const RiskMetrics = ({ devMode = false }: RiskMetricsProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [requestAccessDialogOpen, setRequestAccessDialogOpen] = useState(false);
  const [accessDocDialogOpen, setAccessDocDialogOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<"firehalls_db" | "building_db" | "exposure_db" | null>(null);
  const [requestEmail, setRequestEmail] = useState("");
  const [requestReason, setRequestReason] = useState("");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [businessListDialogOpen, setBusinessListDialogOpen] = useState(false);
  const [selectedOccupantType, setSelectedOccupantType] = useState<string | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

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

  // Mock business data for Risk Occupants
  const getBusinessesForOccupant = (occupantType: string) => {
    const businessMap: Record<string, string[]> = {
      "Bar": ["The Corner Pub", "Downtown Sports Bar"],
      "Tire Retailer": ["Quick Tire & Auto"],
    };
    return businessMap[occupantType] || [];
  };

  const handleOccupantClick = (occupantName: string, isPresent: boolean) => {
    if (isPresent) {
      setSelectedOccupantType(occupantName);
      setBusinessListDialogOpen(true);
    }
  };

  const buildingInfo = [
    { label: "Year Built", value: "1978", tooltip: "Original construction year", metadata: { source: "building_db" as const, dataType: "integer" } },
    { label: "Total Area", value: "12,500 sq ft", tooltip: "Total building square footage", metadata: { source: "building_db" as const, dataType: "string" } },
    { label: "Number of Stories", value: "3", tooltip: "Floors above ground", metadata: { source: "building_db" as const, dataType: "integer" } },
    { label: "Basement Size", value: "4,000 sq ft", tooltip: "Below-grade space", metadata: { source: "building_db" as const, dataType: "string" } },
    { label: "Electrical Update", value: "2015", tooltip: "Last major electrical system upgrade", metadata: { source: "building_db" as const, dataType: "integer" } },
    { label: "Heating Update", value: "2016", tooltip: "Last HVAC system upgrade", metadata: { source: "building_db" as const, dataType: "integer" } },
    { label: "Plumbing Update", value: "2012", tooltip: "Last plumbing system upgrade", metadata: { source: "building_db" as const, dataType: "integer" } },
  ];

  const hasAccess = (source: Metadata["source"]) => {
    return USER_PERMISSIONS[source];
  };

  const handlePermissionClick = (source: Metadata["source"]) => {
    setSelectedSource(source);
    if (hasAccess(source)) {
      setAccessDocDialogOpen(true);
    } else {
      setRequestAccessDialogOpen(true);
    }
  };

  const handleRequestAccess = () => {
    // In a real app, this would send the request to a backend
    console.log("Requesting access:", {
      source: selectedSource,
      email: requestEmail,
      reason: requestReason,
    });
    setRequestAccessDialogOpen(false);
    setRequestEmail("");
    setRequestReason("");
    setSelectedSource(null);
  };

  const getOpenSearchCode = (source: Metadata["source"]) => {
    const sourceMap: Record<string, { index: string; example: string }> = {
      firehalls_db: {
        index: "firehalls_db",
        example: `GET /firehalls_db/_search
{
  "query": {
    "match": {
      "location": "your-location-id"
    }
  }
}`,
      },
      building_db: {
        index: "building_db",
        example: `GET /building_db/_search
{
  "query": {
    "match": {
      "building_id": "your-building-id"
    }
  }
}`,
      },
      exposure_db: {
        index: "exposure_db",
        example: `GET /exposure_db/_search
{
  "query": {
    "match": {
      "property_id": "your-property-id"
    }
  }
}`,
      },
    };

    return sourceMap[source] || sourceMap.exposure_db;
  };

  const renderPermissionIndicator = (source: Metadata["source"]) => {
    if (!devMode) return null;

    const access = hasAccess(source);
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePermissionClick(source);
        }}
        className={`ml-2 px-2 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
          access
            ? "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
            : "bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
        }`}
        type="button"
      >
        {access ? (
          <>
            <CheckCircle2 className="h-3 w-3" />
            Access
          </>
        ) : (
          <>
            <Lock className="h-3 w-3" />
            Request Access
          </>
        )}
      </button>
    );
  };

  const handleMouseEnter = (fieldId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredField(fieldId);
  };

  const handleMouseLeave = () => {
    // Add a small delay before hiding to allow moving cursor to tooltip
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredField(null);
    }, 100);
  };

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
          onMouseEnter={() => handleMouseEnter(fieldId)}
          onMouseLeave={handleMouseLeave}
        >
          {value}
          {hoveredField === fieldId && (
            <div
              className="absolute z-50 w-64 p-3 mb-2 bg-popover border border-border rounded-md shadow-lg text-popover-foreground pointer-events-auto"
              style={{ bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "4px" }}
              onMouseEnter={() => handleMouseEnter(fieldId)}
              onMouseLeave={handleMouseLeave}
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
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/data-catalogue?db=${metadata.source}`);
                      }}
                      className="text-sm font-semibold text-primary hover:underline cursor-pointer"
                    >
                      {metadata.source}
                    </button>
                    {renderPermissionIndicator(metadata.source)}
                  </div>
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
            {riskOccupants.map((occupant) => {
              const fieldId = `risk-occupant-${occupant.name.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <div
                  key={occupant.name}
                  className={`flex items-center justify-between p-2 rounded ${
                    occupant.present ? "bg-red-50 border border-red-200" : "bg-muted/30"
                  } ${devMode ? "cursor-help" : ""}`}
                  onMouseEnter={devMode ? () => handleMouseEnter(fieldId) : undefined}
                  onMouseLeave={devMode ? handleMouseLeave : undefined}
                >
                  <span className="text-sm">{occupant.name}</span>
                  {devMode ? (
                    <div className="relative">
                      <Badge 
                        variant={occupant.present ? "destructive" : "secondary"} 
                        className={`text-xs ${occupant.present ? "cursor-pointer hover:bg-destructive/90" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOccupantClick(occupant.name, occupant.present);
                        }}
                      >
                        {occupant.present ? "Yes" : "No"}
                      </Badge>
                      {hoveredField === fieldId && (
                        <div
                          className="absolute z-50 w-64 p-3 mb-2 bg-popover border border-border rounded-md shadow-lg text-popover-foreground pointer-events-auto"
                          style={{ bottom: "100%", right: "0", marginBottom: "4px" }}
                          onMouseEnter={() => handleMouseEnter(fieldId)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs font-medium text-muted-foreground">Source:</span>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm font-semibold">exposure_db</p>
                                {renderPermissionIndicator("exposure_db")}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-muted-foreground">Data Type:</span>
                              <p className="text-sm font-semibold">boolean</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Badge 
                      variant={occupant.present ? "destructive" : "secondary"} 
                      className={`text-xs ${occupant.present ? "cursor-pointer hover:bg-destructive/90" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOccupantClick(occupant.name, occupant.present);
                      }}
                    >
                      {occupant.present ? "Yes" : "No"}
                    </Badge>
                  )}
                </div>
              );
            })}
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

      {/* Request Access Dialog */}
      <Dialog open={requestAccessDialogOpen} onOpenChange={setRequestAccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Access</DialogTitle>
            <DialogDescription>
              Request access to {selectedSource} database. Please provide your inact.net email and reason for access.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email (inact.net)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.name@inact.net"
                value={requestEmail}
                onChange={(e) => setRequestEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Access</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for requesting access to this database..."
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRequestAccessDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRequestAccess}
              disabled={!requestEmail || !requestReason || !requestEmail.includes("@inact.net")}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Access Documentation Dialog */}
      <Dialog open={accessDocDialogOpen} onOpenChange={setAccessDocDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Access Documentation</DialogTitle>
            <DialogDescription>
              How to access {selectedSource} via OpenSearch API
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>OpenSearch API Example</Label>
              <div className="bg-muted p-4 rounded-md border">
                <pre className="text-sm overflow-x-auto">
                  <code>{selectedSource && getOpenSearchCode(selectedSource).example}</code>
                </pre>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Index Name</Label>
              <div className="bg-muted p-3 rounded-md border">
                <code className="text-sm">{selectedSource && getOpenSearchCode(selectedSource).index}</code>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                <strong>Note:</strong> You need to authenticate using your API credentials. 
                Replace the placeholder values with your actual query parameters.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setAccessDocDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Business List Dialog */}
      <Dialog open={businessListDialogOpen} onOpenChange={setBusinessListDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Businesses - {selectedOccupantType}</DialogTitle>
            <DialogDescription>
              List of businesses in this building for {selectedOccupantType}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedOccupantType && getBusinessesForOccupant(selectedOccupantType).length > 0 ? (
              <div className="space-y-2">
                {getBusinessesForOccupant(selectedOccupantType).map((business, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted/50 rounded-md border border-border hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-medium">{business}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                <p className="text-sm">No businesses found for this occupant type.</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setBusinessListDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RiskMetrics;
