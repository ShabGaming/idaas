import { Brain, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AIRiskSummary = () => {
  return (
    <Card className="shadow-lg animate-fade-in hover:shadow-xl transition-shadow border-l-4 border-l-primary">
      <CardHeader className="border-b bg-accent/30">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Risk Summary
          <Badge variant="secondary" className="ml-auto">Auto-Generated</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex gap-3 mb-4">
          <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-lg mb-2">Medium-High Risk Profile</p>
            <p className="text-muted-foreground leading-relaxed">
              This property's exposure is elevated due to nearby bar and tire retailers within the same building, 
              and the structure's age (built 1978) increases fire vulnerability. The presence of combustible materials 
              from tire retail operations creates additional concern. However, proximity to fire halls (0.8 km) and 
              presence of sprinkler systems provide moderate mitigation.
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium mb-2">Key Risk Drivers:</p>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Building age and outdated infrastructure</li>
            <li>• High-risk occupants in same structure</li>
            <li>• Dense urban location with multiple tenants</li>
            <li>• Last major updates over 8 years ago</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRiskSummary;
