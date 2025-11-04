import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import SearchBar from "@/components/SearchBar";
import BusinessInfoCard from "@/components/BusinessInfoCard";
import BusinessSummary from "@/components/BusinessSummary";
import { useState } from "react";
import RiskMetrics from "@/components/RiskMetrics";
import AIAssistant from "@/components/AIAssistant";
import Footer from "@/components/Footer";

const Index = () => {
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const [devMode, setDevMode] = useState(false);
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader 
            language={language} 
            onChangeLanguage={setLanguage}
            devMode={devMode}
            onDevModeChange={setDevMode}
          />
          
          <main className="flex-1 container mx-auto px-6 py-8">
            <div className="space-y-6">
              {/* Search Section */}
              <SearchBar />
              
              {/* Business Information with embedded Map */}
              <BusinessInfoCard lang={language === "FR" ? "FR" : "EN"} />
              
              {/* Business Summary - Collapsible */}
              <BusinessSummary lang={language === "FR" ? "FR" : "EN"} />
              
              {/* Location Exposure & Risk Information */}
              <RiskMetrics devMode={devMode} />
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
