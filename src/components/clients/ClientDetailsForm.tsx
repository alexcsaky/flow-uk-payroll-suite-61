
import React from "react";
import { useForm } from "react-hook-form";
import ClientProfileSection from "./ClientProfileSection";
import ClientBillingInfoSection from "./ClientBillingInfoSection";
import ClientBillingPreferencesSection from "./ClientBillingPreferencesSection";
import ClientFormActions from "./ClientFormActions";

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

  const internalOnCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(internalOnSubmit)}>
      <ClientProfileSection register={register} watch={watch} setValue={setValue} errors={errors} />
      <ClientBillingInfoSection register={register} errors={errors} />
      <ClientBillingPreferencesSection register={register} watch={watch} setValue={setValue} errors={errors} />
      <ClientFormActions onCancel={internalOnCancel} />
    </form>
  );
};

export default ClientDetailsForm;
