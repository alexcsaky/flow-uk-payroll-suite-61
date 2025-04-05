
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BillingFeaturesProvider } from "@/hooks/use-billing-features";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import Employees from "@/pages/Employees";
import Payroll from "@/pages/Payroll";
import Timesheets from "@/pages/Timesheets";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BillingFeaturesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="employees" element={<Employees />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="timesheets" element={<Timesheets />} />
              {/* Add more routes here as they get implemented */}
              {/* <Route path="approvals" element={<Approvals />} /> */}
              {/* <Route path="reports" element={<Reports />} /> */}
              {/* <Route path="clients" element={<Clients />} /> */}
              {/* <Route path="invoices" element={<Invoices />} /> */}
              {/* <Route path="payments" element={<Payments />} /> */}
              {/* <Route path="analytics" element={<Analytics />} /> */}
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BillingFeaturesProvider>
  </QueryClientProvider>
);

export default App;
