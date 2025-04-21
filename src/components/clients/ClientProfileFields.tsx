
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

type Props = {
  register: any;
  watch: any;
  setValue: any;
  errors: any;
};

const ClientProfileFields = ({ register, watch, setValue, errors }: Props) => (
  <>
    <div>
      <Label htmlFor="client-id">Client ID <span className="text-destructive">*</span></Label>
      <Input id="client-id" placeholder="Auto-generated or enter unique ID" {...register("clientId", { required: "Client ID is required" })} />
      {errors.clientId && <span className="text-xs text-destructive">{errors.clientId.message?.toString()}</span>}
    </div>
    <div>
      <Label htmlFor="client-name">Client Name <span className="text-destructive">*</span></Label>
      <Input id="client-name" placeholder="Client company name" {...register("name", { required: "Client Name is required" })} />
      {errors.name && <span className="text-xs text-destructive">{errors.name.message?.toString()}</span>}
    </div>
    <div>
      <Label htmlFor="agency-division">Agency Division</Label>
      <Select onValueChange={val => setValue("agencyDivision", val)} defaultValue={watch("agencyDivision")}>
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
      <Input id="client-reg-number" placeholder="Registration number" {...register("regNumber")} />
    </div>
    <div>
      <Label htmlFor="client-vat-number">Client VAT Number</Label>
      <Input id="client-vat-number" placeholder="VAT registration number" {...register("vatNumber")} />
    </div>
    <div>
      <Label htmlFor="client-vat-code">Client VAT Code <span className="text-destructive">*</span></Label>
      <Select required onValueChange={val => setValue("vatCode", val)} defaultValue={watch("vatCode")}>
        <SelectTrigger id="client-vat-code">
          <SelectValue placeholder="Select VAT code" />
        </SelectTrigger>
        <SelectContent>
          {vatCodeOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.vatCode && <span className="text-xs text-destructive">{errors.vatCode.message?.toString()}</span>}
    </div>
    <div>
      <Label htmlFor="client-currency">Client Currency <span className="text-destructive">*</span></Label>
      <Select required onValueChange={val => setValue("currency", val)} defaultValue={watch("currency")}>
        <SelectTrigger id="client-currency">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          {currencyOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.currency && <span className="text-xs text-destructive">{errors.currency.message?.toString()}</span>}
    </div>
    <div>
      <Label htmlFor="nominal-code">Nominal Code (Client)</Label>
      <Input id="nominal-code" placeholder="GL account for mapping" {...register("nominalCode")} />
    </div>
    <div className="flex items-center mt-6">
      <input
        id="awr-applicable"
        type="checkbox"
        className="mr-2"
        defaultChecked={watch("awrApplicable")}
        {...register("awrApplicable")}
      />
      <Label htmlFor="awr-applicable" className="mb-0">AWR Applicable</Label>
    </div>
  </>
);

export default ClientProfileFields;
