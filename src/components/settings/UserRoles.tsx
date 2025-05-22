import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Trash, Lock, Check, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Permission = {
  name: string;
  description: string;
  view: boolean;
  edit: boolean;
};

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, Permission>;
  isEditable: boolean;
};

export default function UserRoles() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "System Administrator",
      description: "Full access to all system features",
      permissions: {
        companyInfo: {
          name: "Company Information",
          description: "General company details",
          view: true,
          edit: true
        },
        hmrcCredentials: {
          name: "HMRC Credentials",
          description: "HMRC login details and settings",
          view: true,
          edit: true
        },
        payRunSettings: {
          name: "Pay Run Settings",
          description: "Pay frequencies and schedule configuration",
          view: true,
          edit: true
        },
        pensionSettings: {
          name: "Pension Settings",
          description: "Pension schemes and auto-enrollment",
          view: true,
          edit: true
        },
        openingBalances: {
          name: "Opening Balances",
          description: "Employee YTD figures",
          view: true,
          edit: true
        },
        yearEndSettings: {
          name: "Year-End Settings",
          description: "P60 and year-end process configuration",
          view: true,
          edit: true
        },
        departments: {
          name: "Departments",
          description: "Department and cost center structure",
          view: true,
          edit: true
        }
      },
      isEditable: false
    },
    {
      id: "2",
      name: "Payroll Manager",
      description: "Can manage payroll operations but not system settings",
      permissions: {
        companyInfo: {
          name: "Company Information",
          description: "General company details",
          view: true,
          edit: true
        },
        hmrcCredentials: {
          name: "HMRC Credentials",
          description: "HMRC login details and settings",
          view: true,
          edit: false
        },
        payRunSettings: {
          name: "Pay Run Settings",
          description: "Pay frequencies and schedule configuration",
          view: true,
          edit: true
        },
        pensionSettings: {
          name: "Pension Settings",
          description: "Pension schemes and auto-enrollment",
          view: true,
          edit: true
        },
        openingBalances: {
          name: "Opening Balances",
          description: "Employee YTD figures",
          view: true,
          edit: true
        },
        yearEndSettings: {
          name: "Year-End Settings",
          description: "P60 and year-end process configuration",
          view: true,
          edit: true
        },
        departments: {
          name: "Departments",
          description: "Department and cost center structure",
          view: true,
          edit: false
        }
      },
      isEditable: true
    },
    {
      id: "3",
      name: "Finance User",
      description: "Can view financial data but not edit core settings",
      permissions: {
        companyInfo: {
          name: "Company Information",
          description: "General company details",
          view: true,
          edit: false
        },
        hmrcCredentials: {
          name: "HMRC Credentials",
          description: "HMRC login details and settings",
          view: false,
          edit: false
        },
        payRunSettings: {
          name: "Pay Run Settings",
          description: "Pay frequencies and schedule configuration",
          view: true,
          edit: false
        },
        pensionSettings: {
          name: "Pension Settings",
          description: "Pension schemes and auto-enrollment",
          view: true,
          edit: false
        },
        openingBalances: {
          name: "Opening Balances",
          description: "Employee YTD figures",
          view: true,
          edit: false
        },
        yearEndSettings: {
          name: "Year-End Settings",
          description: "P60 and year-end process configuration",
          view: true,
          edit: false
        },
        departments: {
          name: "Departments",
          description: "Department and cost center structure",
          view: true,
          edit: false
        }
      },
      isEditable: true
    },
    {
      id: "4",
      name: "Read Only",
      description: "Can only view data, no editing permissions",
      permissions: {
        companyInfo: {
          name: "Company Information",
          description: "General company details",
          view: true,
          edit: false
        },
        hmrcCredentials: {
          name: "HMRC Credentials",
          description: "HMRC login details and settings",
          view: false,
          edit: false
        },
        payRunSettings: {
          name: "Pay Run Settings",
          description: "Pay frequencies and schedule configuration",
          view: true,
          edit: false
        },
        pensionSettings: {
          name: "Pension Settings",
          description: "Pension schemes and auto-enrollment",
          view: true,
          edit: false
        },
        openingBalances: {
          name: "Opening Balances",
          description: "Employee YTD figures",
          view: true,
          edit: false
        },
        yearEndSettings: {
          name: "Year-End Settings",
          description: "P60 and year-end process configuration",
          view: true,
          edit: false
        },
        departments: {
          name: "Departments",
          description: "Department and cost center structure",
          view: true,
          edit: false
        }
      },
      isEditable: true
    }
  ]);

  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const permissionSections = [
    { id: "companyInfo", name: "Company Information", description: "General company details" },
    { id: "hmrcCredentials", name: "HMRC Credentials", description: "HMRC login details and settings" },
    { id: "payRunSettings", name: "Pay Run Settings", description: "Pay frequencies and schedule configuration" },
    { id: "pensionSettings", name: "Pension Settings", description: "Pension schemes and auto-enrollment" },
    { id: "openingBalances", name: "Opening Balances", description: "Employee YTD figures" },
    { id: "yearEndSettings", name: "Year-End Settings", description: "P60 and year-end process configuration" },
    { id: "departments", name: "Departments", description: "Department and cost center structure" }
  ];

  const handleAddNew = () => {
    // Create a new role with all permissions set to false
    const permissions: Record<string, Permission> = {};
    
    permissionSections.forEach(section => {
      permissions[section.id] = {
        name: section.name,
        description: section.description,
        view: false,
        edit: false
      };
    });
    
    const newRole: Role = {
      id: Date.now().toString(),
      name: "",
      description: "",
      permissions,
      isEditable: true
    };
    
    setCurrentRole(newRole);
    setIsEditing(true);
  };
  
  const handleEdit = (role: Role) => {
    if (!role.isEditable) {
      toast.error("System roles cannot be modified");
      return;
    }
    
    setCurrentRole({...role});
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setRoles(prev => prev.filter(r => r.id !== id));
    toast.success("Role deleted");
  };

  const handleSaveRole = () => {
    if (!currentRole || !currentRole.name) {
      toast.error("Role name is required");
      return;
    }

    // Make sure edit permissions can't exist without view permissions
    const fixedPermissions = { ...currentRole.permissions };
    Object.keys(fixedPermissions).forEach(key => {
      if (fixedPermissions[key].edit && !fixedPermissions[key].view) {
        fixedPermissions[key].view = true;
      }
    });

    const updatedRole = {
      ...currentRole,
      permissions: fixedPermissions
    };

    const newRoles = currentRole.id
      ? roles.map(r => r.id === currentRole.id ? updatedRole : r)
      : [...roles, updatedRole];
      
    setRoles(newRoles);
    setCurrentRole(null);
    setIsEditing(false);
    toast.success("Role saved successfully");
  };

  const handleCancelEdit = () => {
    setCurrentRole(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: any) => {
    if (!currentRole) return;
    
    setCurrentRole({
      ...currentRole,
      [field]: value
    });
  };

  const handlePermissionChange = (
    sectionId: string,
    permission: 'view' | 'edit',
    value: boolean
  ) => {
    if (!currentRole) return;
    
    // If turning off view, also turn off edit
    const editValue = permission === 'view' && !value ? false : 
                      permission === 'edit' ? value : 
                      currentRole.permissions[sectionId].edit;
                      
    // If turning on edit, also turn on view
    const viewValue = permission === 'edit' && value ? true : 
                      permission === 'view' ? value : 
                      currentRole.permissions[sectionId].view;
    
    setCurrentRole({
      ...currentRole,
      permissions: {
        ...currentRole.permissions,
        [sectionId]: {
          ...currentRole.permissions[sectionId],
          view: viewValue,
          edit: editValue
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Roles & Permissions</CardTitle>
        <CardDescription>
          Manage role-based access control for system users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">Roles</h3>
          <Sheet open={isEditing} onOpenChange={(open) => {
            if (!open) handleCancelEdit();
          }}>
            <SheetTrigger asChild>
              <Button onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-1" /> Add Role
              </Button>
            </SheetTrigger>
            {currentRole && (
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto" side="right">
                <SheetHeader className="pb-5">
                  <SheetTitle>{currentRole.id ? 'Edit' : 'New'} Role</SheetTitle>
                  <SheetDescription>
                    Configure role details and permissions
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="roleName">
                        Role Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="roleName"
                        value={currentRole.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        placeholder="e.g., Finance Manager"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="roleDescription">
                        Description
                      </Label>
                      <Input
                        id="roleDescription"
                        value={currentRole.description}
                        onChange={(e) => handleFieldChange("description", e.target.value)}
                        placeholder="Brief description of this role's purpose"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Permissions Matrix
                    </h4>
                    
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[40%]">Section</TableHead>
                            <TableHead className="text-center">View</TableHead>
                            <TableHead className="text-center">Edit</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {permissionSections.map((section) => (
                            <TableRow key={section.id}>
                              <TableCell className="font-medium">
                                <div>
                                  {section.name}
                                  <p className="text-xs text-muted-foreground">{section.description}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <Switch
                                  checked={currentRole.permissions[section.id]?.view || false}
                                  onCheckedChange={(checked) => handlePermissionChange(section.id, 'view', checked)}
                                />
                              </TableCell>
                              <TableCell className="text-center">
                                <Switch
                                  checked={currentRole.permissions[section.id]?.edit || false}
                                  disabled={!currentRole.permissions[section.id]?.view}
                                  onCheckedChange={(checked) => handlePermissionChange(section.id, 'edit', checked)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">Note: Edit permission requires View permission; HMRC credentials and bank details require special access.</p>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                    <Button onClick={handleSaveRole}>Save Role</Button>
                  </div>
                </div>
              </SheetContent>
            )}
          </Sheet>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">View Permissions</TableHead>
                <TableHead className="text-center">Edit Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => {
                const viewCount = Object.values(role.permissions).filter(p => p.view).length;
                const editCount = Object.values(role.permissions).filter(p => p.edit).length;
                const totalSections = Object.keys(role.permissions).length;
                
                return (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {!role.isEditable && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                        {role.name}
                      </div>
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell className="text-center">
                      {viewCount} / {totalSections}
                    </TableCell>
                    <TableCell className="text-center">
                      {editCount} / {totalSections}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEdit(role)}
                        disabled={!role.isEditable}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(role.id)}
                        disabled={!role.isEditable}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4 mt-4">
          <h3 className="font-medium text-lg">Audit & Security</h3>
          
          <div className="p-4 bg-muted/20 rounded-md space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              <span>All changes to permissions are logged in the audit trail</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              <span>HMRC credentials and bank details are encrypted in storage</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              <span>API credentials are masked and stored securely</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <X className="h-4 w-4 text-amber-600" />
              <span>System Administrator permissions cannot be modified</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
