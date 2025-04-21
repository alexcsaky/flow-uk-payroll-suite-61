
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  onCancel: () => void;
};

const ClientFormActions = ({ onCancel }: Props) => (
  <div className="flex gap-2 justify-end">
    <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
    <Button type="submit" className="flow-gradient">
      Save Client Details
    </Button>
  </div>
);

export default ClientFormActions;
