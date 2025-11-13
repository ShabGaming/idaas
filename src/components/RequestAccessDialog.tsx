import { useState } from "react";
import { Database } from "@/lib/mockDataCatalogue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RequestAccessDialogProps {
  database: Database | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequestAccessDialog({ database, open, onOpenChange }: RequestAccessDialogProps) {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 2 seconds and close dialog
    setTimeout(() => {
      setEmail("");
      setReason("");
      setSubmitted(false);
      onOpenChange(false);
    }, 2000);
  };

  if (!database) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Access to {database.name}</DialogTitle>
          <DialogDescription>
            {database.description}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="text-green-600 font-semibold mb-2">Request Submitted Successfully!</div>
            <p className="text-sm text-muted-foreground">
              Your access request has been sent. You will be notified once it's reviewed.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Intact Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.name@intact.ca"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern=".*@intact\.ca$"
                title="Please enter a valid Intact email address"
              />
              <p className="text-xs text-muted-foreground">
                Must be an @intact.ca email address
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Request *</Label>
              <Textarea
                id="reason"
                placeholder="Please describe why you need access to this database..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                rows={4}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

