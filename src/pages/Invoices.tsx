import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, FileText, Download, Eye, Filter, Paperclip, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBillingFeatures } from "@/hooks/use-billing-features";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import our new components
import { InvoiceDialog, InvoiceFormValues } from "@/components/invoices/InvoiceDialog";
import { InvoicePeriodSelector, PeriodType } from "@/components/invoices/InvoicePeriodSelector";
import { InvoicePeriodProgress } from "@/components/invoices/InvoicePeriodProgress";

// Define the invoice type
interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
}

interface Invoice {
  id: string;
  client: string;
  amount: number;
  date: string;
  status: "Paid" | "Pending" | "Overdue";
  category?: string;
  attachments?: Attachment[];
}

interface InvoicePeriod {
  id: string;
  type: PeriodType;
  startDate: Date;
  endDate: Date;
  closed: boolean;
}

const Invoices = () => {
  const { billingEnabled } = useBillingFeatures();
  const { toast } = useToast();
  
  // State for invoice dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // State for invoice period
  const [periodType, setPeriodType] = useState<PeriodType>("weekly");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isPeriodClosed, setIsPeriodClosed] = useState(false);
  const [showPeriodProgress, setShowPeriodProgress] = useState(false);
  
  // Enhanced mock invoice data with attachments
  const allInvoices: Invoice[] = [
    { 
      id: "INV-001", 
      client: "Acme Corporation", 
      amount: 1250.00, 
      date: "2025-04-01", 
      status: "Paid",
      category: "Consulting",
      attachments: [
        { id: "att-001", name: "Receipt_INV001.pdf", type: "PDF", size: "156 KB" },
        { id: "att-002", name: "Contract_Acme.docx", type: "DOCX", size: "245 KB" }
      ]
    },
    { 
      id: "INV-002", 
      client: "Globex Industries", 
      amount: 975.50, 
      date: "2025-04-01", 
      status: "Pending",
      category: "Software Development"
    },
    { 
      id: "INV-003", 
      client: "Stark Enterprises", 
      amount: 3200.00, 
      date: "2025-03-25", 
      status: "Paid",
      category: "Technical Support",
      attachments: [
        { id: "att-003", name: "Payment_Confirmation.pdf", type: "PDF", size: "98 KB" }
      ]
    },
    { 
      id: "INV-004", 
      client: "Wayne Industries", 
      amount: 1800.00, 
      date: "2025-03-20", 
      status: "Overdue",
      category: "Consulting",
      attachments: [
        { id: "att-004", name: "Service_Agreement.pdf", type: "PDF", size: "312 KB" }
      ]
    },
    { 
      id: "INV-005", 
      client: "Umbrella Corporation", 
      amount: 2500.00, 
      date: "2025-03-15", 
      status: "Pending",
      category: "Software Development"
    },
    { 
      id: "INV-006", 
      client: "Oscorp Industries", 
      amount: 4750.00, 
      date: "2025-03-10", 
      status: "Paid",
      category: "Consulting",
      attachments: [
        { id: "att-005", name: "Invoice_Receipt.pdf", type: "PDF", size: "124 KB" }
      ]
    },
    { 
      id: "INV-007", 
      client: "Cyberdyne Systems", 
      amount: 3675.25, 
      date: "2025-03-05", 
      status: "Pending",
      category: "Hardware Supply"
    },
    { 
      id: "INV-008", 
      client: "Initech", 
      amount: 1890.75, 
      date: "2025-03-01", 
      status: "Overdue",
      category: "Technical Support",
      attachments: [
        { id: "att-006", name: "Support_Ticket_Log.xlsx", type: "XLSX", size: "178 KB" },
        { id: "att-007", name: "Client_Correspondence.pdf", type: "PDF", size: "235 KB" }
      ]
    },
    { 
      id: "INV-009", 
      client: "Massive Dynamic", 
      amount: 5280.50, 
      date: "2025-02-25", 
      status: "Paid",
      category: "Research & Development",
      attachments: [
        { id: "att-008", name: "Project_Completion_Report.pdf", type: "PDF", size: "486 KB" }
      ]
    },
    { 
      id: "INV-010", 
      client: "LexCorp", 
      amount: 9870.00, 
      date: "2025-02-20", 
      status: "Paid",
      category: "Consulting"
    }
  ];

  // State for filtering
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(allInvoices);
  const [filters, setFilters] = useState({
    status: [] as string[],
    client: [] as string[],
    category: [] as string[],
    hasAttachments: false,
    minAmount: "",
    maxAmount: "",
    dateFrom: "",
    dateTo: "",
  });

  // Extract unique values for filter options
  const uniqueClients = [...new Set(allInvoices.map(inv => inv.client))];
  const uniqueCategories = [...new Set(allInvoices.map(inv => inv.category).filter(Boolean) as string[])];

  // Apply filters when they change
  useEffect(() => {
    let result = allInvoices;

    // Filter by tab
    if (activeTab !== "all") {
      result = result.filter(inv => inv.status.toLowerCase() === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(inv => 
        inv.id.toLowerCase().includes(term) ||
        inv.client.toLowerCase().includes(term) ||
        inv.category?.toLowerCase().includes(term)
      );
    }

    // Filter by status
    if (filters.status.length > 0) {
      result = result.filter(inv => filters.status.includes(inv.status));
    }

    // Filter by client
    if (filters.client.length > 0) {
      result = result.filter(inv => filters.client.includes(inv.client));
    }

    // Filter by category
    if (filters.category.length > 0) {
      result = result.filter(inv => inv.category && filters.category.includes(inv.category));
    }

    // Filter by has attachments
    if (filters.hasAttachments) {
      result = result.filter(inv => inv.attachments && inv.attachments.length > 0);
    }

    // Filter by minimum amount
    if (filters.minAmount) {
      const minAmount = parseFloat(filters.minAmount);
      result = result.filter(inv => inv.amount >= minAmount);
    }

    // Filter by maximum amount
    if (filters.maxAmount) {
      const maxAmount = parseFloat(filters.maxAmount);
      result = result.filter(inv => inv.amount <= maxAmount);
    }

    // Filter by date range
    if (filters.dateFrom) {
      result = result.filter(inv => new Date(inv.date) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      result = result.filter(inv => new Date(inv.date) <= new Date(filters.dateTo));
    }

    setFilteredInvoices(result);
  }, [activeTab, searchTerm, filters, allInvoices]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Toggle status filters
  const toggleStatusFilter = (status: string) => {
    setFilters(prev => {
      const statuses = [...prev.status];
      if (statuses.includes(status)) {
        return { ...prev, status: statuses.filter(s => s !== status) };
      } else {
        return { ...prev, status: [...statuses, status] };
      }
    });
  };

  // Toggle client filters
  const toggleClientFilter = (client: string) => {
    setFilters(prev => {
      const clients = [...prev.client];
      if (clients.includes(client)) {
        return { ...prev, client: clients.filter(c => c !== client) };
      } else {
        return { ...prev, client: [...clients, client] };
      }
    });
  };

  // Toggle category filters
  const toggleCategoryFilter = (category: string) => {
    setFilters(prev => {
      const categories = [...prev.category];
      if (categories.includes(category)) {
        return { ...prev, category: categories.filter(c => c !== category) };
      } else {
        return { ...prev, category: [...categories, category] };
      }
    });
  };

  // Toggle attachment filter
  const toggleAttachmentFilter = () => {
    setFilters(prev => ({
      ...prev,
      hasAttachments: !prev.hasAttachments
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      status: [],
      client: [],
      category: [],
      hasAttachments: false,
      minAmount: "",
      maxAmount: "",
      dateFrom: "",
      dateTo: "",
    });
    setSearchTerm("");
  };

  // Get number of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.status.length) count++;
    if (filters.client.length) count++;
    if (filters.category.length) count++;
    if (filters.hasAttachments) count++;
    if (filters.minAmount || filters.maxAmount) count++;
    if (filters.dateFrom || filters.dateTo) count++;
    return count;
  };

  // Handle period type change
  const handlePeriodTypeChange = (type: PeriodType) => {
    setPeriodType(type);
    // Reset period closed state when changing period type
    setIsPeriodClosed(false);
  };

  // Handle date change for period
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // Reset period closed state when changing date
    setIsPeriodClosed(false);
  };

  // Handle closing invoice period
  const handleClosePeriod = () => {
    setIsPeriodClosed(true);
    toast({
      title: "Invoice period closed",
      description: "The invoice period has been successfully closed.",
    });
  };

  // Handle view invoice in progress toggle
  const togglePeriodProgress = () => {
    setShowPeriodProgress(!showPeriodProgress);
  };

  // Handle new invoice submission
  const handleNewInvoice = (values: InvoiceFormValues, attachments: File[]) => {
    // Here you would typically make an API call to save the invoice
    // For now, we'll just show a toast notification
    console.log("New invoice:", values);
    console.log("Attachments:", attachments);
    
    toast({
      title: "Invoice created",
      description: `Invoice for ${values.client} has been created successfully.`,
    });
  };

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
          <Button 
            variant={showPeriodProgress ? "default" : "outline"} 
            onClick={togglePeriodProgress}
          >
            View Invoice in Progress
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {getActiveFilterCount() > 0 && (
                  <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <DropdownMenuLabel className="px-4 py-2">Filter Invoices</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="max-h-[70vh] overflow-y-auto">
                <Accordion type="multiple" defaultValue={["status"]}>
                  <AccordionItem value="status">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium">Status</AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="filter-paid" 
                            checked={filters.status.includes("Paid")}
                            onCheckedChange={() => toggleStatusFilter("Paid")} 
                          />
                          <label htmlFor="filter-paid" className="text-sm">Paid</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="filter-pending" 
                            checked={filters.status.includes("Pending")}
                            onCheckedChange={() => toggleStatusFilter("Pending")} 
                          />
                          <label htmlFor="filter-pending" className="text-sm">Pending</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="filter-overdue" 
                            checked={filters.status.includes("Overdue")}
                            onCheckedChange={() => toggleStatusFilter("Overdue")} 
                          />
                          <label htmlFor="filter-overdue" className="text-sm">Overdue</label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="client">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium">Client</AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      <div className="max-h-32 overflow-y-auto space-y-2">
                        {uniqueClients.map(client => (
                          <div key={client} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`filter-client-${client}`} 
                              checked={filters.client.includes(client)}
                              onCheckedChange={() => toggleClientFilter(client)} 
                            />
                            <label htmlFor={`filter-client-${client}`} className="text-sm text-ellipsis overflow-hidden whitespace-nowrap">{client}</label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="category">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium">Category</AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      <div className="max-h-32 overflow-y-auto space-y-2">
                        {uniqueCategories.map(category => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`filter-category-${category}`} 
                              checked={filters.category.includes(category)}
                              onCheckedChange={() => toggleCategoryFilter(category)} 
                            />
                            <label htmlFor={`filter-category-${category}`} className="text-sm">{category}</label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="amount">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium">Amount Range</AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Input
                            placeholder="Min"
                            type="number"
                            value={filters.minAmount}
                            onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Max"
                            type="number"
                            value={filters.maxAmount}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                            className="h-8"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="date">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium">Date Range</AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Input
                            placeholder="From"
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="To"
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                            className="h-8"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="attachments">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium">Attachments</AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-0">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="filter-attachments" 
                          checked={filters.hasAttachments}
                          onCheckedChange={toggleAttachmentFilter} 
                        />
                        <label htmlFor="filter-attachments" className="text-sm">Has attachments</label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <DropdownMenuSeparator />
              
              <div className="flex items-center justify-between p-4">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  <X className="mr-2 h-4 w-4" /> Reset Filters
                </Button>
                <Button size="sm" className="flow-gradient">Apply</Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="flow-gradient" onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
          
          {/* New Invoice Dialog */}
          <InvoiceDialog 
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSubmit={handleNewInvoice}
          />
        </div>
      </div>
      
      {/* Invoice Period Section */}
      {showPeriodProgress && (
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Invoice Period Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <InvoicePeriodSelector 
                  periodType={periodType}
                  selectedDate={selectedDate}
                  onPeriodTypeChange={handlePeriodTypeChange}
                  onDateChange={handleDateChange}
                />
              </CardContent>
            </Card>
          </div>
          <div>
            <InvoicePeriodProgress 
              periodType={periodType}
              selectedDate={selectedDate}
              isPeriodClosed={isPeriodClosed}
              onClosePeriod={handleClosePeriod}
            />
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Invoices</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="w-full md:w-[250px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Attachments</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.client}</TableCell>
                        <TableCell>{invoice.category || "-"}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            invoice.status === "Paid" 
                              ? "bg-green-50 text-green-700" 
                              : invoice.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                          }`}>
                            {invoice.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {invoice.attachments && invoice.attachments.length > 0 ? (
                            <div className="inline-flex items-center">
                              <Paperclip className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-xs">{invoice.attachments.length}</span>
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredInvoices.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No invoices found matching the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;
