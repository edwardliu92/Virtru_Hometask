import styled from "styled-components";
import { ServiceStatus } from "../../types";

interface StatusBadgeProps {
  status: ServiceStatus;
  changed?: boolean;
}

const Badge = styled.span<StatusBadgeProps>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${({ status }) => {
    switch (status) {
      case "healthy":
        return "#4caf50";
      case "unhealthy":
        return "#f44336";
      case "degraded":
        return "#ff9800";
      default:
        return "#9e9e9e";
    }
  }};
  color: white;
  ${({ changed }) =>
    changed &&
    `
    animation: pulse 2s infinite;
  `}

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  changed,
}) => (
  <Badge status={status} changed={changed}>
    {status}
  </Badge>
);
