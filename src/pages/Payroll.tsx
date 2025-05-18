
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { PayrollUpcoming } from "@/components/payroll/PayrollUpcoming";
import { PayrollHistory } from "@/components/payroll/PayrollHistory";
import { PayrollApprovalHub } from "@/components/payroll/PayrollApprovalHub";
import { PayrollSettings } from "@/components/payroll/PayrollSettings";

const Payroll = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payroll</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Payroll Run
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="upcoming">
            <PayrollUpcoming />
          </TabsContent>

          <TabsContent value="history">
            <PayrollHistory />
          </TabsContent>

          <TabsContent value="approvals">
            <PayrollApprovalHub />
          </TabsContent>

          <TabsContent value="settings">
            <PayrollSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Payroll;
