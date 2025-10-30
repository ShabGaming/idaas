import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import SearchBar from "@/components/SearchBar";
import BusinessInfoCard from "@/components/BusinessInfoCard";
import BusinessSummary from "@/components/BusinessSummary";
import RiskMetrics from "@/components/RiskMetrics";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";

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
              
              {/* Business Information with embedded Map */}
              <BusinessInfoCard />
              
              {/* Business Summary - Collapsible */}
              <BusinessSummary />
              
              {/* Location Exposure & Risk Information */}
              <RiskMetrics />
            </div>
          </main>
          
          {/* AI Assistant */}
          <AIAssistant />
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
