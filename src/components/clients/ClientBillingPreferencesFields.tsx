
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

type Props = {
  register: any;
  watch: any;
  setValue: any;
  errors: any;
};

const ClientBillingPreferencesFields = ({ register, watch, setValue, errors }: Props) => (
  <>
    <div>
      <Label htmlFor="invoice-frequency">Invoice Frequency <span className="text-destructive">*</span></Label>
      <Select required onValueChange={val => setValue("invoiceFrequency", val)} defaultValue={watch("invoiceFrequency")}>
        <SelectTrigger id="invoice-frequency">
          <SelectValue placeholder="How often to invoice?" />
        </SelectTrigger>
        <SelectContent>
          {invoiceFrequencyOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.invoiceFrequency && <span className="text-xs text-destructive">{errors.invoiceFrequency.message?.toString()}</span>}
    </div>
    <div>
      <Label htmlFor="invoice-delivery">Invoice Delivery Method <span className="text-destructive">*</span></Label>
      <Select required onValueChange={val => setValue("invoiceDelivery", val)} defaultValue={watch("invoiceDelivery")}>
        <SelectTrigger id="invoice-delivery">
          <SelectValue placeholder="Select delivery method" />
        </SelectTrigger>
        <SelectContent>
          {invoiceDeliveryOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.invoiceDelivery && <span className="text-xs text-destructive">{errors.invoiceDelivery.message?.toString()}</span>}
    </div>
    <div>
      <Label htmlFor="payment-terms">Payment Terms (days) <span className="text-destructive">*</span></Label>
      <Input id="payment-terms" placeholder="e.g. 30" type="number" min={1} {...register("paymentTerms", { required: "Payment terms required" })} />
      {errors.paymentTerms && <span className="text-xs text-destructive">{errors.paymentTerms.message?.toString()}</span>}
    </div>
    <div>
      <Label htmlFor="rebate">Rebate %</Label>
      <Input id="rebate" placeholder="Discount/Pct (optional)" type="number" min={0} max={100} step="0.01" {...register("rebate")} />
    </div>
  </>
);

export default ClientBillingPreferencesFields;
