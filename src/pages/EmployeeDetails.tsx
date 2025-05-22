import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ExceptionBanner, { Exception } from "../components/employees/ExceptionBanner";
import EmployeeProfile from "../components/employees/EmployeeProfile";
import EmployeeTabs from "../components/employees/EmployeeTabs";
import { employeesData, payslipsData } from "../components/employees/data/mock-data";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [payslips, setPayslips] = useState([]);
  const [currentTab, setCurrentTab] = useState("details");
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [loadingExceptions, setLoadingExceptions] = useState(true);
  
  useEffect(() => {
    // In a real application, we would fetch this data from an API
    const foundEmployee = employeesData.find(emp => emp.id === employeeId);
    if (foundEmployee) {
      setEmployee(foundEmployee);
    }
    
    const employeePayslips = payslipsData[employeeId] || [];
    setPayslips(employeePayslips);
    
    // Create abort controller for fetch operations
    const controller = new AbortController();
    
    // Fetch exceptions for the employee
    fetchExceptions(controller.signal);
    
    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [employeeId]);
  
  const fetchExceptions = async (signal?: AbortSignal) => {
    setLoadingExceptions(true);
    try {
      // In a real application, this would be a real API call
      // For demo purposes, we'll simulate an API call
      await simulateFetch(signal);
      
      // Check if the operation was aborted
      if (signal?.aborted) return;
      
      // Generate mock exceptions for specific employees to demonstrate functionality
      let mockExceptions: Exception[] = [];
      
      if (employeeId === "EMP001") {
        mockExceptions = [
          {
            id: "EXC001",
            type: "National Insurance Code Invalid",
            description: "The NI code AB123456C format is incorrect for HMRC submissions.",
            suggestedAction: "Update to valid format (2 letters, 6 digits, 1 letter).",
            severity: "high"
          }
        ];
      } else if (employeeId === "EMP003") {
        mockExceptions = [
          {
            id: "EXC002",
            type: "Missing Pension Enrollment",
            description: "Employee is eligible for auto-enrollment but no pension scheme is assigned.",
            suggestedAction: "Set up pension enrollment in Payroll > Pension settings.",
            severity: "medium"
          },
          {
            id: "EXC003",
            type: "Tax Code Requires Verification",
            description: "Current tax code may be outdated based on latest HMRC data.",
            suggestedAction: "Verify tax code with HMRC and update if necessary.",
            severity: "low"
          }
        ];
      }
      
      // Check if the operation was aborted before setting state
      if (signal?.aborted) return;
      setExceptions(mockExceptions);
    } catch (error) {
      if (error.name === 'AbortError') {
        // Ignore abort errors
        return;
      }
      console.error("Error fetching exceptions:", error);
    } finally {
      if (!signal?.aborted) {
        setLoadingExceptions(false);
      }
    }
  };
  
  // Simulate API fetch delay
  const simulateFetch = (signal?: AbortSignal) => {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(resolve, 1000);
      
      // Add abort listener
      signal?.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new DOMException('Aborted', 'AbortError'));
      });
    });
  };
  
  const resolveException = async (exceptionId: string) => {
    const controller = new AbortController();
    try {
      // In a real application, this would be a real API call to resolve the exception
      // POST /api/employees/{id}/exceptions/{exceptionId}/resolve
      await simulateFetch(controller.signal);
      
      // Check if the operation was aborted
      if (controller.signal.aborted) return;
      
      // Remove the resolved exception from state
      setExceptions(prev => prev.filter(exc => exc.id !== exceptionId));
    } catch (error) {
      if (error.name === 'AbortError') {
        // Ignore abort errors
        return;
      }
      console.error("Error resolving exception:", error);
      throw error;
    }
  };
  
  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold mb-2">Employee Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The employee you are looking for could not be found.
        </p>
        <Button onClick={() => navigate('/employees')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Employees
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate('/employees')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Employee Details</h2>
      </div>
      
      {/* Exception Banner */}
      <ExceptionBanner
        employeeId={employeeId}
        exceptions={exceptions}
        isLoading={loadingExceptions}
        onResolve={resolveException}
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Employee info */}
        <div className="w-full md:w-1/3">
          <EmployeeProfile employee={employee} />
        </div>
        
        {/* Right column - Tabs and payslips */}
        <div className="w-full md:w-2/3">
          <EmployeeTabs 
            employee={employee} 
            payslips={payslips}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
