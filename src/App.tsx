
import { AppLayout } from "@/components/layout/AppLayout";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BillingFeaturesProvider } from "@/hooks/use-billing-features";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Create a loading component 
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Lazy-load page components
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Settings = lazy(() => import("@/pages/Settings"));
const Employees = lazy(() => import("@/pages/Employees"));
const EmployeeOnboarding = lazy(() => import("@/pages/EmployeeOnboarding"));
const EmployeeDetails = lazy(() => import("@/pages/EmployeeDetails"));
const Payroll = lazy(() => import("@/pages/Payroll"));
const Timesheets = lazy(() => import("@/pages/Timesheets"));
const Approvals = lazy(() => import("@/pages/Approvals"));
const Reports = lazy(() => import("@/pages/Reports"));
const Clients = lazy(() => import("@/pages/Clients"));
const Invoices = lazy(() => import("@/pages/Invoices"));
const Payments = lazy(() => import("@/pages/Payments"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Payslip = lazy(() => import("@/pages/Payslip"));
const UserRoles = lazy(() => import("@/pages/UserRoles"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent refetching when window regains focus
      retry: 1, // Only retry failed queries once
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BillingFeaturesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={<AppLayout />}
            >
              <Route 
                index 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Dashboard />
                  </Suspense>
                } 
              />
              <Route 
                path="settings" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Settings />
                  </Suspense>
                } 
              />
              <Route 
                path="employees" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Employees />
                  </Suspense>
                } 
              />
              <Route 
                path="employees/onboarding" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <EmployeeOnboarding />
                  </Suspense>
                } 
              />
              <Route 
                path="employees/:employeeId" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <EmployeeDetails />
                  </Suspense>
                } 
              />
              <Route 
                path="payroll" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Payroll />
                  </Suspense>
                } 
              />
              <Route 
                path="timesheets" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Timesheets />
                  </Suspense>
                } 
              />
              <Route 
                path="approvals" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Approvals />
                  </Suspense>
                } 
              />
              <Route 
                path="reports" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Reports />
                  </Suspense>
                } 
              />
              <Route 
                path="clients" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Clients />
                  </Suspense>
                } 
              />
              <Route 
                path="invoices" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Invoices />
                  </Suspense>
                } 
              />
              <Route 
                path="payments" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Payments />
                  </Suspense>
                } 
              />
              <Route 
                path="analytics" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Analytics />
                  </Suspense>
                } 
              />
              <Route 
                path="payslips/:employeeId/:payslipId" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Payslip />
                  </Suspense>
                } 
              />
              <Route 
                path="user-roles" 
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <UserRoles />
                  </Suspense>
                } 
              />
            </Route>
            <Route 
              path="*" 
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <NotFound />
                </Suspense>
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BillingFeaturesProvider>
  </QueryClientProvider>
);

export default App;
