
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function GeneralCompanyInfo() {
  const [companyInfo, setCompanyInfo] = useState({
    companyLegalName: "Flow Payroll Ltd",
    tradingName: "Flow Payroll",
    companyRegistrationNumber: "12345678",
    registeredOfficeAddress: {
      line1: "123 High Street",
      line2: "Suite 45",
      city: "London",
      county: "Greater London",
      postcode: "EC1A 1BB",
      country: "United Kingdom"
    },
    correspondenceAddress: {
      sameAsRegistered: true,
      line1: "123 High Street",
      line2: "Suite 45",
      city: "London",
      county: "Greater London",
      postcode: "EC1A 1BB",
      country: "United Kingdom"
    },
    primaryContact: {
      name: "John Smith",
      email: "john.smith@flowpayroll.com",
      phone: "020 1234 5678"
    },
    businessType: "Ltd"
  });

  const handleInputChange = (field: string, value: string) => {
    setCompanyInfo({
      ...companyInfo,
      [field]: value
    });
  };

  const handleAddressChange = (addressType: 'registeredOfficeAddress' | 'correspondenceAddress', field: string, value: string) => {
    setCompanyInfo({
      ...companyInfo,
      [addressType]: {
        ...companyInfo[addressType],
        [field]: value
      }
    });
  };

  const handleContactChange = (field: string, value: string) => {
    setCompanyInfo({
      ...companyInfo,
      primaryContact: {
        ...companyInfo.primaryContact,
        [field]: value
      }
    });
  };

  const handleSameAddressChange = (checked: boolean) => {
    setCompanyInfo({
      ...companyInfo,
      correspondenceAddress: {
        ...companyInfo.correspondenceAddress,
        sameAsRegistered: checked,
        ...(checked ? companyInfo.registeredOfficeAddress : {})
      }
    });
  };

  const handleSave = () => {
    toast.success("Company information saved successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Company Information</CardTitle>
        <CardDescription>
          Enter your company's legal details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyLegalName">
              Company Legal Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyLegalName"
              value={companyInfo.companyLegalName}
              onChange={(e) => handleInputChange("companyLegalName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradingName">Trading Name</Label>
            <Input
              id="tradingName"
              value={companyInfo.tradingName}
              onChange={(e) => handleInputChange("tradingName", e.target.value)}
              placeholder="If different from legal name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyRegistrationNumber">Company Registration Number</Label>
            <Input
              id="companyRegistrationNumber"
              value={companyInfo.companyRegistrationNumber}
              onChange={(e) => handleInputChange("companyRegistrationNumber", e.target.value)}
              placeholder="8 digits"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Select 
              value={companyInfo.businessType}
              onValueChange={(value) => handleInputChange("businessType", value)}
            >
              <SelectTrigger id="businessType">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ltd">Limited Company</SelectItem>
                <SelectItem value="LLP">Limited Liability Partnership</SelectItem>
                <SelectItem value="Sole Trader">Sole Trader</SelectItem>
                <SelectItem value="Partnership">Partnership</SelectItem>
                <SelectItem value="Charity">Charity</SelectItem>
                <SelectItem value="Public Sector">Public Sector</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Registered Office Address <span className="text-red-500">*</span></h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="regAddressLine1">Address Line 1</Label>
              <Input
                id="regAddressLine1"
                value={companyInfo.registeredOfficeAddress.line1}
                onChange={(e) => handleAddressChange("registeredOfficeAddress", "line1", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regAddressLine2">Address Line 2</Label>
              <Input
                id="regAddressLine2"
                value={companyInfo.registeredOfficeAddress.line2}
                onChange={(e) => handleAddressChange("registeredOfficeAddress", "line2", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regCity">City</Label>
              <Input
                id="regCity"
                value={companyInfo.registeredOfficeAddress.city}
                onChange={(e) => handleAddressChange("registeredOfficeAddress", "city", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regCounty">County</Label>
              <Input
                id="regCounty"
                value={companyInfo.registeredOfficeAddress.county}
                onChange={(e) => handleAddressChange("registeredOfficeAddress", "county", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regPostcode">Postcode</Label>
              <Input
                id="regPostcode"
                value={companyInfo.registeredOfficeAddress.postcode}
                onChange={(e) => handleAddressChange("registeredOfficeAddress", "postcode", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regCountry">Country</Label>
              <Input
                id="regCountry"
                value={companyInfo.registeredOfficeAddress.country}
                onChange={(e) => handleAddressChange("registeredOfficeAddress", "country", e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">Correspondence Address</h3>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="sameAsRegistered"
                checked={companyInfo.correspondenceAddress.sameAsRegistered}
                onChange={(e) => handleSameAddressChange(e.target.checked)}
                className="form-checkbox h-4 w-4"
              />
              <Label htmlFor="sameAsRegistered" className="text-sm font-normal">
                Same as Registered Office
              </Label>
            </div>
          </div>

          {!companyInfo.correspondenceAddress.sameAsRegistered && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="corrAddressLine1">Address Line 1</Label>
                <Input
                  id="corrAddressLine1"
                  value={companyInfo.correspondenceAddress.line1}
                  onChange={(e) => handleAddressChange("correspondenceAddress", "line1", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="corrAddressLine2">Address Line 2</Label>
                <Input
                  id="corrAddressLine2"
                  value={companyInfo.correspondenceAddress.line2}
                  onChange={(e) => handleAddressChange("correspondenceAddress", "line2", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="corrCity">City</Label>
                <Input
                  id="corrCity"
                  value={companyInfo.correspondenceAddress.city}
                  onChange={(e) => handleAddressChange("correspondenceAddress", "city", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="corrCounty">County</Label>
                <Input
                  id="corrCounty"
                  value={companyInfo.correspondenceAddress.county}
                  onChange={(e) => handleAddressChange("correspondenceAddress", "county", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="corrPostcode">Postcode</Label>
                <Input
                  id="corrPostcode"
                  value={companyInfo.correspondenceAddress.postcode}
                  onChange={(e) => handleAddressChange("correspondenceAddress", "postcode", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="corrCountry">Country</Label>
                <Input
                  id="corrCountry"
                  value={companyInfo.correspondenceAddress.country}
                  onChange={(e) => handleAddressChange("correspondenceAddress", "country", e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Primary Contact Information</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                id="contactName"
                value={companyInfo.primaryContact.name}
                onChange={(e) => handleContactChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={companyInfo.primaryContact.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone</Label>
              <Input
                id="contactPhone"
                value={companyInfo.primaryContact.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
