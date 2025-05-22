import { AppLayout } from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BillingFeaturesProvider } from "@/hooks/use-billing-features";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

// Import all pages
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
import PensionsReport from "@/pages/reports/PensionsReport";
import StatutoryPayOverview from "@/pages/reports/StatutoryPayOverview";
import WTRLeaveReport from "@/pages/reports/WTRLeaveReport";
import Settings from "@/pages/Settings";
import Timesheets from "@/pages/Timesheets";
import UserRoles from "@/pages/UserRoles";
import ClientDetails from "@/pages/ClientDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h1>
            <p className="text-muted-foreground">Please try refreshing the page</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BillingFeaturesProvider>
        <TooltipProvider>
          <Toaster />
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
                <Route path="reports/wtr-leave-report" element={<WTRLeaveReport />} />
                <Route path="reports/awr" element={<AWRReport />} />
                <Route path="reports/gpgr" element={<GPGRReport />} />
                <Route path="reports/statutory-pay-overview" element={<StatutoryPayOverview />} />
                <Route path="reports/pensions" element={<PensionsReport />} />
                <Route path="clients" element={<Clients />} />
                <Route path="clients/:clientId" element={<ClientDetails />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="payments" element={<Payments />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="payslips/:employeeId/:payslipId" element={<Payslip />} />
                <Route path="user-roles" element={<UserRoles />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BillingFeaturesProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
