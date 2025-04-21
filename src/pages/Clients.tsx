import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Building, Users, Mail, Phone, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBillingFeatures } from "@/hooks/use-billing-features";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ClientDetailsForm from "@/components/clients/ClientDetailsForm";

const initialClients = [
  {
    id: "CL001",
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567",
    projects: 3,
    agencyDivision: "division-a",
    regNumber: "12345678",
    vatNumber: "GB123456789",
    vatCode: "GB",
    currency: "GBP",
    nominalCode: "",
    awrApplicable: true,
    billingContactName: "John Smith",
    billingContactEmail: "billing@acmecorp.com",
    billingContactPhone: "(555) 123-4567",
    billingAddress: "123 High St\nLondon",
    siteAddress: "123 High St\nLondon",
    eBillingId: "",
    costCentre: "",
    invoiceFrequency: "monthly",
    invoiceDelivery: "email",
    paymentTerms: 30,
    rebate: 0,
  },
  // ... other initial client data if needed ...
];

const Clients = () => {
  const { billingEnabled } = useBillingFeatures();
  const [clients, setClients] = useState(initialClients);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Add new client from form
  const handleAddClient = (clientData: any) => {
    setClients([
      ...clients,
      {
        ...clientData,
        id: clientData.clientId || `CL${clients.length + 1}` // fallback
      }
    ]);
    setSheetOpen(false);
  };

  if (!billingEnabled) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <Building className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Client Management</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Client management is only available with our premium plan. Upgrade to access this feature.
        </p>
        <Button className="flow-gradient">Upgrade Plan</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage your client relationships and projects
          </p>
        </div>
        <Button className="flow-gradient" onClick={() => setSheetOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full max-w-xl sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Add / Edit Client</SheetTitle>
          </SheetHeader>
          <ClientDetailsForm
            onSubmit={handleAddClient}
            onCancel={() => setSheetOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Client Directory</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clients..."
                className="w-full md:w-[250px] pl-8"
                // NOTE: Add search functionality if needed
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Client ID</th>
                  <th className="py-3 px-4 text-left font-medium">Company</th>
                  <th className="py-3 px-4 text-left font-medium">Contact Person</th>
                  <th className="py-3 px-4 text-left font-medium">Email</th>
                  <th className="py-3 px-4 text-left font-medium">Phone</th>
                  <th className="py-3 px-4 text-left font-medium">Currency</th>
                  <th className="py-3 px-4 text-left font-medium">AWR</th>
                  <th className="py-3 px-4 text-left font-medium">VAT Code</th>
                  <th className="py-3 px-4 text-left font-medium">Invoice Freq</th>
                  <th className="py-3 px-4 text-left font-medium">Delivery Method</th>
                  <th className="py-3 px-4 text-left font-medium">Payment Terms</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, idx) => (
                  <tr key={client.id || idx} className="border-b">
                    <td className="py-3 px-4">{client.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-muted rounded-full h-8 w-8 flex items-center justify-center">
                          <Building className="h-4 w-4 text-muted-foreground" />
                        </div>
                        {client.name}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {client.billingContactName || client.contact}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {client.billingContactEmail || client.email}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {client.billingContactPhone || client.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4">{client.currency}</td>
                    <td className="py-3 px-4">{client.awrApplicable ? "Yes" : "No"}</td>
                    <td className="py-3 px-4">{client.vatCode}</td>
                    <td className="py-3 px-4">{client.invoiceFrequency}</td>
                    <td className="py-3 px-4">{client.invoiceDelivery}</td>
                    <td className="py-3 px-4">{client.paymentTerms}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr><td colSpan={12} className="text-center text-muted-foreground py-6">No clients yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
