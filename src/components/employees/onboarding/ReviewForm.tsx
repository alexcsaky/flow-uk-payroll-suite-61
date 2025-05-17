
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertTriangle,
  CalendarCheck,
  CheckCircle,
  FileCheck,
  User,
  Wallet,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReviewFormProps {
  employeeData: {
    personal: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      gender: string;
      address: {
        line1: string;
        line2: string;
        city: string;
        county: string;
        postcode: string;
      };
      niNumber: string;
    };
    job: {
      title: string;
      department: string;
      startDate: string;
      employmentType: string;
      managerName: string;
      location: string;
    };
    payroll: {
      salary: string;
      salaryPeriod: string;
      taxCode: string;
      niCategory: string;
      hasStudentLoan: boolean;
      studentLoanPlan: string;
      hasPension: boolean;
      pensionScheme: string;
      pensionContribution: string;
      p45Provided: boolean;
      previousEmployer: string;
      previousTaxPaid: string;
      previousEarnings: string;
    };
    bankInfo: {
      accountName: string;
      accountNumber: string;
      sortCode: string;
      bankName: string;
      paymentMethod: string;
    };
    attachments: {
      p45Uploaded: boolean;
      rtwUploaded: boolean;
      contractUploaded: boolean;
      otherDocuments: Array<{
        id: string;
        name: string;
        type: string;
        uploadedAt: string;
      }>;
    };
  };
  onSubmit: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

