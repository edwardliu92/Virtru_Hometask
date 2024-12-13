import { FC } from "react";

import ServiceCard from "./ServiceCard";
import { useServiceContext } from "../contexts/ServiceContext";

const ServiceList: FC = () => {
  const { services, selectedServices, toggleService } = useServiceContext();

  if (!services.length) {
    return (
      <div className="p-8 text-gray-800 text-center">No services available</div>
    );
  }

  return (
    <div className="p-4 max-w-[800px] my-0 mx-auto">
      {services
        .filter(({ name }) => {
          if (selectedServices.size === 0) return true;
          return selectedServices.has(name);
        })
        .map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={selectedServices.has(service.name)}
            onToggle={() => toggleService(service.name)}
          />
        ))}
    </div>
  );
};

export default ServiceList;
