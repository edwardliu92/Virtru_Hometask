import { useEffect, useRef } from "react";
import { Service } from "../types";
import { fetchServices } from "../utils/api";
import { useServiceContext } from "../contexts/ServiceContext";

export const useServicePolling = (interval: number = 5000) => {
  const { services, setServices } = useServiceContext();
  const previousServices = useRef<Service[]>([]);

  useEffect(() => {
    const pollServices = async () => {
      try {
        const newServices = await fetchServices();

        // Check for status changes and notify
        newServices.forEach((newService) => {
          const oldService = previousServices.current.find(
            (s) => s.name === newService.name
          );
          if (oldService && oldService.status !== newService.status) {
            notifyStatusChange(newService);
          }
        });

        previousServices.current = newServices;
        setServices(newServices);
      } catch (error) {
        console.error("Error polling services:", error);
      }
    };

    pollServices(); // Initial fetch
    const intervalId = setInterval(pollServices, interval);

    return () => clearInterval(intervalId);
  }, [setServices, interval]);

  return services;
};

const notifyStatusChange = (service: Service) => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(`Service Status Changed!`, {
      body: `${service.name} service is now ${service.status}`,
    });
  }
};
