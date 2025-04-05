
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "./use-local-storage";

interface BillingFeaturesContextType {
  billingEnabled: boolean;
  toggleBillingFeatures: () => void;
  enableBillingFeatures: () => void;
  disableBillingFeatures: () => void;
}

const BillingFeaturesContext = createContext<BillingFeaturesContextType | undefined>(undefined);

export function BillingFeaturesProvider({ children }: { children: React.ReactNode }) {
  const [billingEnabled, setBillingEnabled] = useLocalStorage<boolean>("flow-billing-enabled", false);

  const toggleBillingFeatures = () => {
    setBillingEnabled(!billingEnabled);
  };

  const enableBillingFeatures = () => {
    setBillingEnabled(true);
  };

  const disableBillingFeatures = () => {
    setBillingEnabled(false);
  };

  return (
    <BillingFeaturesContext.Provider
      value={{
        billingEnabled,
        toggleBillingFeatures,
        enableBillingFeatures,
        disableBillingFeatures,
      }}
    >
      {children}
    </BillingFeaturesContext.Provider>
  );
}

export function useBillingFeatures() {
  const context = useContext(BillingFeaturesContext);
  
  if (context === undefined) {
    throw new Error("useBillingFeatures must be used within a BillingFeaturesProvider");
  }
  
  return context;
}
