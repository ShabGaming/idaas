import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FeedbackPanel from "./FeedbackPanel";

const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-border bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFeedbackOpen(true)}
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            DAAS Platform Mockup - Provide Feedback
          </Button>
        </div>
      </footer>

      <FeedbackPanel 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </>
  );
};

export default Footer;
