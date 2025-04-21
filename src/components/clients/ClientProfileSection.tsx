
import React from "react";
import ClientProfileFields from "./ClientProfileFields";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type Props = {
  register: any;
  watch: any;
  setValue: any;
  errors: any;
};

const ClientProfileSection = ({ register, watch, setValue, errors }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>Client Profile</CardTitle>
      <CardDescription>Details about the client organization</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ClientProfileFields register={register} watch={watch} setValue={setValue} errors={errors} />
    </CardContent>
  </Card>
);

export default ClientProfileSection;
