
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const agencyDivisionOptions = [
  { value: "division-a", label: "Division A" },
  { value: "division-b", label: "Division B" },
];

const vatCodeOptions = [
  { value: "GB", label: "United Kingdom (GB)" },
  { value: "IE", label: "Ireland (IE)" },
  { value: "none", label: "No VAT" },
];

const currencyOptions = [
  { value: "GBP", label: "GBP - British Pound" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "USD", label: "USD - US Dollar" },
];

const invoiceFrequencyOptions = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "fortnightly", label: "Fortnightly" },
];

const invoiceDeliveryOptions = [
  { value: "email", label: "Email" },
  { value: "post", label: "Post" },
  { value: "portal", label: "Portal" },
];

const ClientDetailsForm = () => {
  return (
    <form className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Client Profile</CardTitle>
          <CardDescription>Details about the client organization</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client-id">Client ID <span className="text-destructive">*</span></Label>
            <Input id="client-id" placeholder="Auto-generated or enter unique ID" required />
          </div>
          <div>
            <Label htmlFor="client-name">Client Name <span className="text-destructive">*</span></Label>
            <Input id="client-name" placeholder="Client company name" required />
          </div>
          <div>
            <Label htmlFor="agency-division">Agency Division</Label>
            <Select>
              <SelectTrigger id="agency-division">
                <SelectValue placeholder="Select division (optional)" />
              </SelectTrigger>
              <SelectContent>
                {agencyDivisionOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="client-reg-number">Client Registered Number</Label>
            <Input id="client-reg-number" placeholder="Registration number" />
          </div>
          <div>
            <Label htmlFor="client-vat-number">Client VAT Number</Label>
            <Input id="client-vat-number" placeholder="VAT registration number" />
          </div>
          <div>
            <Label htmlFor="client-vat-code">Client VAT Code <span className="text-destructive">*</span></Label>
            <Select required>
              <SelectTrigger id="client-vat-code">
                <SelectValue placeholder="Select VAT code" />
              </SelectTrigger>
              <SelectContent>
                {vatCodeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="client-currency">Client Currency <span className="text-destructive">*</span></Label>
            <Select required>
              <SelectTrigger id="client-currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencyOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="nominal-code">Nominal Code (Client)</Label>
            <Input id="nominal-code" placeholder="GL account for mapping" />
          </div>
          <div className="flex items-center mt-6">
            <input
              id="awr-applicable"
              type="checkbox"
              defaultChecked
              className="mr-2"
            />
            <Label htmlFor="awr-applicable" className="mb-0">AWR Applicable</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="billing-contact-name">Billing Contact Name <span className="text-destructive">*</span></Label>
            <Input id="billing-contact-name" placeholder="Invoice recipient name" required />
          </div>
          <div>
            <Label htmlFor="billing-contact-email">Billing Contact Email <span className="text-destructive">*</span></Label>
            <Input id="billing-contact-email" placeholder="Contact email" required type="email" />
          </div>
          <div>
            <Label htmlFor="billing-contact-phone">Billing Contact Phone</Label>
            <Input id="billing-contact-phone" placeholder="Contact phone (optional)" />
          </div>
          <div>
            <Label htmlFor="billing-address">Billing Address <span className="text-destructive">*</span></Label>
            <Textarea id="billing-address" placeholder="Postal billing address" required rows={2} />
          </div>
          <div>
            <Label htmlFor="site-address">Site Address</Label>
            <Textarea id="site-address" placeholder="Work site/service address (optional)" rows={2} />
          </div>
          <div>
            <Label htmlFor="e-billing-id">E-Billing Email/Portal ID</Label>
            <Input id="e-billing-id" placeholder="E-invoicing portal ID (optional)" />
          </div>
          <div>
            <Label htmlFor="client-cost-centre">Client Cost Centre</Label>
            <Input id="client-cost-centre" placeholder="Cost centre code (optional)" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Preferences</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="invoice-frequency">Invoice Frequency <span className="text-destructive">*</span></Label>
            <Select required>
              <SelectTrigger id="invoice-frequency">
                <SelectValue placeholder="How often to invoice?" />
              </SelectTrigger>
              <SelectContent>
                {invoiceFrequencyOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="invoice-delivery">Invoice Delivery Method <span className="text-destructive">*</span></Label>
            <Select required>
              <SelectTrigger id="invoice-delivery">
                <SelectValue placeholder="Select delivery method" />
              </SelectTrigger>
              <SelectContent>
                {invoiceDeliveryOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="payment-terms">Payment Terms (days) <span className="text-destructive">*</span></Label>
            <Input id="payment-terms" placeholder="e.g. 30" type="number" min={1} required />
          </div>
          <div>
            <Label htmlFor="rebate">Rebate %</Label>
            <Input id="rebate" placeholder="Discount/Pct (optional)" type="number" min={0} max={100} step="0.01" />
          </div>
        </CardContent>
      </Card>
      <div>
        <Button type="submit" className="flow-gradient w-full md:w-auto">
          Save Client Details
        </Button>
      </div>
    </form>
  );
};

export default ClientDetailsForm;
