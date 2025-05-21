import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Building, Users, Mail, Phone, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBillingFeatures } from "@/hooks/use-billing-features";
import { AddClientDialog } from "@/components/clients/AddClientDialog";
import { useNavigate } from "react-router-dom";

interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  projects: number;
}

const Clients = () => {
  const { billingEnabled } = useBillingFeatures();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "Acme Corporation", contact: "John Smith", email: "john@acmecorp.com", phone: "(555) 123-4567", projects: 3 },
    { id: 2, name: "Globex Industries", contact: "Jane Doe", email: "jane@globex.com", phone: "(555) 765-4321", projects: 2 },
    { id: 3, name: "Stark Enterprises", contact: "Tony Stark", email: "tony@stark.com", phone: "(555) 987-6543", projects: 5 },
    { id: 4, name: "Wayne Industries", contact: "Bruce Wayne", email: "bruce@wayne.com", phone: "(555) 456-7890", projects: 1 },
    { id: 5, name: "Umbrella Corporation", contact: "Alice Wong", email: "alice@umbrella.com", phone: "(555) 234-5678", projects: 4 },
  ]);

  const handleAddClient = (newClient: {
    name: string;
    contact: string;
    email: string;
    phone: string;
  }) => {
    setClients([
      ...clients,
      {
        id: clients.length + 1,
        ...newClient,
        projects: 0,
      },
    ]);
  };

  const handleViewClient = (clientId: number) => {
    navigate(`/clients/${clientId}`);
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
        <AddClientDialog onClientAdded={handleAddClient} />
      </div>

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
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium">Company</th>
                  <th className="py-3 px-4 text-left font-medium">Contact Person</th>
                  <th className="py-3 px-4 text-left font-medium">Email</th>
                  <th className="py-3 px-4 text-left font-medium">Phone</th>
                  <th className="py-3 px-4 text-left font-medium">Projects</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b">
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
                        {client.contact}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {client.email}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {client.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4">{client.projects}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewClient(client.id)}
                        >
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
