
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Download, FileUp, Plus, Search, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EmployeeBalance = {
  id: string;
  employeeId: string;
  employeeName: string;
  taxYear: string;
  asOfDate: Date;
  taxableGrossPayYTD: number;
  taxPaidYTD: number;
  niablePay: {
    LEL: number;
    PT: number;
    UEL: number;
    UST: number;
    AboveUEL: number;
  };
  employeeNI_YTD: number;
  employerNI_YTD: number;
  studentLoanYTD: {
    plan1: number;
    plan2: number;
    plan4: number;
    plan5: number;
  };
  postgraduateLoanYTD: number;
  employeePensionContributionYTD: {
    net: number;
    gross: number;
  };
  employerPensionContributionYTD: number;
  statutoryPayYTD: {
    SSP: number;
    SMP: number;
    SPP: number;
    SAP: number;
    ShPP: number;
    SPBP: number;
  };
  p45Details?: {
    previousPay: number;
    previousTax: number;
  };
};

export default function OpeningBalances() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTaxYear, setSelectedTaxYear] = useState("2023/24");
  const [employees, setEmployees] = useState<EmployeeBalance[]>([
    {
      id: "1",
      employeeId: "EMP001",
      employeeName: "John Smith",
      taxYear: "2023/24",
      asOfDate: new Date(2023, 3, 5),
      taxableGrossPayYTD: 12500,
      taxPaidYTD: 2500,
      niablePay: {
        LEL: 1000,
        PT: 4000,
        UEL: 7500,
        UST: 0,
        AboveUEL: 0
      },
      employeeNI_YTD: 1350,
      employerNI_YTD: 1725,
      studentLoanYTD: {
        plan1: 0,
        plan2: 350,
        plan4: 0,
        plan5: 0
      },
      postgraduateLoanYTD: 0,
      employeePensionContributionYTD: {
        net: 500,
        gross: 625
      },
      employerPensionContributionYTD: 750,
      statutoryPayYTD: {
        SSP: 0,
        SMP: 0,
        SPP: 0,
        SAP: 0,
        ShPP: 0,
        SPBP: 0
      },
    },
    {
      id: "2",
      employeeId: "EMP002",
      employeeName: "Sarah Johnson",
      taxYear: "2023/24",
      asOfDate: new Date(2023, 3, 5),
      taxableGrossPayYTD: 18000,
      taxPaidYTD: 3600,
      niablePay: {
        LEL: 1000,
        PT: 4000,
        UEL: 10000,
        UST: 3000,
        AboveUEL: 0
      },
      employeeNI_YTD: 1950,
      employerNI_YTD: 2475,
      studentLoanYTD: {
        plan1: 450,
        plan2: 0,
        plan4: 0,
        plan5: 0
      },
      postgraduateLoanYTD: 0,
      employeePensionContributionYTD: {
        net: 720,
        gross: 900
      },
      employerPensionContributionYTD: 1080,
      statutoryPayYTD: {
        SSP: 0,
        SMP: 1200,
        SPP: 0,
        SAP: 0,
        ShPP: 0,
        SPBP: 0
      },
      p45Details: {
        previousPay: 6000,
        previousTax: 1200
      }
    },
  ]);

  const [currentBalance, setCurrentBalance] = useState<EmployeeBalance | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredEmployees = employees.filter(
    employee => 
      employee.taxYear === selectedTaxYear && 
      (employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUploadCSV = () => {
    toast.info("CSV upload functionality would be implemented here");
  };

  const handleDownloadTemplate = () => {
    toast.info("Template download functionality would be implemented here");
  };

  const handleAddNew = () => {
    const newBalance: EmployeeBalance = {
      id: Date.now().toString(),
      employeeId: "",
      employeeName: "",
      taxYear: selectedTaxYear,
      asOfDate: new Date(),
      taxableGrossPayYTD: 0,
      taxPaidYTD: 0,
      niablePay: {
        LEL: 0,
        PT: 0,
        UEL: 0,
        UST: 0,
        AboveUEL: 0
      },
      employeeNI_YTD: 0,
      employerNI_YTD: 0,
      studentLoanYTD: {
        plan1: 0,
        plan2: 0,
        plan4: 0,
        plan5: 0
      },
      postgraduateLoanYTD: 0,
      employeePensionContributionYTD: {
        net: 0,
        gross: 0
      },
      employerPensionContributionYTD: 0,
      statutoryPayYTD: {
        SSP: 0,
        SMP: 0,
        SPP: 0,
        SAP: 0,
        ShPP: 0,
        SPBP: 0
      },
    };
    
    setCurrentBalance(newBalance);
    setIsEditing(true);
  };
  
  const handleEdit = (balance: EmployeeBalance) => {
    setCurrentBalance({...balance});
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
    toast.success("Employee balance deleted");
  };

  const handleSaveBalance = () => {
    if (!currentBalance || !currentBalance.employeeId || !currentBalance.employeeName) {
      toast.error("Employee ID and name are required");
      return;
    }

    const newBalances = currentBalance.id
      ? employees.map(e => e.id === currentBalance.id ? currentBalance : e)
      : [...employees, currentBalance];
      
    setEmployees(newBalances);
    setCurrentBalance(null);
    setIsEditing(false);
    toast.success("Employee balance saved successfully");
  };

  const handleCancelEdit = () => {
    setCurrentBalance(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: any) => {
    if (!currentBalance) return;
    
    setCurrentBalance({
      ...currentBalance,
      [field]: value
    });
  };

  const handleNestedFieldChange = (
    parent: 'niablePay' | 'studentLoanYTD' | 'employeePensionContributionYTD' | 'statutoryPayYTD' | 'p45Details', 
    field: string, 
    value: number
  ) => {
    if (!currentBalance) return;

    setCurrentBalance({
      ...currentBalance,
      [parent]: {
        ...currentBalance[parent],
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opening Balances</CardTitle>
        <CardDescription>
          Manage employee year-to-date figures for tax calculations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEditing ? (
          <>
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex gap-2 items-center">
                <Label htmlFor="tax-year">Tax Year:</Label>
                <Select value={selectedTaxYear} onValueChange={setSelectedTaxYear}>
                  <SelectTrigger className="w-32" id="tax-year">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023/24">2023/24</SelectItem>
                    <SelectItem value="2022/23">2022/23</SelectItem>
                    <SelectItem value="2021/22">2021/22</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownloadTemplate}>
                  <Download className="h-4 w-4 mr-1" /> Template
                </Button>
                <Button variant="outline" onClick={handleUploadCSV}>
                  <FileUp className="h-4 w-4 mr-1" /> Upload CSV
                </Button>
                <Button onClick={handleAddNew}>
                  <Plus className="h-4 w-4 mr-1" /> Add Balance
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>As Of Date</TableHead>
                    <TableHead className="text-right">Gross Pay YTD</TableHead>
                    <TableHead className="text-right">Tax Paid YTD</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.employeeId}</TableCell>
                      <TableCell className="font-medium">{employee.employeeName}</TableCell>
                      <TableCell>{format(employee.asOfDate, "dd/MM/yyyy")}</TableCell>
                      <TableCell className="text-right">£{employee.taxableGrossPayYTD.toFixed(2)}</TableCell>
                      <TableCell className="text-right">£{employee.taxPaidYTD.toFixed(2)}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(employee)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(employee.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredEmployees.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No employee balances found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <h3 className="font-medium text-lg">{currentBalance?.id ? 'Edit' : 'New'} Employee Balance</h3>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="employeeId">
                  Employee ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="employeeId"
                  value={currentBalance?.employeeId || ""}
                  onChange={(e) => handleFieldChange("employeeId", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employeeName">
                  Employee Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="employeeName"
                  value={currentBalance?.employeeName || ""}
                  onChange={(e) => handleFieldChange("employeeName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="asOfDate">
                  As Of Date <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentBalance?.asOfDate ? format(currentBalance.asOfDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentBalance?.asOfDate}
                      onSelect={(date) => handleFieldChange("asOfDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Tax & Pay</h4>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taxableGrossPayYTD">
                    Taxable Gross Pay YTD
                  </Label>
                  <Input
                    id="taxableGrossPayYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.taxableGrossPayYTD || 0}
                    onChange={(e) => handleFieldChange("taxableGrossPayYTD", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxPaidYTD">
                    Tax Paid YTD
                  </Label>
                  <Input
                    id="taxPaidYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.taxPaidYTD || 0}
                    onChange={(e) => handleFieldChange("taxPaidYTD", parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">NIable Pay Bands</h4>
              
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                <div className="space-y-2">
                  <Label htmlFor="niLEL">
                    LEL
                  </Label>
                  <Input
                    id="niLEL"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.niablePay.LEL || 0}
                    onChange={(e) => handleNestedFieldChange("niablePay", "LEL", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="niPT">
                    PT
                  </Label>
                  <Input
                    id="niPT"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.niablePay.PT || 0}
                    onChange={(e) => handleNestedFieldChange("niablePay", "PT", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="niUEL">
                    UEL
                  </Label>
                  <Input
                    id="niUEL"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.niablePay.UEL || 0}
                    onChange={(e) => handleNestedFieldChange("niablePay", "UEL", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="niUST">
                    UST
                  </Label>
                  <Input
                    id="niUST"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.niablePay.UST || 0}
                    onChange={(e) => handleNestedFieldChange("niablePay", "UST", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="niAboveUEL">
                    Above UEL
                  </Label>
                  <Input
                    id="niAboveUEL"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.niablePay.AboveUEL || 0}
                    onChange={(e) => handleNestedFieldChange("niablePay", "AboveUEL", parseFloat(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="employeeNI_YTD">
                    Employee NI YTD
                  </Label>
                  <Input
                    id="employeeNI_YTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.employeeNI_YTD || 0}
                    onChange={(e) => handleFieldChange("employeeNI_YTD", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employerNI_YTD">
                    Employer NI YTD
                  </Label>
                  <Input
                    id="employerNI_YTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.employerNI_YTD || 0}
                    onChange={(e) => handleFieldChange("employerNI_YTD", parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Student Loans</h4>
              
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="slPlan1">
                    Plan 1
                  </Label>
                  <Input
                    id="slPlan1"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.studentLoanYTD.plan1 || 0}
                    onChange={(e) => handleNestedFieldChange("studentLoanYTD", "plan1", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slPlan2">
                    Plan 2
                  </Label>
                  <Input
                    id="slPlan2"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.studentLoanYTD.plan2 || 0}
                    onChange={(e) => handleNestedFieldChange("studentLoanYTD", "plan2", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slPlan4">
                    Plan 4
                  </Label>
                  <Input
                    id="slPlan4"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.studentLoanYTD.plan4 || 0}
                    onChange={(e) => handleNestedFieldChange("studentLoanYTD", "plan4", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slPlan5">
                    Plan 5
                  </Label>
                  <Input
                    id="slPlan5"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.studentLoanYTD.plan5 || 0}
                    onChange={(e) => handleNestedFieldChange("studentLoanYTD", "plan5", parseFloat(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postgraduateLoanYTD">
                  Postgraduate Loan YTD
                </Label>
                <Input
                  id="postgraduateLoanYTD"
                  type="number"
                  min={0}
                  step={0.01}
                  value={currentBalance?.postgraduateLoanYTD || 0}
                  onChange={(e) => handleFieldChange("postgraduateLoanYTD", parseFloat(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Pension Contributions</h4>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="pensionNetYTD">
                    Employee Pension (Net) YTD
                  </Label>
                  <Input
                    id="pensionNetYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.employeePensionContributionYTD.net || 0}
                    onChange={(e) => handleNestedFieldChange("employeePensionContributionYTD", "net", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pensionGrossYTD">
                    Employee Pension (Gross) YTD
                  </Label>
                  <Input
                    id="pensionGrossYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.employeePensionContributionYTD.gross || 0}
                    onChange={(e) => handleNestedFieldChange("employeePensionContributionYTD", "gross", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employerPensionYTD">
                    Employer Pension YTD
                  </Label>
                  <Input
                    id="employerPensionYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.employerPensionContributionYTD || 0}
                    onChange={(e) => handleFieldChange("employerPensionContributionYTD", parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Statutory Pay YTD</h4>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="sspYTD">
                    SSP
                  </Label>
                  <Input
                    id="sspYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.statutoryPayYTD.SSP || 0}
                    onChange={(e) => handleNestedFieldChange("statutoryPayYTD", "SSP", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smpYTD">
                    SMP
                  </Label>
                  <Input
                    id="smpYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.statutoryPayYTD.SMP || 0}
                    onChange={(e) => handleNestedFieldChange("statutoryPayYTD", "SMP", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sppYTD">
                    SPP
                  </Label>
                  <Input
                    id="sppYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.statutoryPayYTD.SPP || 0}
                    onChange={(e) => handleNestedFieldChange("statutoryPayYTD", "SPP", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sapYTD">
                    SAP
                  </Label>
                  <Input
                    id="sapYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.statutoryPayYTD.SAP || 0}
                    onChange={(e) => handleNestedFieldChange("statutoryPayYTD", "SAP", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shppYTD">
                    ShPP
                  </Label>
                  <Input
                    id="shppYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.statutoryPayYTD.ShPP || 0}
                    onChange={(e) => handleNestedFieldChange("statutoryPayYTD", "ShPP", parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="spbpYTD">
                    SPBP
                  </Label>
                  <Input
                    id="spbpYTD"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.statutoryPayYTD.SPBP || 0}
                    onChange={(e) => handleNestedFieldChange("statutoryPayYTD", "SPBP", parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">P45 Information</h4>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="p45PreviousPay">
                    P45 Previous Pay
                  </Label>
                  <Input
                    id="p45PreviousPay"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.p45Details?.previousPay || 0}
                    onChange={(e) => {
                      const p45Details = currentBalance?.p45Details || { previousPay: 0, previousTax: 0 };
                      handleNestedFieldChange("p45Details", "previousPay", parseFloat(e.target.value));
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="p45PreviousTax">
                    P45 Previous Tax
                  </Label>
                  <Input
                    id="p45PreviousTax"
                    type="number"
                    min={0}
                    step={0.01}
                    value={currentBalance?.p45Details?.previousTax || 0}
                    onChange={(e) => {
                      const p45Details = currentBalance?.p45Details || { previousPay: 0, previousTax: 0 };
                      handleNestedFieldChange("p45Details", "previousTax", parseFloat(e.target.value));
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveBalance}>Save Balance</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
