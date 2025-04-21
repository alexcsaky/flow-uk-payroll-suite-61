
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Props = {
  register: any;
  errors: any;
};

const ClientBillingInfoFields = ({ register, errors }: Props) => (
  <>
    <div>
      <Label htmlFor="billing-contact-name">Billing Contact Name <span className="text-destructive">*</span></Label>
      <Input id="billing-contact-name" placeholder="Invoice recipient name" {...register("billingContactName", { required: "Billing Contact Name is required" })} />
      {errors.billingContactName && <span className="text-xs text-destructive">{errors.billingContactName.message?.toString()}</span>}
    </div>
    <div>
      <Label htmlFor="billing-contact-email">Billing Contact Email <span className="text-destructive">*</span></Label>
      <Input id="billing-contact-email" placeholder="Contact email" type="email" {...register("billingContactEmail", { required: "Billing Contact Email is required" })} />
      {errors.billingContactEmail && <span className="text-xs text-destructive">{errors.billingContactEmail.message?.toString()}</span>}
    </div>
    <div>
      <Label htmlFor="billing-contact-phone">Billing Contact Phone</Label>
      <Input id="billing-contact-phone" placeholder="Contact phone (optional)" {...register("billingContactPhone")} />
    </div>
    <div>
      <Label htmlFor="billing-address">Billing Address <span className="text-destructive">*</span></Label>
      <Textarea id="billing-address" placeholder="Postal billing address" rows={2} {...register("billingAddress", { required: "Billing Address is required" })} />
      {errors.billingAddress && <span className="text-xs text-destructive">{errors.billingAddress.message?.toString()}</span>}
    </div>
    <div>
      <Label htmlFor="site-address">Site Address</Label>
      <Textarea id="site-address" placeholder="Work site/service address (optional)" rows={2} {...register("siteAddress")} />
    </div>
    <div>
      <Label htmlFor="e-billing-id">E-Billing Email/Portal ID</Label>
      <Input id="e-billing-id" placeholder="E-invoicing portal ID (optional)" {...register("eBillingId")} />
    </div>
    <div>
      <Label htmlFor="client-cost-centre">Client Cost Centre</Label>
      <Input id="client-cost-centre" placeholder="Cost centre code (optional)" {...register("costCentre")} />
    </div>
  </>
);

export default ClientBillingInfoFields;
