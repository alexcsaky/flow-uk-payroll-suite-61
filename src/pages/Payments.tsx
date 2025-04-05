
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownUp, CreditCard, Download, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBillingFeatures } from "@/hooks/use-billing-features";

const Payments = () => {
  const { billingEnabled } = useBillingFeatures();
  
  // Sample payment data
  const payments = [
    { id: "PAY-001", client: "Acme Corporation", amount: 1250.00, date: "2025-04-01", method: "Credit Card", status: "Completed" },
    { id: "PAY-002", client: "Globex Industries", amount: 975.50, date: "2025-04-01", method: "Bank Transfer", status: "Processing" },
    { id: "PAY-003", client: "Stark Enterprises", amount: 3200.00, date: "2025-03-25", method: "Credit Card", status: "Completed" },
    { id: "PAY-004", client: "Wayne Industries", amount: 1800.00, date: "2025-03-20", method: "Check", status: "Pending" },
    { id: "PAY-005", client: "Umbrella Corporation", amount: 2500.00, date: "2025-03-15", method: "Bank Transfer", status: "Completed" },
  ];

  if (!billingEnabled) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <CreditCard className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Payment Processing</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Payment processing is only available with our premium plan. Upgrade to access this feature.
        </p>
        <Button className="flow-gradient">Upgrade Plan</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Track and manage payment transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ArrowDownUp className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="flow-gradient">
            <Plus className="mr-2 h-4 w-4" />
            Record Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              Total Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$9,725.50</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,800.00</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$975.50</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-medium">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payments..."
                className="w-full md:w-[200px] pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Transaction ID</th>
                      <th className="py-3 px-4 text-left font-medium">Client</th>
                      <th className="py-3 px-4 text-left font-medium">Amount</th>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">Method</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="py-3 px-4">{payment.id}</td>
                        <td className="py-3 px-4">{payment.client}</td>
                        <td className="py-3 px-4">${payment.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">{payment.date}</td>
                        <td className="py-3 px-4">{payment.method}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            payment.status === "Completed" 
                              ? "bg-green-50 text-green-700" 
                              : payment.status === "Processing"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <div className="p-4 text-sm text-muted-foreground">
                Completed payments will appear here.
              </div>
            </TabsContent>
            <TabsContent value="processing" className="mt-4">
              <div className="p-4 text-sm text-muted-foreground">
                Processing payments will appear here.
              </div>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <div className="p-4 text-sm text-muted-foreground">
                Pending payments will appear here.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
