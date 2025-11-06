import { Download, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type Props = {
  language?: "EN" | "FR";
  onChangeLanguage?: (lang: "EN" | "FR") => void;
  devMode?: boolean;
  onDevModeChange?: (enabled: boolean) => void;
};

const DashboardHeader = ({ 
  language: controlledLanguage, 
  onChangeLanguage,
  devMode: controlledDevMode,
  onDevModeChange
}: Props) => {
  const [uncontrolledLanguage, setUncontrolledLanguage] = useState<"EN" | "FR">("EN");
  const [uncontrolledDevMode, setUncontrolledDevMode] = useState(false);
  const language = controlledLanguage ?? uncontrolledLanguage;
  const devMode = controlledDevMode ?? uncontrolledDevMode;

  const handleDownloadReport = () => {
    console.log("Downloading report...");
  };

  const toggleLanguage = (lang: "EN" | "FR") => {
    if (onChangeLanguage) {
      onChangeLanguage(lang);
    } else {
      setUncontrolledLanguage(lang);
    }
    console.log(`Language changed to ${lang}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span>{language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toggleLanguage("EN")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleLanguage("FR")}>
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Advanced Mode Toggle */}
          <div className="flex items-center gap-2 px-2">
            <Label htmlFor="dev-mode" className="text-sm cursor-pointer">
              Advance Mode
            </Label>
            <Switch
              id="dev-mode"
              checked={devMode}
              onCheckedChange={(checked) => {
                if (onDevModeChange) {
                  onDevModeChange(checked);
                } else {
                  setUncontrolledDevMode(checked);
                }
              }}
            />
          </div>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Download Report Button */}
          <Button
            onClick={handleDownloadReport}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            size="sm"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download Report</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
