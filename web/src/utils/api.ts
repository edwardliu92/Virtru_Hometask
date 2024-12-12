import { Service, ServiceStatus } from "../types";
import { v4 as uuidv4 } from "uuid";

const API_BASE_URL = "http://localhost:8080";

export const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    const { components } = await response.json();
    return Object.keys(components).map((key) => ({
      id: uuidv4(),
      name: key,
      status: components[key].status as ServiceStatus,
      lastChecked: Date.now(),
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const generateShareableLink = (services: Service[]): string => {
  const state = {
    timestamp: new Date().toISOString(),
    services,
  };
  const encoded = btoa(JSON.stringify(state));
  return `${window.location.origin}?share=${encoded}`;
};
