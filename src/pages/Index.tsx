import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import SearchBar from "@/components/SearchBar";
import BusinessInfoCard from "@/components/BusinessInfoCard";
import MapView from "@/components/MapView";
import AIRiskSummary from "@/components/AIRiskSummary";
import RiskMetrics from "@/components/RiskMetrics";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 container mx-auto px-6 py-8">
            <div className="space-y-6">
              {/* Search Section */}
              <SearchBar />
              
              {/* Business Information & Map - Combined Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BusinessInfoCard />
                <MapView />
              </div>
              
              {/* AI Risk Summary - Collapsible */}
              <AIRiskSummary />
              
              {/* Location Exposure & Risk Information */}
              <RiskMetrics />
            </div>
          </main>
          
          {/* AI Assistant */}
          <AIAssistant />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
