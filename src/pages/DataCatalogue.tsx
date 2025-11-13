import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useState } from "react";
import Footer from "@/components/Footer";
import { DataCatalogueBrowser } from "@/components/DataCatalogueBrowser";
import { DatabaseMetadataPanel } from "@/components/DatabaseMetadataPanel";
import { Database, Schema, Table, databases } from "@/lib/mockDataCatalogue";

const DataCatalogue = () => {
  const [language, setLanguage] = useState<"EN" | "FR">("EN");
  const [devMode, setDevMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Database | Schema | Table | null>(null);
  const [selectedType, setSelectedType] = useState<"database" | "schema" | "table" | null>(null);
  const [selectedDbName, setSelectedDbName] = useState<string | undefined>(undefined);

  const handleSelect = (
    item: Database | Schema | Table,
    type: "database" | "schema" | "table",
    dbName?: string
  ) => {
    setSelectedItem(item);
    setSelectedType(type);
    setSelectedDbName(dbName);
  };

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
          
          <main className="flex-1 flex overflow-hidden">
            {/* Left: Tree Browser */}
            <div className="w-80 border-r bg-muted/30 flex flex-col">
              <div className="p-4 border-b">
                <h1 className="text-2xl font-bold">Data Catalogue</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse databases, schemas, and tables
                </p>
              </div>
              <DataCatalogueBrowser 
                databases={databases} 
                onSelect={handleSelect}
              />
            </div>

            {/* Right: Metadata Panel */}
            <div className="flex-1 p-6 overflow-hidden">
              <DatabaseMetadataPanel 
                selectedItem={selectedItem}
                selectedType={selectedType}
                dbName={selectedDbName}
              />
            </div>
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DataCatalogue;

