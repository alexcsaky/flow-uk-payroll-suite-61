
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";

type PaySchedule = {
  id: string;
  name: string;
  frequency: string;
  defaultPayDateRule: string;
  payDateRuleParameter: number;
  payDateAdjustmentRule: string;
  processingCutoffDays: number;
  defaultPaymentMethod: string;
  bacsServiceUserNumber?: string;
  bacsFileType?: string;
  bankDetails?: {
    bankName: string;
    accountName: string;
    sortCode: string;
    accountNumber: string;
  };
  fasterPaymentsProvider?: string;
  fasterPaymentsAPICredentials?: any;
};

export default function PayRunSettings() {
  const [schedules, setSchedules] = useState<PaySchedule[]>([
    {
      id: "1",
      name: "Monthly Staff",
      frequency: "Monthly",
      defaultPayDateRule: "LastWorkingDay",
      payDateRuleParameter: 0,
      payDateAdjustmentRule: "BringForward",
      processingCutoffDays: 3,
      defaultPaymentMethod: "BACS",
      bacsServiceUserNumber: "123456",
      bacsFileType: "Std18",
      bankDetails: {
        bankName: "NatWest",
        accountName: "Flow Payroll Ltd",
        sortCode: "123456",
        accountNumber: "12345678"
      }
    },
    {
      id: "2",
      name: "Weekly Workers",
      frequency: "Weekly",
      defaultPayDateRule: "SpecificDay",
      payDateRuleParameter: 5, // Friday
      payDateAdjustmentRule: "None",
      processingCutoffDays: 1,
      defaultPaymentMethod: "FasterPayments",
      fasterPaymentsProvider: "Modulr"
    }
  ]);

  const [currentSchedule, setCurrentSchedule] = useState<PaySchedule | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNew = () => {
    const newSchedule: PaySchedule = {
      id: Date.now().toString(),
      name: "",
      frequency: "Monthly",
      defaultPayDateRule: "LastWorkingDay",
      payDateRuleParameter: 0,
      payDateAdjustmentRule: "None",
      processingCutoffDays: 3,
      defaultPaymentMethod: "BACS"
    };
    
    setCurrentSchedule(newSchedule);
    setIsEditing(true);
  };
  
  const handleEdit = (schedule: PaySchedule) => {
    setCurrentSchedule({...schedule});
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
    toast.success("Pay schedule deleted");
  };

  const handleSaveSchedule = () => {
    if (!currentSchedule || !currentSchedule.name) {
      toast.error("Schedule name is required");
      return;
    }

    const newSchedules = currentSchedule.id
      ? schedules.map(s => s.id === currentSchedule.id ? currentSchedule : s)
      : [...schedules, currentSchedule];
      
    setSchedules(newSchedules);
    setCurrentSchedule(null);
    setIsEditing(false);
    toast.success("Pay schedule saved successfully");
  };

  const handleCancelEdit = () => {
    setCurrentSchedule(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: string | number) => {
    if (!currentSchedule) return;
    
    setCurrentSchedule({
      ...currentSchedule,
      [field]: value
    });
  };

  const handleBankDetailsChange = (field: string, value: string) => {
    if (!currentSchedule) return;
    
    setCurrentSchedule({
      ...currentSchedule,
      bankDetails: {
        ...currentSchedule.bankDetails || {
          bankName: "",
          accountName: "",
          sortCode: "",
          accountNumber: "",
        },
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay Run Settings</CardTitle>
        <CardDescription>
          Configure how and when payroll is processed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">Pay Schedules</h3>
              <Button onClick={handleAddNew} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add Schedule
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Pay Date Rule</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.name}</TableCell>
                      <TableCell>{schedule.frequency}</TableCell>
                      <TableCell>{schedule.defaultPayDateRule}</TableCell>
                      <TableCell>{schedule.defaultPaymentMethod}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(schedule)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(schedule.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {schedules.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No pay schedules configured
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <h3 className="font-medium text-lg">{currentSchedule?.id ? 'Edit' : 'New'} Pay Schedule</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Schedule Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={currentSchedule?.name || ""}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  placeholder="e.g., Monthly Staff"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency">
                  Pay Frequency <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={currentSchedule?.frequency || ""}
                  onValueChange={(value) => handleFieldChange("frequency", value)}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Fortnightly">Fortnightly</SelectItem>
                    <SelectItem value="Four-weekly">Four-weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                    <SelectItem value="Irregular">Irregular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="defaultPayDateRule">
                  Default Pay Date Rule <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={currentSchedule?.defaultPayDateRule || ""}
                  onValueChange={(value) => handleFieldChange("defaultPayDateRule", value)}
                >
                  <SelectTrigger id="defaultPayDateRule">
                    <SelectValue placeholder="Select rule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LastWorkingDay">Last Working Day</SelectItem>
                    <SelectItem value="SpecificDay">Specific Day</SelectItem>
                    <SelectItem value="LastWeekday">Last Weekday</SelectItem>
                    <SelectItem value="DaysAfterPeriodEnd">Days After Period End</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {currentSchedule?.defaultPayDateRule === "SpecificDay" && (
                <div className="space-y-2">
                  <Label htmlFor="payDateRuleParameter">
                    Day of Month <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="payDateRuleParameter"
                    type="number"
                    min={1}
                    max={31}
                    value={currentSchedule?.payDateRuleParameter || 1}
                    onChange={(e) => handleFieldChange("payDateRuleParameter", parseInt(e.target.value))}
                    required
                  />
                </div>
              )}
              
              {currentSchedule?.defaultPayDateRule === "DaysAfterPeriodEnd" && (
                <div className="space-y-2">
                  <Label htmlFor="payDateRuleParameter">
                    Days After <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="payDateRuleParameter"
                    type="number"
                    min={0}
                    value={currentSchedule?.payDateRuleParameter || 0}
                    onChange={(e) => handleFieldChange("payDateRuleParameter", parseInt(e.target.value))}
                    required
                  />
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="payDateAdjustmentRule">
                  Bank Holiday Adjustment <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={currentSchedule?.payDateAdjustmentRule || ""}
                  onValueChange={(value) => handleFieldChange("payDateAdjustmentRule", value)}
                >
                  <SelectTrigger id="payDateAdjustmentRule">
                    <SelectValue placeholder="Select adjustment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BringForward">Bring Forward</SelectItem>
                    <SelectItem value="PushBack">Push Back</SelectItem>
                    <SelectItem value="None">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="processingCutoffDays">Processing Cutoff Days</Label>
                <Input
                  id="processingCutoffDays"
                  type="number"
                  min={0}
                  value={currentSchedule?.processingCutoffDays || 0}
                  onChange={(e) => handleFieldChange("processingCutoffDays", parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Days before pay date when processing must be complete</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultPaymentMethod">
                  Default Payment Method <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={currentSchedule?.defaultPaymentMethod || ""}
                  onValueChange={(value) => handleFieldChange("defaultPaymentMethod", value)}
                >
                  <SelectTrigger id="defaultPaymentMethod">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BACS">BACS</SelectItem>
                    <SelectItem value="FasterPayments">Faster Payments</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {currentSchedule?.defaultPaymentMethod === "BACS" && (
              <div className="space-y-4 pl-4 border-l-2 border-muted">
                <h4 className="font-medium">BACS Payment Details</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bacsServiceUserNumber">
                      BACS Service User Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bacsServiceUserNumber"
                      value={currentSchedule?.bacsServiceUserNumber || ""}
                      onChange={(e) => handleFieldChange("bacsServiceUserNumber", e.target.value)}
                      placeholder="6 digits"
                      maxLength={6}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bacsFileType">
                      BACS File Type <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={currentSchedule?.bacsFileType || ""}
                      onValueChange={(value) => handleFieldChange("bacsFileType", value)}
                    >
                      <SelectTrigger id="bacsFileType">
                        <SelectValue placeholder="Select file type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Std18">Standard 18</SelectItem>
                        <SelectItem value="AUDDIS">AUDDIS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {(currentSchedule?.defaultPaymentMethod === "BACS" || currentSchedule?.defaultPaymentMethod === "FasterPayments") && (
              <div className="space-y-4 pl-4 border-l-2 border-muted">
                <h4 className="font-medium">Bank Account Details</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">
                      Bank Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bankName"
                      value={currentSchedule?.bankDetails?.bankName || ""}
                      onChange={(e) => handleBankDetailsChange("bankName", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountName">
                      Account Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountName"
                      value={currentSchedule?.bankDetails?.accountName || ""}
                      onChange={(e) => handleBankDetailsChange("accountName", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sortCode">
                      Sort Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="sortCode"
                      value={currentSchedule?.bankDetails?.sortCode || ""}
                      onChange={(e) => handleBankDetailsChange("sortCode", e.target.value)}
                      placeholder="6 digits"
                      maxLength={6}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">
                      Account Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountNumber"
                      value={currentSchedule?.bankDetails?.accountNumber || ""}
                      onChange={(e) => handleBankDetailsChange("accountNumber", e.target.value)}
                      placeholder="8 digits"
                      maxLength={8}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            
            {currentSchedule?.defaultPaymentMethod === "FasterPayments" && (
              <div className="space-y-4 pl-4 border-l-2 border-muted">
                <div className="space-y-2">
                  <Label htmlFor="fasterPaymentsProvider">
                    Faster Payments Provider <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={currentSchedule?.fasterPaymentsProvider || ""}
                    onValueChange={(value) => handleFieldChange("fasterPaymentsProvider", value)}
                  >
                    <SelectTrigger id="fasterPaymentsProvider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Modulr">Modulr</SelectItem>
                      <SelectItem value="Starling">Starling</SelectItem>
                      <SelectItem value="API">API</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveSchedule}>Save Schedule</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
