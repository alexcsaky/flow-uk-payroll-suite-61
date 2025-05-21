import React, { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

interface AttachmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: () => void;
}

export function AttachmentModal({ isOpen, onClose, onUpload }: AttachmentModalProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Simulate file upload
    console.log("Files dropped:", acceptedFiles);
    onUpload();
    toast.success("File uploaded successfully!");
    onClose();
  }, [onUpload, onClose]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Attachments</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`mt-4 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Click to upload or drag and drop files here
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, images, and documents
              </p>
            </div>
            <Button variant="outline" className="mt-2">
              Browse Files
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 