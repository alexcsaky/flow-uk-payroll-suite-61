import { AddClientDialog } from "@/components/clients/AddClientDialog";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  projects: any[];
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "Acme Corporation",
      contact: "John Doe",
      email: "john@acme.com",
      phone: "020 1234 5678",
      projects: [],
    },
    {
      id: 2,
      name: "Tech Solutions Ltd",
      contact: "Jane Smith",
      email: "jane@techsolutions.com",
      phone: "020 8765 4321",
      projects: [],
    },
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
        projects: [],
      },
    ]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Clients</h1>
        <AddClientDialog onClientAdded={handleAddClient} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardHeader>
              <CardTitle>{client.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Contact:</span> {client.contact}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {client.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span> {client.phone}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Projects:</span> {client.projects.length}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 