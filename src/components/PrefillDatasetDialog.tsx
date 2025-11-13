import { useState, useRef } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Upload, File, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrefillDatasetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  databases: Database[];
}

export function PrefillDatasetDialog({ open, onOpenChange, databases }: PrefillDatasetDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDatabases, setSelectedDatabases] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get databases with access (rowCount > 0)
  const databasesWithAccess = databases.filter((db) => db.rowCount > 0);

  const acceptedFileTypes = [".feather", ".csv", ".xlsx", ".xls"];
  const acceptedMimeTypes = [
    "application/vnd.apache.arrow.feather",
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (acceptedFileTypes.includes(fileExtension) || acceptedMimeTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        alert(`Please select a valid file type: ${acceptedFileTypes.join(", ")}`);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleDatabase = (dbName: string) => {
    const newSelected = new Set(selectedDatabases);
    if (newSelected.has(dbName)) {
      newSelected.delete(dbName);
    } else {
      newSelected.add(dbName);
    }
    setSelectedDatabases(newSelected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    if (selectedDatabases.size === 0) {
      alert("Please select at least one database");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 2 seconds and close dialog
    setTimeout(() => {
      setSelectedFile(null);
      setSelectedDatabases(new Set());
      setSubmitted(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onOpenChange(false);
    }, 2000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSelectedFile(null);
      setSelectedDatabases(new Set());
      setSubmitted(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onOpenChange(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    return <File className="h-5 w-5" />;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Prefill Dataset</DialogTitle>
          <DialogDescription>
            Upload a data file and select target databases to prefill with the dataset.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="text-green-600 font-semibold mb-2">Dataset Prefill Initiated!</div>
            <p className="text-sm text-muted-foreground">
              Your file is being processed and will be loaded into the selected databases.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Area */}
            <div className="space-y-2">
              <Label>Upload File</Label>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
                  selectedFile
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                )}
              >
                {selectedFile ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      {getFileIcon(selectedFile.name)}
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <div>
                      <Label
                        htmlFor="file-upload"
                        className="cursor-pointer text-sm font-medium text-primary hover:underline"
                      >
                        Click to upload
                      </Label>
                      <input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept={acceptedFileTypes.join(",")}
                        onChange={handleFileSelect}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Supported formats: {acceptedFileTypes.join(", ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Database Selection */}
            <div className="space-y-3">
              <Label>Select Target Databases</Label>
              <div className="border rounded-md p-4 space-y-3">
                {databasesWithAccess.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No databases with access available</p>
                ) : (
                  databasesWithAccess.map((db) => (
                    <div key={db.name} className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`db-${db.name}`}
                          checked={selectedDatabases.has(db.name)}
                          onCheckedChange={() => toggleDatabase(db.name)}
                        />
                        <Label
                          htmlFor={`db-${db.name}`}
                          className="flex-1 cursor-pointer font-normal"
                        >
                          <div>
                            <span className="font-medium">{db.name}</span>
                            <p className="text-xs text-muted-foreground">
                              {db.tableCount} {db.tableCount === 1 ? "table" : "tables"} • {db.rowCount.toLocaleString()} rows
                            </p>
                          </div>
                        </Label>
                      </div>
                      {db.requiredKeys && db.requiredKeys.length > 0 && (
                        <div className="ml-7 pl-1">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Required keys:</p>
                          <div className="flex flex-wrap gap-1">
                            {db.requiredKeys.map((key) => (
                              <span
                                key={key}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                              >
                                {key}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !selectedFile || selectedDatabases.size === 0}>
                {isSubmitting ? "Processing..." : "Fill Data"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

