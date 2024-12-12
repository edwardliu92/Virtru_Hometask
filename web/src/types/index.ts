export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  lastChecked: number;
}

export type ServiceStatus = "healthy" | "unhealthy" | "degraded";

export interface SharedServiceState {
  timestamp: string;
  services: Service[];
}
