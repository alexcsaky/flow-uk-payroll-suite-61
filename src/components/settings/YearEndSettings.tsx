
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function YearEndSettings() {
  const [yearEndSettings, setYearEndSettings] = useState({
    p60DistributionMethod: "Portal",
    p60TemplateID: "DEFAULT_P60",
    finalFPSSubmissionIndicatorDefault: true,
    finalEPSSubmissionIndicatorDefault: true,
    yearEndProcedureAutomation: true,
    autoClearYTDFiguresOnRollover: true
  });

  const handleChange = (field: string, value: any) => {
    setYearEndSettings({
      ...yearEndSettings,
      [field]: value
    });
  };

  const handleSave = () => {
    toast.success("Year-end settings saved successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Year-End Settings</CardTitle>
        <CardDescription>
          Configure options for tax year-end processing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="p60DistributionMethod">
              P60 Distribution Method <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={yearEndSettings.p60DistributionMethod}
              onValueChange={(value) => handleChange("p60DistributionMethod", value)}
            >
              <SelectTrigger id="p60DistributionMethod">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Portal">Employee Portal</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Paper">Paper</SelectItem>
                <SelectItem value="None">None</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">How P60s will be distributed to employees</p>
          </div>
          
          {yearEndSettings.p60DistributionMethod !== "None" && (
            <div className="space-y-2 pl-4 border-l-2 border-muted">
              <Label htmlFor="p60TemplateID">P60 Template ID</Label>
              <Input
                id="p60TemplateID"
                value={yearEndSettings.p60TemplateID}
                onChange={(e) => handleChange("p60TemplateID", e.target.value)}
                placeholder="e.g., DEFAULT_P60"
              />
              <p className="text-xs text-muted-foreground">Identifier for the P60 template to use</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">HMRC Submission Settings</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="finalFPSSubmissionIndicatorDefault">
                Final FPS Submission Indicator Default <span className="text-red-500">*</span>
              </Label>
              <p className="text-xs text-muted-foreground">Set the final FPS submission indicator by default for year-end</p>
            </div>
            <Switch
              id="finalFPSSubmissionIndicatorDefault"
              checked={yearEndSettings.finalFPSSubmissionIndicatorDefault}
              onCheckedChange={(checked) => handleChange("finalFPSSubmissionIndicatorDefault", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="finalEPSSubmissionIndicatorDefault">
                Final EPS Submission Indicator Default
              </Label>
              <p className="text-xs text-muted-foreground">Set the final EPS submission indicator by default for year-end</p>
            </div>
            <Switch
              id="finalEPSSubmissionIndicatorDefault"
              checked={yearEndSettings.finalEPSSubmissionIndicatorDefault}
              onCheckedChange={(checked) => handleChange("finalEPSSubmissionIndicatorDefault", checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Year-End Automation</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="yearEndProcedureAutomation">
                Year-End Procedure Automation
              </Label>
              <p className="text-xs text-muted-foreground">Automatically guide users through required year-end tasks</p>
            </div>
            <Switch
              id="yearEndProcedureAutomation"
              checked={yearEndSettings.yearEndProcedureAutomation}
              onCheckedChange={(checked) => handleChange("yearEndProcedureAutomation", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoClearYTDFiguresOnRollover">
                Auto-Clear YTD Figures on Rollover
              </Label>
              <p className="text-xs text-muted-foreground">Automatically reset year-to-date figures when rolling over to new tax year</p>
            </div>
            <Switch
              id="autoClearYTDFiguresOnRollover"
              checked={yearEndSettings.autoClearYTDFiguresOnRollover}
              onCheckedChange={(checked) => handleChange("autoClearYTDFiguresOnRollover", checked)}
            />
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <h3 className="font-medium text-lg">Year-End Procedure Checklist</h3>
          
          <div className="space-y-2 p-4 bg-muted/20 rounded-md">
            <div className="grid grid-cols-12 text-sm font-medium">
              <div className="col-span-1">Step</div>
              <div className="col-span-7">Description</div>
              <div className="col-span-4">Timing</div>
            </div>
            
            <div className="grid grid-cols-12 gap-1 text-sm py-2 border-b">
              <div className="col-span-1">1</div>
              <div className="col-span-7">Verify all payroll data for the current tax year</div>
              <div className="col-span-4">Before year-end</div>
            </div>
            
            <div className="grid grid-cols-12 gap-1 text-sm py-2 border-b">
              <div className="col-span-1">2</div>
              <div className="col-span-7">Process final payroll of the tax year</div>
              <div className="col-span-4">Last period of tax year</div>
            </div>
            
            <div className="grid grid-cols-12 gap-1 text-sm py-2 border-b">
              <div className="col-span-1">3</div>
              <div className="col-span-7">Submit final FPS with "Final Submission for Tax Year" indicator</div>
              <div className="col-span-4">On or before final payment date</div>
            </div>
            
            <div className="grid grid-cols-12 gap-1 text-sm py-2 border-b">
              <div className="col-span-1">4</div>
              <div className="col-span-7">Submit final EPS if applicable</div>
              <div className="col-span-4">By 19 April</div>
            </div>
            
            <div className="grid grid-cols-12 gap-1 text-sm py-2 border-b">
              <div className="col-span-1">5</div>
              <div className="col-span-7">Generate and distribute P60s to all employees</div>
              <div className="col-span-4">By 31 May</div>
            </div>
            
            <div className="grid grid-cols-12 gap-1 text-sm py-2">
              <div className="col-span-1">6</div>
              <div className="col-span-7">Set up new tax year with updated rates and thresholds</div>
              <div className="col-span-4">Before first payroll of new year</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">This checklist will be provided as part of the guided procedure when year-end automation is enabled.</p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}