export const ReviewForm = ({
  employeeData,
  onSubmit,
  onPrev,
  isLoading,
}: ReviewFormProps) => {
  const formatEmploymentType = (type: string) => {
    switch (type) {
      case "full-time":
        return "Full Time";
      case "part-time":
        return "Part Time";
      case "contractor":
        return "Contractor";
      case "temporary":
        return "Temporary";
      case "intern":
        return "Intern";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case "bank-transfer":
        return "Bank Transfer";
      case "cheque":
        return "Cheque";
      case "cash":
        return "Cash";
      default:
        return method.charAt(0).toUpperCase() + method.slice(1);
    }
  };

  const formatSalaryPeriod = (period: string) => {
    switch (period) {
      case "annual":
        return "Annual";
      case "monthly":
        return "Monthly";
      case "weekly":
        return "Weekly";
      case "daily":
        return "Daily";
      case "hourly":
        return "Hourly";
      default:
        return period.charAt(0).toUpperCase() + period.slice(1);
    }
  };

  const formatStudentLoanPlan = (plan: string) => {
    switch (plan) {
      case "plan1":
        return "Plan 1";
      case "plan2":
        return "Plan 2";
      case "plan4":
        return "Plan 4 (Scotland)";
      case "postgraduate":
        return "Postgraduate Loan";
      default:
        return plan;
    }
  };

  const getAttachmentStatus = () => {
    const missingRequired = !employeeData.attachments.rtwUploaded;
    
    if (missingRequired) {
      return {
        status: "warning",
        message: "Missing required documents",
      };
    } else {
      return {
        status: "complete",
        message: "All required documents uploaded",
      };
    }
  };
  
  const attachmentStatus = getAttachmentStatus();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Review & Submit</h3>
        <p className="text-sm text-muted-foreground">
          Please review all information before adding the employee to the system.
        </p>
      </div>
      
      {!employeeData.attachments.rtwUploaded && (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription>
            Right to Work documentation is missing. The employee cannot legally begin work without this verification.
          </AlertDescription>
        </Alert>
      )}
      
      <Accordion type="multiple" defaultValue={["personal"]} className="space-y-4">
        {/* Personal Information Section */}
        <AccordionItem value="personal" className="border rounded-md">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 [&[data-state=open]>svg]:transform-none">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              <span>Personal Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Full Name</h4>
                <p>
                  {employeeData.personal.firstName} {employeeData.personal.lastName}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                <p>{employeeData.personal.email}</p>
              </div>
              
              {employeeData.personal.phone && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                  <p>{employeeData.personal.phone}</p>
                </div>
              )}
              
              {employeeData.personal.dateOfBirth && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date of Birth</h4>
                  <p>{format(new Date(employeeData.personal.dateOfBirth), "dd MMMM yyyy")}</p>
                </div>
              )}
              
              {employeeData.personal.gender && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Gender</h4>
                  <p>{employeeData.personal.gender}</p>
                </div>
              )}
              
              {employeeData.personal.niNumber && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">National Insurance Number</h4>
                  <p>{employeeData.personal.niNumber}</p>
                </div>
              )}
            </div>
            
            {(employeeData.personal.address.line1 || !employeeData.personal.niNumber) && (
              <div className="mt-4">
                <h4 className="text-sm font-medium">Address</h4>
                <div className="mt-1">
                  {employeeData.personal.address.line1 && <p>{employeeData.personal.address.line1}</p>}
                  {employeeData.personal.address.line2 && <p>{employeeData.personal.address.line2}</p>}
                  {employeeData.personal.address.city && employeeData.personal.address.postcode && (
                    <p>
                      {employeeData.personal.address.city}, {employeeData.personal.address.postcode}
                    </p>
                  )}
                  {employeeData.personal.address.county && <p>{employeeData.personal.address.county}</p>}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
        
        {/* Job Details Section */}
        <AccordionItem value="job" className="border rounded-md">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 [&[data-state=open]>svg]:transform-none">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-indigo-500" />
              <span>Job Details</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Job Title</h4>
                <p>{employeeData.job.title}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Department</h4>
                <p>{employeeData.job.department}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Start Date</h4>
                <p>{format(new Date(employeeData.job.startDate), "dd MMMM yyyy")}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Employment Type</h4>
                <p>{formatEmploymentType(employeeData.job.employmentType)}</p>
              </div>
              
              {employeeData.job.managerName && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Manager</h4>
                  <p>{employeeData.job.managerName}</p>
                </div>
              )}
              
              {employeeData.job.location && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Work Location</h4>
                  <p>{employeeData.job.location}</p>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Payroll & Tax Section */}
        <AccordionItem value="payroll" className="border rounded-md">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 [&[data-state=open]>svg]:transform-none">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-500" />
              <span>Payroll & Tax Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Salary</h4>
                <p>£{employeeData.payroll.salary} {formatSalaryPeriod(employeeData.payroll.salaryPeriod)}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Tax Code</h4>
                <p>{employeeData.payroll.taxCode}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">NI Category</h4>
                <p>{employeeData.payroll.niCategory}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Student Loan</h4>
                <p>
                  {employeeData.payroll.hasStudentLoan
                    ? `Yes (${formatStudentLoanPlan(employeeData.payroll.studentLoanPlan)})`
                    : "No"}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Pension Scheme</h4>
                <p>
                  {employeeData.payroll.hasPension
                    ? `${employeeData.payroll.pensionScheme} (${employeeData.payroll.pensionContribution}% contribution)`
                    : "None"}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">P45 Provided</h4>
                <p>{employeeData.payroll.p45Provided ? "Yes" : "No"}</p>
              </div>
              
              {employeeData.payroll.p45Provided && (
                <>
                  {employeeData.payroll.previousEmployer && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Previous Employer</h4>
                      <p>{employeeData.payroll.previousEmployer}</p>
                    </div>
                  )}
                  
                  {employeeData.payroll.previousTaxPaid && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Previous Tax Paid</h4>
                      <p>£{employeeData.payroll.previousTaxPaid}</p>
                    </div>
                  )}
                  
                  {employeeData.payroll.previousEarnings && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Previous Earnings</h4>
                      <p>£{employeeData.payroll.previousEarnings}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Bank Information Section */}
        <AccordionItem value="bank" className="border rounded-md">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 [&[data-state=open]>svg]:transform-none">
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-purple-500" />
              <span>Payment Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Payment Method</h4>
                <p>{formatPaymentMethod(employeeData.bankInfo.paymentMethod)}</p>
              </div>
              
              {employeeData.bankInfo.paymentMethod === "bank-transfer" && (
                <>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Account Name</h4>
                    <p>{employeeData.bankInfo.accountName}</p>
                  </div>
                  
                  {employeeData.bankInfo.bankName && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Bank Name</h4>
                      <p>{employeeData.bankInfo.bankName}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Account Number</h4>
                    <p>••••{employeeData.bankInfo.accountNumber.slice(-4)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Sort Code</h4>
                    <p>{employeeData.bankInfo.sortCode}</p>
                  </div>
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Attachments Section */}
        <AccordionItem value="attachments" className="border rounded-md">
          <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 [&[data-state=open]>svg]:transform-none">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-amber-500" />
              <span>Document Attachments</span>
              <Badge
                className={
                  attachmentStatus.status === "complete"
                    ? "ml-2 bg-green-100 text-green-800 border-green-200"
                    : "ml-2 bg-amber-100 text-amber-800 border-amber-200"
                }
                variant="outline"
              >
                {attachmentStatus.message}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">P45 from previous employer</h4>
                </div>
                <Badge
                  variant="outline"
                  className={
                    employeeData.attachments.p45Uploaded
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {employeeData.attachments.p45Uploaded ? "Uploaded" : "Not uploaded"}
                </Badge>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Right to Work Evidence</h4>
                  <p className="text-xs text-muted-foreground">Required by law</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    employeeData.attachments.rtwUploaded
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }
                >
                  {employeeData.attachments.rtwUploaded ? "Uploaded" : "Missing"}
                </Badge>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Employment Contract</h4>
                </div>
                <Badge
                  variant="outline"
                  className={
                    employeeData.attachments.contractUploaded
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {employeeData.attachments.contractUploaded ? "Uploaded" : "Not uploaded"}
                </Badge>
              </div>
              
              {employeeData.attachments.otherDocuments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Additional Documents</h4>
                  <div className="space-y-2">
                    {employeeData.attachments.otherDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center text-sm">
                        <FileCheck className="h-4 w-4 text-green-500 mr-2" />
                        <span>{doc.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="pt-4 space-y-4">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-medium flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            Confirmation
          </h4>
          <p className="text-sm mt-2">
            By submitting this form, you confirm that all information provided is correct
            and that the employee has provided the necessary documentation for employment.
          </p>
        </div>
        
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onPrev}>
            Previous
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? "Adding..." : "Add Employee"}
          </Button>
        </div>
      </div>
    </div>
  );
};
