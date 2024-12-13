import { FC } from "react";

import StatusBadge from "./StatusBadge";
import { Service } from "../types";

interface ServiceCardProps {
  service: Service;
  previousStatus?: string;
  selected: boolean;
  onToggle: () => void;
}

const ServiceCard: FC<ServiceCardProps> = ({
  service,
  previousStatus,
  selected,
  onToggle,
}) => {
  const statusChanged = previousStatus && previousStatus !== service.status;

  return (
    <div
      className={`border border-solid border-gray-700 rounded-lg p-4 my-2 mx-0 ${
        selected ? "bg-gray-600" : "bg-white"
      } cursor-pointer transition-all duration-300 ease-in hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)]`}
      onClick={onToggle}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="m-0 text-base">{service.name}</h3>
        <StatusBadge status={service.status} changed={statusChanged} />
      </div>
      <span className="text-xs text-gray-800">
        Last checked: {new Date(service.lastChecked).toLocaleString()}
      </span>
    </div>
  );
};

export default ServiceCard;
