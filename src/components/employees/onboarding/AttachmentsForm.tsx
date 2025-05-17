import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { 
  AlertTriangle, 
  FileCheck, 
  FilePlus2, 
  HelpCircle, 
  Upload, 
  X, 
  Paperclip,
  FileText
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AttachmentsFormProps {
  data: {
    p45Uploaded: boolean;
    rtwUploaded: boolean;
    contractUploaded: boolean;
    otherDocuments: Array<{
      id: string;
      name: string;
      type: string;
      uploadedAt: string;
      status: string;
    }>;
    isComplete: boolean;
  };
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const AttachmentsForm = ({
  data,
  updateData,
  onNext,
  onPrev,
}: AttachmentsFormProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>("");

  // Handle simulated file upload
  const handleFileUpload = (docType: string) => {
    setSelectedDocType(docType);
    
    // Simulate file selection
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        handleFileSelected(docType, file);
      }
    };
    
    input.click();
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && selectedDocType) {
      const file = e.dataTransfer.files[0];
      handleFileSelected(selectedDocType, file);
    }
  };
  
  const handleFileSelected = (docType: string, file: File) => {
    // Update the appropriate flag based on document type
    switch (docType) {
      case "p45":
        updateData({ p45Uploaded: true });
        break;
      case "rtw":
        updateData({ rtwUploaded: true });
        break;
      case "contract":
        updateData({ contractUploaded: true });
        break;
      case "other":
        const newDoc = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          uploadedAt: new Date().toISOString(),
          status: "pending_review"
        };
        const updatedDocs = [...data.otherDocuments, newDoc];
        updateData({ otherDocuments: updatedDocs });
        break;
    }
    
    setSelectedDocType("");
  };
  
  const handleRemoveDocument = (docType: string, docId?: string) => {
    switch (docType) {
      case "p45":
        updateData({ p45Uploaded: false });
        break;
      case "rtw":
        updateData({ rtwUploaded: false });
        break;
      case "contract":
        updateData({ contractUploaded: false });
        break;
      case "other":
        if (docId) {
          const updatedDocs = data.otherDocuments.filter(doc => doc.id !== docId);
          updateData({ otherDocuments: updatedDocs });
        }
        break;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Attachments are optional, so we can always proceed
    updateData({ isComplete: true });
    onNext();
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-8"
      onDragEnter={handleDrag}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Document Attachments</h3>
        <p className="text-sm text-muted-foreground">
          Upload important employee documents such as P45, right to work evidence, or employment contract.
        </p>
      </div>
      
      {dragActive && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="bg-white p-10 rounded-lg shadow-xl text-center">
            <Upload className="h-16 w-16 mx-auto text-blue-500" />
            <h3 className="text-xl font-semibold mt-4">Drop file to upload</h3>
            <p className="text-muted-foreground mt-2">
              Release to upload your document
            </p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* P45 Document */}
        <DocumentCard
          title="P45 from previous employer"
          description="Contains tax code and previous earnings information"
          isRequired={false}
          isUploaded={data.p45Uploaded}
          onUpload={() => handleFileUpload("p45")}
          onRemove={() => handleRemoveDocument("p45")}
          isSelected={selectedDocType === "p45"}
          icon={<FileText className="h-4 w-4 mr-1 text-muted-foreground" />}
          tooltipContent="A P45 shows tax code, previous earnings and tax paid this tax year"
        />
        
        {/* Right to Work Document */}
        <DocumentCard
          title="Right to Work Evidence"
          description="Passport, visa, or other ID confirming work eligibility"
          isRequired={true}
          isUploaded={data.rtwUploaded}
          onUpload={() => handleFileUpload("rtw")}
          onRemove={() => handleRemoveDocument("rtw")}
          isSelected={selectedDocType === "rtw"}
          icon={<FileText className="h-4 w-4 mr-1 text-muted-foreground" />}
          tooltipContent="Legal requirement to prove employee's right to work in UK (passport, visa, etc.)"
        />
        
        {/* Contract Document */}
        <DocumentCard
          title="Employment Contract"
          description="Signed employment agreement"
          isRequired={false}
          isUploaded={data.contractUploaded}
          onUpload={() => handleFileUpload("contract")}
          onRemove={() => handleRemoveDocument("contract")}
          isSelected={selectedDocType === "contract"}
          icon={<FileText className="h-4 w-4 mr-1 text-muted-foreground" />}
          tooltipContent="Formal agreement between employee and employer outlining terms of employment"
        />
        
        {/* Other Documents */}
        <DocumentCard
          title="Other Documents"
          description="Qualifications, certificates, or other relevant documents"
          isRequired={false}
          isUploaded={data.otherDocuments.length > 0}
          onUpload={() => handleFileUpload("other")}
          onRemove={() => {}}
          isSelected={selectedDocType === "other"}
          multipleUploads={true}
          uploadCount={data.otherDocuments.length}
          icon={<Paperclip className="h-4 w-4 mr-1 text-muted-foreground" />}
          tooltipContent="Any additional documentation relevant to employment (certifications, qualifications, etc.)"
        />
      </div>
      
      {/* List of other documents */}
      {data.otherDocuments.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="text-md font-medium">Additional Documents</h4>
          <div className="border rounded-md divide-y">
            {data.otherDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  <FileCheck className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      doc.status === "pending_review" && "bg-yellow-100 text-yellow-800 border-yellow-200",
                      doc.status === "approved" && "bg-green-100 text-green-800 border-green-200",
                      doc.status === "rejected" && "bg-red-100 text-red-800 border-red-200",
                      doc.status === "expired" && "bg-gray-100 text-gray-800 border-gray-200"
                    )}
                  >
                    {doc.status === "pending_review" && "Pending Review"}
                    {doc.status === "approved" && "Approved"}
                    {doc.status === "rejected" && "Rejected"}
                    {doc.status === "expired" && "Expired"}
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveDocument("other", doc.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!data.rtwUploaded && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Right to Work verification is required</p>
            <p className="text-sm text-amber-700 mt-1">
              UK law requires Right to Work verification before employment can commence.
              You can still proceed with onboarding, but the employee cannot start work
              until this document is provided.
            </p>
          </div>
        </div>
      )}
      
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
};

