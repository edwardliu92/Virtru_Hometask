import { useState, useEffect, FC } from "react";

import ServiceList from "./ServiceList";
import ShareModal from "./ShareModal";
import Button from "./Button";
import Dropdown from "./Dropdown";

import { useServicePolling } from "../hooks/useServicePolling";
import { useServiceContext } from "../contexts/ServiceContext";

const Dashboard: FC = () => {
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const services = useServicePolling();
  const { selectedServices, setSelectedServices } = useServiceContext();

  const overallHealth = services.every((s) => s.status === "healthy")
    ? "healthy"
    : services.every((s) => s.status === "unhealthy")
    ? "unhealthy"
    : "degraded";

  useEffect(() => {
    // Request notification permission on mount
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mt-0 mb-6 mx-auto max-w-[800px]">
        <div>
          <h1 className="m-0 text-gray-900">Service Health Dashboard</h1>
          <p className="text-3xl">Overall Status: {overallHealth}</p>
          <p>
            Monitoring {selectedServices.size || services.length} of{" "}
            {services.length} services
          </p>
        </div>
        <Button onClick={() => setShowShareModal(true)} text="Share Status" />
      </header>
      <div className="mx-auto max-w-[800px]">
        <Dropdown
          options={services.map(({ name }) => name)}
          selected={selectedServices}
          onChange={(selected) => {
            setSelectedServices(selected);
          }}
        />
      </div>
      <ServiceList />
      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
