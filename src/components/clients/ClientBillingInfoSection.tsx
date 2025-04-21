
import React from "react";
import ClientBillingInfoFields from "./ClientBillingInfoFields";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  register: any;
  errors: any;
};

const ClientBillingInfoSection = ({ register, errors }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>Billing Information</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ClientBillingInfoFields register={register} errors={errors} />
    </CardContent>
  </Card>
);

export default ClientBillingInfoSection;
