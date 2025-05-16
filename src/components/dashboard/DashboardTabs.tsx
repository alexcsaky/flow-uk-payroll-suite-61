
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="week" className="w-[250px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
