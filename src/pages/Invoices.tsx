
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, FileText, Download, Eye, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBillingFeatures } from "@/hooks/use-billing-features";

const Invoices = () => {
  const { billingEnabled } = useBillingFeatures();
  
  // Sample invoice data
  const invoices = [
    { id: "INV-001", client: "Acme Corporation", amount: 1250.00, date: "2025-04-01", status: "Paid" },
    { id: "INV-002", client: "Globex Industries", amount: 975.50, date: "2025-04-01", status: "Pending" },
    { id: "INV-003", client: "Stark Enterprises", amount: 3200.00, date: "2025-03-25", status: "Paid" },
    { id: "INV-004", client: "Wayne Industries", amount: 1800.00, date: "2025-03-20", status: "Overdue" },
    { id: "INV-005", client: "Umbrella Corporation", amount: 2500.00, date: "2025-03-15", status: "Pending" },
  ];

  if (!billingEnabled) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Invoice Management</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Invoice management is only available with our premium plan. Upgrade to access this feature.
        </p>
        <Button className="flow-gradient">Upgrade Plan</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Create and manage client invoices
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="flow-gradient">
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Invoices</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="w-full md:w-[200px] pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Invoice #</th>
                      <th className="py-3 px-4 text-left font-medium">Client</th>
                      <th className="py-3 px-4 text-left font-medium">Amount</th>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b">
                        <td className="py-3 px-4">{invoice.id}</td>
                        <td className="py-3 px-4">{invoice.client}</td>
                        <td className="py-3 px-4">${invoice.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">{invoice.date}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            invoice.status === "Paid" 
                              ? "bg-green-50 text-green-700" 
                              : invoice.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="paid" className="mt-4">
              <div className="p-4 text-sm text-muted-foreground">
                Paid invoices will appear here.
              </div>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <div className="p-4 text-sm text-muted-foreground">
                Pending invoices will appear here.
              </div>
            </TabsContent>
            <TabsContent value="overdue" className="mt-4">
              <div className="p-4 text-sm text-muted-foreground">
                Overdue invoices will appear here.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;
