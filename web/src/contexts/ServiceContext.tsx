import { FC, createContext, useContext, useState } from "react";
import { Service } from "../types";

interface ServiceContextType {
  selectedServices: Set<string>;
  toggleService: (serviceId: string) => void;
  services: Service[];
  setServices: (services: Service[]) => void;
  setSelectedServices: (selectedServices: Set<string>) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set()
  );
  const [services, setServices] = useState<Service[]>([]);

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceName)) {
        newSet.delete(serviceName);
      } else {
        newSet.add(serviceName);
      }
      return newSet;
    });
  };

  return (
    <ServiceContext.Provider
      value={{
        selectedServices,
        toggleService,
        services,
        setServices,
        setSelectedServices,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};
