
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import ClientProfileFields from "./ClientProfileFields";
import ClientBillingInfoFields from "./ClientBillingInfoFields";
import ClientBillingPreferencesFields from "./ClientBillingPreferencesFields";

type Props = {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues?: any;
};

const ClientDetailsForm = ({ onSubmit, onCancel, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      clientId: "",
      name: "",
      agencyDivision: "",
      regNumber: "",
      vatNumber: "",
      vatCode: "",
      currency: "",
      nominalCode: "",
      awrApplicable: true,
      billingContactName: "",
      billingContactEmail: "",
      billingContactPhone: "",
      billingAddress: "",
      siteAddress: "",
      eBillingId: "",
      costCentre: "",
      invoiceFrequency: "",
      invoiceDelivery: "",
      paymentTerms: "",
      rebate: "",
    }
  });

  const internalOnSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(internalOnSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Client Profile</CardTitle>
          <CardDescription>Details about the client organization</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ClientProfileFields register={register} watch={watch} setValue={setValue} errors={errors} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ClientBillingInfoFields register={register} errors={errors} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Billing Preferences</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ClientBillingPreferencesFields register={register} watch={watch} setValue={setValue} errors={errors} />
        </CardContent>
      </Card>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="secondary" onClick={() => { reset(); onCancel(); }}>Cancel</Button>
        <Button type="submit" className="flow-gradient">
          Save Client Details
        </Button>
      </div>
    </form>
  );
};

export default ClientDetailsForm;
