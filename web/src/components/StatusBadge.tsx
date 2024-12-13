import { FC } from "react";
import classNames from "classnames";

import { ServiceStatus } from "../types";

interface StatusBadgeProps {
  status: ServiceStatus;
  changed?: boolean;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status, changed }) => (
  <span
    className={classNames(
      "px-2 py-1 rounded-xl text-xs font-semibold uppercase text-white",
      status === "healthy"
        ? "bg-status-healthy"
        : status === "unhealthy"
        ? "bg-status-unhealthy"
        : status === "degraded"
        ? "bg-status-degraded"
        : "bg-status-default",
      changed && "animate-pulse"
    )}
  >
    {status}
  </span>
);

export default StatusBadge;
