import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Calendar, CalendarIcon, Plus, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

type PensionScheme = {
  id: string;
  schemeName: string;
  providerName: string;
  schemeReference: string;
  schemeType: string;
  qualifyingScheme: boolean;
  contributionBasis: string;
  employeeContributionPercentage?: number;
  employerContributionPercentage?: number;
  fixedEmployeeAmount?: number;
  fixedEmployerAmount?: number;
  salarySacrifice: boolean;
  taxReliefMethod: string;
  autoEnrolmentEnabled: boolean;
  stagingDate?: Date;
  cyclicalReEnrolmentDate?: Date;
  assessmentTiming: string;
  postponementRuleActive: boolean;
  postponementMaxDays?: number;
  communicationMethod: string;
  communicationTemplateID?: string;
  apiIntegrationEnabled: boolean;
  apiCredentials?: any;
};

export default function PensionSettings() {
  const [schemes, setSchemes] = useState<PensionScheme[]>([
    {
      id: "1",
      schemeName: "NEST Pension",
      providerName: "NEST Corporation",
      schemeReference: "NEST123456",
      schemeType: "MasterTrust",
      qualifyingScheme: true,
      contributionBasis: "QualifyingEarnings",
      employeeContributionPercentage: 5,
      employerContributionPercentage: 3,
      salarySacrifice: false,
      taxReliefMethod: "RAS",
      autoEnrolmentEnabled: true,
      stagingDate: new Date(2022, 3, 1),
      cyclicalReEnrolmentDate: new Date(2025, 3, 1),
      assessmentTiming: "EachPayPeriod",
      postponementRuleActive: true,
      postponementMaxDays: 30,
      communicationMethod: "Email",
      communicationTemplateID: "NEST-AE-01",
      apiIntegrationEnabled: true,
    }
  ]);

  const [currentScheme, setCurrentScheme] = useState<PensionScheme | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNew = () => {
    const newScheme: PensionScheme = {
      id: Date.now().toString(),
      schemeName: "",
      providerName: "",
      schemeReference: "",
      schemeType: "MasterTrust",
      qualifyingScheme: true,
      contributionBasis: "QualifyingEarnings",
      employeeContributionPercentage: 5,
      employerContributionPercentage: 3,
      salarySacrifice: false,
      taxReliefMethod: "RAS",
      autoEnrolmentEnabled: true,
      assessmentTiming: "EachPayPeriod",
      postponementRuleActive: false,
      communicationMethod: "Email",
      apiIntegrationEnabled: false,
    };
    
    setCurrentScheme(newScheme);
    setIsEditing(true);
  };
  
  const handleEdit = (scheme: PensionScheme) => {
    setCurrentScheme({...scheme});
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setSchemes(prev => prev.filter(s => s.id !== id));
    toast.success("Pension scheme deleted");
  };

  const handleSaveScheme = () => {
    if (!currentScheme || !currentScheme.schemeName || !currentScheme.providerName || !currentScheme.schemeReference) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newSchemes = currentScheme.id
      ? schemes.map(s => s.id === currentScheme.id ? currentScheme : s)
      : [...schemes, currentScheme];
      
    setSchemes(newSchemes);
    setCurrentScheme(null);
    setIsEditing(false);
    toast.success("Pension scheme saved successfully");
  };

  const handleCancelEdit = () => {
    setCurrentScheme(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: any) => {
    if (!currentScheme) return;
    
    setCurrentScheme({
      ...currentScheme,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pension Settings</CardTitle>
        <CardDescription>
          Configure pension schemes and auto-enrolment settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">Pension Schemes</h3>
              <Button onClick={handleAddNew} size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add Scheme
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scheme Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Auto-Enrolment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schemes.map((scheme) => (
                    <TableRow key={scheme.id}>
                      <TableCell className="font-medium">{scheme.schemeName}</TableCell>
                      <TableCell>{scheme.providerName}</TableCell>
                      <TableCell>{scheme.schemeType}</TableCell>
                      <TableCell>{scheme.autoEnrolmentEnabled ? "Enabled" : "Disabled"}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(scheme)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(scheme.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {schemes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No pension schemes configured
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <h3 className="font-medium text-lg">{currentScheme?.id ? 'Edit' : 'New'} Pension Scheme</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="schemeName">
                  Scheme Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="schemeName"
                  value={currentScheme?.schemeName || ""}
                  onChange={(e) => handleFieldChange("schemeName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="providerName">
                  Pension Provider Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="providerName"
                  value={currentScheme?.providerName || ""}
                  onChange={(e) => handleFieldChange("providerName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schemeReference">
                  Pension Scheme Reference (PSR) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="schemeReference"
                  value={currentScheme?.schemeReference || ""}
                  onChange={(e) => handleFieldChange("schemeReference", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schemeType">
                  Pension Scheme Type <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={currentScheme?.schemeType || ""}
                  onValueChange={(value) => handleFieldChange("schemeType", value)}
                >
                  <SelectTrigger id="schemeType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPP">Group Personal Pension (GPP)</SelectItem>
                    <SelectItem value="MasterTrust">Master Trust</SelectItem>
                    <SelectItem value="DB">Defined Benefit (DB)</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Scheme Configuration</h4>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="qualifyingScheme">
                    Qualifying Scheme <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-xs text-muted-foreground">Is this a qualifying scheme for auto-enrolment?</p>
                </div>
                <Switch
                  id="qualifyingScheme"
                  checked={currentScheme?.qualifyingScheme || false}
                  onCheckedChange={(checked) => handleFieldChange("qualifyingScheme", checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contributionBasis">
                  Contribution Basis <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={currentScheme?.contributionBasis || ""}
                  onValueChange={(value) => handleFieldChange("contributionBasis", value)}
                >
                  <SelectTrigger id="contributionBasis">
                    <SelectValue placeholder="Select basis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QualifyingEarnings">Qualifying Earnings</SelectItem>
                    <SelectItem value="Tier1">Tier 1 (Basic Pay)</SelectItem>
                    <SelectItem value="Tier2">Tier 2 (Basic Pay + Specified Extras)</SelectItem>
                    <SelectItem value="Tier3">Tier 3 (Total Pay)</SelectItem>
                    <SelectItem value="Custom">Custom Definition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {currentScheme?.contributionBasis !== "Custom" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="employeeContributionPercentage">
                        Employee Contribution (%)
                      </Label>
                      <Input
                        id="employeeContributionPercentage"
                        type="number"
                        min={0}
                        step={0.01}
                        value={currentScheme?.employeeContributionPercentage || 0}
                        onChange={(e) => handleFieldChange("employeeContributionPercentage", parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="employerContributionPercentage">
                        Employer Contribution (%)
                      </Label>
                      <Input
                        id="employerContributionPercentage"
                        type="number"
                        min={0}
                        step={0.01}
                        value={currentScheme?.employerContributionPercentage || 0}
                        onChange={(e) => handleFieldChange("employerContributionPercentage", parseFloat(e.target.value))}
                      />
                    </div>
                  </>
                )}
                
                {currentScheme?.contributionBasis === "Custom" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fixedEmployeeAmount">
                        Fixed Employee Amount (£)
                      </Label>
                      <Input
                        id="fixedEmployeeAmount"
                        type="number"
                        min={0}
                        step={0.01}
                        value={currentScheme?.fixedEmployeeAmount || 0}
                        onChange={(e) => handleFieldChange("fixedEmployeeAmount", parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fixedEmployerAmount">
                        Fixed Employer Amount (£)
                      </Label>
                      <Input
                        id="fixedEmployerAmount"
                        type="number"
                        min={0}
                        step={0.01}
                        value={currentScheme?.fixedEmployerAmount || 0}
                        onChange={(e) => handleFieldChange("fixedEmployerAmount", parseFloat(e.target.value))}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Tax & Salary Arrangement</h4>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="salarySacrifice">
                    Salary Sacrifice Arrangement
                  </Label>
                  <p className="text-xs text-muted-foreground">Is this a salary sacrifice pension scheme?</p>
                </div>
                <Switch
                  id="salarySacrifice"
                  checked={currentScheme?.salarySacrifice || false}
                  onCheckedChange={(checked) => handleFieldChange("salarySacrifice", checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taxReliefMethod">
                  Tax Relief Method <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={currentScheme?.taxReliefMethod || ""}
                  onValueChange={(value) => handleFieldChange("taxReliefMethod", value)}
                >
                  <SelectTrigger id="taxReliefMethod">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RAS">Relief at Source (RAS)</SelectItem>
                    <SelectItem value="NPA">Net Pay Arrangement (NPA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Auto-Enrolment Configuration</h4>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoEnrolmentEnabled">
                    Auto-Enrolment Enabled <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-xs text-muted-foreground">Does this scheme participate in auto-enrolment?</p>
                </div>
                <Switch
                  id="autoEnrolmentEnabled"
                  checked={currentScheme?.autoEnrolmentEnabled || false}
                  onCheckedChange={(checked) => handleFieldChange("autoEnrolmentEnabled", checked)}
                />
              </div>
              
              {currentScheme?.autoEnrolmentEnabled && (
                <div className="space-y-4 pl-4 border-l-2 border-muted">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="stagingDate">Staging Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {currentScheme?.stagingDate ? format(currentScheme.stagingDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={currentScheme?.stagingDate}
                            onSelect={(date) => handleFieldChange("stagingDate", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cyclicalReEnrolmentDate">
                        Cyclical Re-Enrolment Date <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {currentScheme?.cyclicalReEnrolmentDate ? format(currentScheme.cyclicalReEnrolmentDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={currentScheme?.cyclicalReEnrolmentDate}
                            onSelect={(date) => handleFieldChange("cyclicalReEnrolmentDate", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="assessmentTiming">
                      AE Assessment Timing <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={currentScheme?.assessmentTiming || ""}
                      onValueChange={(value) => handleFieldChange("assessmentTiming", value)}
                    >
                      <SelectTrigger id="assessmentTiming">
                        <SelectValue placeholder="Select timing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EachPayPeriod">Each Pay Period</SelectItem>
                        <SelectItem value="FirstDayOfPeriod">First Day of Period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="postponementRuleActive">
                        Postponement Rule Active
                      </Label>
                      <p className="text-xs text-muted-foreground">Use postponement for auto-enrolment?</p>
                    </div>
                    <Switch
                      id="postponementRuleActive"
                      checked={currentScheme?.postponementRuleActive || false}
                      onCheckedChange={(checked) => handleFieldChange("postponementRuleActive", checked)}
                    />
                  </div>
                  
                  {currentScheme?.postponementRuleActive && (
                    <div className="space-y-2">
                      <Label htmlFor="postponementMaxDays">
                        Max Postponement Days <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="postponementMaxDays"
                        type="number"
                        min={0}
                        max={90}
                        value={currentScheme?.postponementMaxDays || 0}
                        onChange={(e) => handleFieldChange("postponementMaxDays", parseInt(e.target.value))}
                        required
                      />
                      <p className="text-xs text-muted-foreground">Maximum 90 days</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="communicationMethod">
                      AE Communication Method <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={currentScheme?.communicationMethod || ""}
                      onValueChange={(value) => handleFieldChange("communicationMethod", value)}
                    >
                      <SelectTrigger id="communicationMethod">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Print">Print</SelectItem>
                        <SelectItem value="Portal">Portal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="communicationTemplateID">
                      Communication Template ID
                    </Label>
                    <Input
                      id="communicationTemplateID"
                      value={currentScheme?.communicationTemplateID || ""}
                      onChange={(e) => handleFieldChange("communicationTemplateID", e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="apiIntegrationEnabled">
                    Provider API Integration
                  </Label>
                  <p className="text-xs text-muted-foreground">Enable direct API integration with this provider?</p>
                </div>
                <Switch
                  id="apiIntegrationEnabled"
                  checked={currentScheme?.apiIntegrationEnabled || false}
                  onCheckedChange={(checked) => handleFieldChange("apiIntegrationEnabled", checked)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveScheme}>Save Scheme</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