interface DocumentCardProps {
  title: string;
  description: string;
  isRequired: boolean;
  isUploaded: boolean;
  onUpload: () => void;
  onRemove: () => void;
  isSelected: boolean;
  icon?: React.ReactNode;
  tooltipContent?: string;
  multipleUploads?: boolean;
  uploadCount?: number;
}

const DocumentCard = ({
  title,
  description,
  isRequired,
  isUploaded,
  onUpload,
  onRemove,
  isSelected,
  icon,
  tooltipContent,
  multipleUploads = false,
  uploadCount = 0,
}: DocumentCardProps) => {
  return (
    <Card className={cn(
      "border-2",
      isUploaded ? "border-green-200 bg-green-50" : "border-dashed",
      isSelected && !isUploaded && "border-blue-400 bg-blue-50"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-1">
              {icon}
              {title}
              {isRequired && <span className="text-red-500">*</span>}
              {tooltipContent && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs">
                      <p>{tooltipContent}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {isUploaded && (
                <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                  Uploaded
                </Badge>
              )}
              {!isUploaded && isRequired && (
                <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                  Required
                </Badge>
              )}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {isUploaded && !multipleUploads && (
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {isUploaded && !multipleUploads ? (
          <div className="flex items-center text-sm text-green-600">
            <FileCheck className="mr-2 h-4 w-4" />
            Document successfully uploaded
          </div>
        ) : multipleUploads && uploadCount > 0 ? (
          <div className="flex items-center text-sm text-green-600">
            <FileCheck className="mr-2 h-4 w-4" />
            {uploadCount} document{uploadCount !== 1 ? 's' : ''} uploaded
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant={isUploaded ? "outline" : "secondary"}
          size="sm"
          className="w-full"
          onClick={onUpload}
        >
          {multipleUploads ? (
            <>
              <FilePlus2 className="mr-2 h-4 w-4" />
              {isUploaded ? "Add Another Document" : "Upload Documents"}
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {isUploaded ? "Replace Document" : "Upload Document"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
