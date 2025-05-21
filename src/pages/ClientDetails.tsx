import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, Mail, Phone, ArrowLeft, Plus, Calendar, DollarSign, FileText } from "lucide-react";
import { useBillingFeatures } from "@/hooks/use-billing-features";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Project {
  id: number;
  name: string;
  status: "active" | "completed" | "on-hold";
  startDate: string;
  budget: number;
  description: string;
}

interface Invoice {
  id: number;
  number: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

const ClientDetails = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { billingEnabled } = useBillingFeatures();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in a real app, this would come from an API
  const client = {
    id: Number(clientId),
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567",
    address: "123 Business Street, London, UK",
    industry: "Technology",
    totalInvoiced: 25000.00,
    lastInvoiceDate: "2024-05-15",
    rebateRate: 3.5,
    projects: [
      {
        id: 1,
        name: "Website Redesign",
        status: "active",
        startDate: "2024-01-15",
        budget: 15000,
        description: "Complete overhaul of company website with new design and features",
      },
      {
        id: 2,
        name: "Mobile App Development",
        status: "on-hold",
        startDate: "2024-02-01",
        budget: 25000,
        description: "Development of iOS and Android mobile applications",
      },
    ] as Project[],
    invoices: [
      {
        id: 1,
        number: "INV-2024-001",
        date: "2024-01-15",
        amount: 5000,
        status: "paid",
      },
      {
        id: 2,
        number: "INV-2024-002",
        date: "2024-02-01",
        amount: 7500,
        status: "pending",
      },
    ] as Invoice[],
  };

  const rebateValue = (client.totalInvoiced * client.rebateRate) / 100;

  if (!billingEnabled) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <Building className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Client Details</h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Client details are only available with our premium plan. Upgrade to access this feature.
        </p>
        <Button className="flow-gradient">Upgrade Plan</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/clients")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
          <p className="text-muted-foreground">Client Details</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{client.contact}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{client.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{client.address}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Total Invoiced:</span>
              <span>£{client.totalInvoiced.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Last Invoice Date:</span>
              <span>{new Date(client.lastInvoiceDate).toLocaleDateString()}</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Current Rebate Rate:</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        value={`${client.rebateRate}% (£${rebateValue.toLocaleString()})`}
                        readOnly
                        className="bg-muted/50 cursor-help"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[300px]">
                    <p>
                      This rate represents a percentage of total invoices generated for this client to date, along with the estimated current value of the rebate.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start gap-2">
              <Plus className="h-4 w-4" />
              Add New Project
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              Generate Invoice
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Meeting
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {client.projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        Budget: £{project.budget.toLocaleString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === "active" ? "bg-green-100 text-green-800" :
                        project.status === "on-hold" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Projects</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {client.projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">Budget</div>
                        <div className="text-sm text-muted-foreground">
                          £{project.budget.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Start Date</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(project.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === "active" ? "bg-green-100 text-green-800" :
                        project.status === "on-hold" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Invoices</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {client.invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{invoice.number}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">Amount</div>
                        <div className="text-sm text-muted-foreground">
                          £{invoice.amount.toLocaleString()}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        invoice.status === "paid" ? "bg-green-100 text-green-800" :
                        invoice.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Documents</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Documents</h3>
                <p className="text-muted-foreground">
                  Upload documents related to this client
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetails; 