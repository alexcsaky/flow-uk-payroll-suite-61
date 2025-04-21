import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBillingFeatures } from "@/hooks/use-billing-features";
import { toast } from "sonner";
import GeneralCompanyInfo from "@/components/settings/GeneralCompanyInfo";
import HmrcCredentials from "@/components/settings/HmrcCredentials";
import PayRunSettings from "@/components/settings/PayRunSettings";
import PensionSettings from "@/components/settings/PensionSettings";
import OpeningBalances from "@/components/settings/OpeningBalances";
import YearEndSettings from "@/components/settings/YearEndSettings";
import Departments from "@/components/settings/Departments";
import UserRoles from "@/components/settings/UserRoles";

export default function Settings() {
  const { billingEnabled, toggleBillingFeatures } = useBillingFeatures();
  const [orgName, setOrgName] = useState("Flow Payroll Ltd");
  const [orgEmail, setOrgEmail] = useState("admin@flowpayroll.com");
  const [xeroConnected, setXeroConnected] = useState(false);
  const [crmConnected, setCrmConnected] = useState(false);

  const handleSaveGeneral = () => {
    toast.success("Organisation settings saved successfully");
  };

  const handleConnectXero = () => {
    // In a real app, this would handle the OAuth flow
    setXeroConnected(true);
    toast.success("Connected to Xero successfully");
  };

  const handleDisconnectXero = () => {
    setXeroConnected(false);
    toast.success("Disconnected from Xero");
  };

  const handleConnectCRM = () => {
    // In a real app, this would handle the connection to the CRM
    setCrmConnected(true);
    toast.success("Connected to CRM successfully");
  };

  const handleDisconnectCRM = () => {
    setCrmConnected(false);
    toast.success("Disconnected from CRM");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your payroll system settings
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-8 lg:w-auto overflow-x-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="hmrc">HMRC</TabsTrigger>
          <TabsTrigger value="payrun">Pay Run</TabsTrigger>
          <TabsTrigger value="pension">Pension</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="yearend">Year-End</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Organisation Details</CardTitle>
              <CardDescription>
                Manage your organisation information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organisation Name</Label>
                <Input
                  id="org-name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-email">Email Address</Label>
                <Input
                  id="org-email"
                  type="email"
                  value={orgEmail}
                  onChange={(e) => setOrgEmail(e.target.value)}
                />
              </div>
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
              <CardDescription>
                Enable or disable specific features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="billing-features">Billing Features</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable client and invoice management
                  </p>
                </div>
                <Switch
                  id="billing-features"
                  checked={billingEnabled}
                  onCheckedChange={toggleBillingFeatures}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="employee-portal">Employee Self-Service Portal</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow employees to access their payslips
                  </p>
                </div>
                <Switch id="employee-portal" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="timesheet-approval">Timesheet Approval Workflow</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable multi-step approval process
                  </p>
                </div>
                <Switch id="timesheet-approval" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect to external services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium">Xero</h4>
                  <p className="text-sm text-muted-foreground">
                    {xeroConnected ? "Connected" : "Not connected"}
                  </p>
                </div>
                {xeroConnected ? (
                  <Button variant="outline" onClick={handleDisconnectXero}>Disconnect</Button>
                ) : (
                  <Button onClick={handleConnectXero}>Connect</Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium">CRM</h4>
                  <p className="text-sm text-muted-foreground">
                    {crmConnected ? "Connected" : "Not connected"}
                  </p>
                </div>
                {crmConnected ? (
                  <Button variant="outline" onClick={handleDisconnectCRM}>Disconnect</Button>
                ) : (
                  <Button onClick={handleConnectCRM}>Connect</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="company" className="space-y-6 mt-6">
          <GeneralCompanyInfo />
        </TabsContent>

        <TabsContent value="hmrc" className="space-y-6 mt-6">
          <HmrcCredentials />
        </TabsContent>

        <TabsContent value="payrun" className="space-y-6 mt-6">
          <PayRunSettings />
        </TabsContent>

        <TabsContent value="pension" className="space-y-6 mt-6">
          <PensionSettings />
        </TabsContent>

        <TabsContent value="balances" className="space-y-6 mt-6">
          <OpeningBalances />
        </TabsContent>

        <TabsContent value="yearend" className="space-y-6 mt-6">
          <YearEndSettings />
        </TabsContent>

        <TabsContent value="departments" className="space-y-6 mt-6">
          <Departments />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure when you receive email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="payroll-processed">Payroll Processed</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when payroll is processed
                  </p>
                </div>
                <Switch id="payroll-processed" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="invoice-overdue">Invoice Overdue</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when invoices become overdue
                  </p>
                </div>
                <Switch id="invoice-overdue" defaultChecked={billingEnabled} disabled={!billingEnabled} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="timesheet-reminder">Timesheet Reminder</Label>
                  <p className="text-sm text-muted-foreground">
                    Send automated reminders for timesheet submission
                  </p>
                </div>
                <Switch id="timesheet-reminder" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
