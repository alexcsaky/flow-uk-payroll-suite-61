import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Trash } from "lucide-react";

type Department = {
  id: string;
  code: string;
  name: string;
  description: string;
  parentCode: string;
  isActive: boolean;
  defaultAllocationMethod: string;
  allowCostSplitting: boolean;
  defaultCostCentreCode: string;
};

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      code: "ADMIN",
      name: "Administration",
      description: "Administrative department",
      parentCode: "",
      isActive: true,
      defaultAllocationMethod: "EmployeeDefault",
      allowCostSplitting: true,
      defaultCostCentreCode: ""
    },
    {
      id: "2",
      code: "FIN",
      name: "Finance",
      description: "Finance department",
      parentCode: "",
      isActive: true,
      defaultAllocationMethod: "EmployeeDefault",
      allowCostSplitting: false,
      defaultCostCentreCode: ""
    },
    {
      id: "3",
      code: "HR",
      name: "Human Resources",
      description: "HR department",
      parentCode: "",
      isActive: true,
      defaultAllocationMethod: "EmployeeDefault",
      allowCostSplitting: false,
      defaultCostCentreCode: ""
    },
    {
      id: "4",
      code: "IT",
      name: "IT",
      description: "Information Technology",
      parentCode: "",
      isActive: true,
      defaultAllocationMethod: "TimesheetDriven",
      allowCostSplitting: true,
      defaultCostCentreCode: ""
    },
    {
      id: "5",
      code: "IT-DEV",
      name: "Development",
      description: "IT Development team",
      parentCode: "IT",
      isActive: true,
      defaultAllocationMethod: "TimesheetDriven",
      allowCostSplitting: true,
      defaultCostCentreCode: ""
    },
  ]);

  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepartments = departments.filter(
    dept => dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
           dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    const newDepartment: Department = {
      id: Date.now().toString(),
      code: "",
      name: "",
      description: "",
      parentCode: "",
      isActive: true,
      defaultAllocationMethod: "EmployeeDefault",
      allowCostSplitting: false,
      defaultCostCentreCode: ""
    };
    
    setCurrentDepartment(newDepartment);
    setIsEditing(true);
  };
  
  const handleEdit = (department: Department) => {
    setCurrentDepartment({...department});
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setDepartments(prev => prev.filter(d => d.id !== id));
    toast.success("Department deleted");
  };

  const handleSaveDepartment = () => {
    if (!currentDepartment || !currentDepartment.code || !currentDepartment.name) {
      toast.error("Department code and name are required");
      return;
    }

    // Check if the code is unique (except when editing the same department)
    const codeExists = departments.some(
      d => d.code === currentDepartment.code && d.id !== currentDepartment.id
    );

    if (codeExists) {
      toast.error("Department code must be unique");
      return;
    }

    const newDepartments = currentDepartment.id
      ? departments.map(d => d.id === currentDepartment.id ? currentDepartment : d)
      : [...departments, currentDepartment];
      
    setDepartments(newDepartments);
    setCurrentDepartment(null);
    setIsEditing(false);
    toast.success("Department saved successfully");
  };

  const handleCancelEdit = () => {
    setCurrentDepartment(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: any) => {
    if (!currentDepartment) return;
    
    setCurrentDepartment({
      ...currentDepartment,
      [field]: value
    });
  };

  const getAvailableParentDepartments = () => {
    // Can't set itself as parent, and can't create circular references
    if (!currentDepartment) return departments;
    
    // Get all departments that this dept can't be a child of (itself and its descendants)
    const excludeCodes = [currentDepartment.code];
    
    // Find all descendants recursively
    const findDescendants = (parentCode: string) => {
      const children = departments.filter(d => d.parentCode === parentCode);
      children.forEach(child => {
        excludeCodes.push(child.code);
        findDescendants(child.code);
      });
    };
    
    findDescendants(currentDepartment.code);
    
    return departments.filter(d => !excludeCodes.includes(d.code));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Departments / Cost Centres</CardTitle>
        <CardDescription>
          Manage organizational structure and cost allocation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEditing ? (
          <>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative">
                <Input
                  placeholder="Search departments..."
                  className="w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-1" /> Add Department
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell className="font-medium">{department.code}</TableCell>
                      <TableCell>{department.name}</TableCell>
                      <TableCell>{department.parentCode || "—"}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${department.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {department.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(department)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(department.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredDepartments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No departments found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <h3 className="font-medium text-lg">{currentDepartment?.id ? 'Edit' : 'New'} Department</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">
                  Department Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  value={currentDepartment?.code || ""}
                  onChange={(e) => handleFieldChange("code", e.target.value.toUpperCase())}
                  placeholder="e.g., HR, FIN, IT"
                  maxLength={50}
                  required
                />
                <p className="text-xs text-muted-foreground">Unique identifier, max 50 characters</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">
                  Department Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={currentDepartment?.name || ""}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  placeholder="e.g., Human Resources"
                  maxLength={100}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={currentDepartment?.description || ""}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  placeholder="Brief description of the department"
                  maxLength={255}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parentCode">Parent Department</Label>
                <Select 
                  value={currentDepartment?.parentCode || ""}
                  onValueChange={(value) => handleFieldChange("parentCode", value)}
                >
                  <SelectTrigger id="parentCode">
                    <SelectValue placeholder="None (Top Level)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None (Top Level)</SelectItem>
                    {getAvailableParentDepartments().map((dept) => (
                      <SelectItem key={dept.id} value={dept.code}>{dept.name} ({dept.code})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Optional parent to create hierarchical structure</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">Active Status</Label>
                  <p className="text-xs text-muted-foreground">Is this department currently active?</p>
                </div>
                <Switch
                  id="isActive"
                  checked={currentDepartment?.isActive || false}
                  onCheckedChange={(checked) => handleFieldChange("isActive", checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Cost Allocation Configuration</h4>
              
              <div className="space-y-2">
                <Label htmlFor="defaultAllocationMethod">
                  Default Allocation Method <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={currentDepartment?.defaultAllocationMethod || ""}
                  onValueChange={(value) => handleFieldChange("defaultAllocationMethod", value)}
                >
                  <SelectTrigger id="defaultAllocationMethod">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EmployeeDefault">Employee Default</SelectItem>
                    <SelectItem value="TimesheetDriven">Timesheet Driven</SelectItem>
                    <SelectItem value="PayElementSpecific">Pay Element Specific</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">How costs are allocated by default</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowCostSplitting">Allow Cost Splitting</Label>
                  <p className="text-xs text-muted-foreground">Allow costs to be split across multiple departments</p>
                </div>
                <Switch
                  id="allowCostSplitting"
                  checked={currentDepartment?.allowCostSplitting || false}
                  onCheckedChange={(checked) => handleFieldChange("allowCostSplitting", checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultCostCentreCode">Default Cost Centre Code</Label>
                <Input
                  id="defaultCostCentreCode"
                  value={currentDepartment?.defaultCostCentreCode || ""}
                  onChange={(e) => handleFieldChange("defaultCostCentreCode", e.target.value)}
                  placeholder="Optional default cost centre"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveDepartment}>Save Department</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
