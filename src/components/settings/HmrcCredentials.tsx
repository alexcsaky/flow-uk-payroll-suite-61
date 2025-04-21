import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Eye, EyeOff, Key, Lock, Shield } from "lucide-react";

export default function HmrcCredentials() {
  const [showPassword, setShowPassword] = useState(false);
  const [hmrcSettings, setHmrcSettings] = useState({
    payeReference: "123/AB12345",
    accountsOfficeReference: "123PX00123456",
    govGatewayUserId: "payroll_user",
    govGatewayPassword: "••••••••••",
    submissionMethod: "Direct",
    agentGatewayUserId: "",
    agentGatewayPassword: "",
    agentId: "",
    corporationTaxUTR: "",
    selfAssessmentUTR: "",
    employmentAllowanceEligible: true,
    employmentAllowanceClaimStatus: "Claimed",
    apprenticeshipLevyApplies: false,
    cisContractorSchemeActive: false,
    cisUTR: "",
    cisSettings: {
      autoVerifyNewSubcontractors: false,
      defaultRateUnverified: "30"
    }
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setHmrcSettings({
      ...hmrcSettings,
      [field]: value
    });
  };

  const handleCisSettingChange = (field: string, value: string | boolean) => {
    setHmrcSettings({
      ...hmrcSettings,
      cisSettings: {
        ...hmrcSettings.cisSettings,
        [field]: value
      }
    });
  };

  const handleSave = () => {
    toast.success("HMRC credentials saved successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>HMRC Credentials & Settings</CardTitle>
        <CardDescription>
          Enter your HMRC credentials and configure related settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="payeReference">
              Employer PAYE Reference <span className="text-red-500">*</span>
            </Label>
            <Input
              id="payeReference"
              value={hmrcSettings.payeReference}
              onChange={(e) => handleInputChange("payeReference", e.target.value)}
              placeholder="Format: 123/AB12345"
              required
            />
            <p className="text-xs text-muted-foreground">Format: 3 digits, slash, up to 10 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountsOfficeReference">
              Accounts Office Reference <span className="text-red-500">*</span>
            </Label>
            <Input
              id="accountsOfficeReference"
              value={hmrcSettings.accountsOfficeReference}
              onChange={(e) => handleInputChange("accountsOfficeReference", e.target.value)}
              placeholder="13 characters"
              required
            />
            <p className="text-xs text-muted-foreground">13 character reference from HMRC</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg flex items-center gap-2">
            <Lock className="h-4 w-4" /> Government Gateway Credentials
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="govGatewayUserId">
                Government Gateway User ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="govGatewayUserId"
                value={hmrcSettings.govGatewayUserId}
                onChange={(e) => handleInputChange("govGatewayUserId", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="govGatewayPassword">
                Government Gateway Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="govGatewayPassword"
                  type={showPassword ? "text" : "password"}
                  value={hmrcSettings.govGatewayPassword}
                  onChange={(e) => handleInputChange("govGatewayPassword", e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Encrypted and masked for security</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="submissionMethod">
              HMRC Submission Method <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={hmrcSettings.submissionMethod}
              onValueChange={(value) => handleInputChange("submissionMethod", value)}
            >
              <SelectTrigger id="submissionMethod">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Direct">Direct</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hmrcSettings.submissionMethod === "Agent" && (
            <div className="grid gap-4 md:grid-cols-3 pl-4 border-l-2 border-muted">
              <div className="space-y-2">
                <Label htmlFor="agentGatewayUserId">
                  Agent Gateway User ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="agentGatewayUserId"
                  value={hmrcSettings.agentGatewayUserId}
                  onChange={(e) => handleInputChange("agentGatewayUserId", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agentGatewayPassword">
                  Agent Gateway Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="agentGatewayPassword"
                  type="password"
                  value={hmrcSettings.agentGatewayPassword}
                  onChange={(e) => handleInputChange("agentGatewayPassword", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agentId">
                  Agent ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="agentId"
                  value={hmrcSettings.agentId}
                  onChange={(e) => handleInputChange("agentId", e.target.value)}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="corporationTaxUTR">Corporation Tax UTR</Label>
            <Input
              id="corporationTaxUTR"
              value={hmrcSettings.corporationTaxUTR}
              onChange={(e) => handleInputChange("corporationTaxUTR", e.target.value)}
              placeholder="10 digits"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="selfAssessmentUTR">Self Assessment UTR</Label>
            <Input
              id="selfAssessmentUTR"
              value={hmrcSettings.selfAssessmentUTR}
              onChange={(e) => handleInputChange("selfAssessmentUTR", e.target.value)}
              placeholder="10 digits"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg flex items-center gap-2">
            <Shield className="h-4 w-4" /> Employment Allowance
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="employmentAllowanceEligible">Employment Allowance Eligibility</Label>
                <p className="text-xs text-muted-foreground">Is your company eligible for Employment Allowance?</p>
              </div>
              <Switch
                id="employmentAllowanceEligible"
                checked={hmrcSettings.employmentAllowanceEligible}
                onCheckedChange={(checked) => handleInputChange("employmentAllowanceEligible", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentAllowanceClaimStatus">
                Employment Allowance Claim Status <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={hmrcSettings.employmentAllowanceClaimStatus}
                onValueChange={(value) => handleInputChange("employmentAllowanceClaimStatus", value)}
                disabled={!hmrcSettings.employmentAllowanceEligible}
              >
                <SelectTrigger id="employmentAllowanceClaimStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Claimed">Claimed</SelectItem>
                  <SelectItem value="NotClaimed">Not Claimed</SelectItem>
                  <SelectItem value="NotEligible">Not Eligible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="apprenticeshipLevyApplies">Apprenticeship Levy Applies</Label>
              <p className="text-xs text-muted-foreground">Does the Apprenticeship Levy apply to your company?</p>
            </div>
            <Switch
              id="apprenticeshipLevyApplies"
              checked={hmrcSettings.apprenticeshipLevyApplies}
              onCheckedChange={(checked) => handleInputChange("apprenticeshipLevyApplies", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cisContractorSchemeActive">CIS Contractor Scheme Active</Label>
              <p className="text-xs text-muted-foreground">Are you a CIS contractor?</p>
            </div>
            <Switch
              id="cisContractorSchemeActive"
              checked={hmrcSettings.cisContractorSchemeActive}
              onCheckedChange={(checked) => handleInputChange("cisContractorSchemeActive", checked)}
            />
          </div>
        </div>

        {hmrcSettings.cisContractorSchemeActive && (
          <div className="space-y-4 pl-4 border-l-2 border-muted">
            <div className="space-y-2">
              <Label htmlFor="cisUTR">
                CIS UTR <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cisUTR"
                value={hmrcSettings.cisUTR}
                onChange={(e) => handleInputChange("cisUTR", e.target.value)}
                placeholder="10 digits"
                required
              />
            </div>

            <h4 className="font-medium">CIS Verification Settings</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoVerifyNewSubcontractors">Auto-Verify New Subcontractors</Label>
                </div>
                <Switch
                  id="autoVerifyNewSubcontractors"
                  checked={hmrcSettings.cisSettings.autoVerifyNewSubcontractors}
                  onCheckedChange={(checked) => handleCisSettingChange("autoVerifyNewSubcontractors", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultRateUnverified">Default Rate for Unverified</Label>
                <Select 
                  value={hmrcSettings.cisSettings.defaultRateUnverified}
                  onValueChange={(value) => handleCisSettingChange("defaultRateUnverified", value)}
                >
                  <SelectTrigger id="defaultRateUnverified">
                    <SelectValue placeholder="Select rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20%</SelectItem>
                    <SelectItem value="30">30%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Securely</Button>
        </div>
      </CardContent>
    </Card>
  );
}
