
import React from "react";
import ClientBillingPreferencesFields from "./ClientBillingPreferencesFields";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  register: any;
  watch: any;
  setValue: any;
  errors: any;
};

const ClientBillingPreferencesSection = ({ register, watch, setValue, errors }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>Billing Preferences</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ClientBillingPreferencesFields register={register} watch={watch} setValue={setValue} errors={errors} />
    </CardContent>
  </Card>
);

export default ClientBillingPreferencesSection;
