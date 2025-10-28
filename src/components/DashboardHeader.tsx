import { Building2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const handleDownloadReport = () => {
    // Mock download functionality
    console.log("Downloading report...");
  };

  return (
    <header className="bg-secondary text-secondary-foreground shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Intact Financial</h1>
            <p className="text-sm opacity-90">Risk Intelligence Dashboard</p>
          </div>
        </div>
        
        <Button 
          onClick={handleDownloadReport}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
