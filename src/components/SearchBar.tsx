import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("Evergreen Bistro");

  return (
    <div className="bg-card rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by business name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="or search by location..."
            defaultValue="Toronto, Ontario"
            className="pl-10 h-12 text-lg"
          />
        </div>
      </div>
      
      <div className="mt-3 flex gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground">Recent searches:</span>
        <button className="text-sm text-primary hover:underline">Evergreen Bistro</button>
        <span className="text-muted-foreground">•</span>
        <button className="text-sm text-primary hover:underline">123 Queen St W</button>
        <span className="text-muted-foreground">•</span>
        <button className="text-sm text-primary hover:underline">Downtown Core</button>
      </div>
    </div>
  );
};

export default SearchBar;
