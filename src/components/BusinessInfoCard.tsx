import { Building, Star, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BusinessInfoCard = () => {
  return (
    <Card className="shadow-lg animate-fade-in hover:shadow-xl transition-shadow">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          Business Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
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
      </CardContent>
    </Card>
  );
};

export default BusinessInfoCard;
