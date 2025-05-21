import { AppLayout } from "@/components/layout/AppLayout";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BillingFeaturesProvider } from "@/hooks/use-billing-features";
import Analytics from "@/pages/Analytics";
import Clients from "@/pages/Clients";
import Dashboard from "@/pages/Dashboard";
import EmployeeDetails from "@/pages/EmployeeDetails";
import EmployeeOnboarding from "@/pages/EmployeeOnboarding";
import Employees from "@/pages/Employees";
import Invoices from "@/pages/Invoices";
import NotFound from "@/pages/NotFound";
import Payments from "@/pages/Payments";
import Payroll from "@/pages/Payroll";
import Payslip from "@/pages/Payslip";
import Reports from "@/pages/Reports";
import AWRReport from "@/pages/reports/AWRReport";
import GPGRReport from "@/pages/reports/GPGRReport";
import Settings from "@/pages/Settings";
import Timesheets from "@/pages/Timesheets";
import UserRoles from "@/pages/UserRoles";
import ClientDetails from "@/pages/ClientDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
              <Route path="employees/onboarding" element={<EmployeeOnboarding />} />
              <Route path="employees/:employeeId" element={<EmployeeDetails />} />
              <Route path="payroll" element={<Payroll />} />
              <Route path="timesheets" element={<Timesheets />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/awr" element={<AWRReport />} />
              <Route path="reports/gpgr" element={<GPGRReport />} />
              <Route path="clients" element={<Clients />} />
              <Route path="clients/:clientId" element={<ClientDetails />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="payments" element={<Payments />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="payslips/:employeeId/:payslipId" element={<Payslip />} />
              <Route path="user-roles" element={<UserRoles />} />
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
