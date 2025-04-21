
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserRolesComponent from "@/components/settings/UserRoles";

export default function UserRoles() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Roles & Permissions</h1>
        <p className="text-muted-foreground">
          Manage access control for system users
        </p>
      </div>
      
      <UserRolesComponent />
    </div>
  );
}
