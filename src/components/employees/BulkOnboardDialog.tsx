import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AlertCircle, FileSpreadsheet, Upload, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface BulkOnboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkOnboardDialog({ open, onOpenChange }: BulkOnboardDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setParseError(null);
    } else {
      setParseError("Please upload a valid CSV file");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      // Here you would process the CSV file
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded and processed.`,
      });
      
      onOpenChange(false);
      setFile(null);
    } catch (error) {
      setParseError("Failed to process the CSV file. Please check the format and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Create CSV template content
    const templateContent = "First Name,Last Name,Email,Department,Role,Status\nJohn,Doe,john.doe@example.com,IT,Developer,Active";
    
    // Create a blob and download link
    const blob = new Blob([templateContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee-bulk-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bulk Onboard Employees</DialogTitle>
          <DialogDescription>
            Upload a CSV file to onboard multiple employees at once.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {parseError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{parseError}</AlertDescription>
            </Alert>
          )}
          
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/30"}
              ${file ? "bg-primary/5" : ""}
            `}
          >
            <input {...getInputProps()} />
            
            {file ? (
              <div className="flex flex-col items-center gap-2">
                <FileSpreadsheet className="h-12 w-12 text-primary" />
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  Change file
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-12 w-12 text-muted-foreground" />
                <p className="font-medium">
                  {isDragActive ? "Drop the CSV file here" : "Drag & drop a CSV file here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to browse files
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownloadTemplate}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
            
            <Button 
              onClick={handleUpload} 
              disabled={!file || isUploading} 
              className="flow-gradient"
            >
              {isUploading ? "Processing..." : "Upload & Process"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
