
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ContractorCompanyDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex items-center">
            <img 
              src="/lovable-uploads/aaaf9669-882c-4f7a-b1a6-b91bc7dc6453.png" 
              alt="" 
              className="h-6 mr-2"
              style={{ objectFit: 'contain', minWidth: 16 }}
            />
            Contractor Company Details
          </span>
        </CardTitle>
        <CardDescription>
          Enter the details of the contractor's company below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contractor-company-name">Company Name</Label>
            <Input id="contractor-company-name" placeholder="Enter company name" />
          </div>
          <div>
            <Label htmlFor="contractor-company-number">Company Number</Label>
            <Input id="contractor-company-number" placeholder="Enter company number" />
          </div>
          <div>
            <Label htmlFor="contractor-company-address">Company Address</Label>
            <Input id="contractor-company-address" placeholder="Enter company address" />
          </div>
          <div>
            <Label htmlFor="contractor-company-email">Company Email</Label>
            <Input id="contractor-company-email" placeholder="Enter company email" type="email" />
          </div>
        </div>
        <Button className="mt-4" type="button">Save Contractor Details</Button>
      </CardContent>
    </Card>
  );
};

export default ContractorCompanyDetails;
