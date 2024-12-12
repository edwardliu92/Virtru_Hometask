import styled from "styled-components";
import { Service } from "../../types";
import { StatusBadge } from "../StatusBadge/StatusBadge";

interface ServiceCardProps {
  service: Service;
  previousStatus?: string;
  selected: boolean;
  onToggle: () => void;
}

const Card = styled.div<{ selected: boolean }>`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  background-color: ${({ selected }) => (selected ? "#f5f5f5" : "white")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ServiceName = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const LastChecked = styled.span`
  font-size: 12px;
  color: #757575;
`;

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  previousStatus,
  selected,
  onToggle,
}) => {
  const statusChanged = previousStatus && previousStatus !== service.status;

  return (
    <Card selected={selected} onClick={onToggle}>
      <ServiceHeader>
        <ServiceName>{service.name}</ServiceName>
        <StatusBadge status={service.status} changed={statusChanged} />
      </ServiceHeader>
      <LastChecked>
        Last checked: {new Date(service.lastChecked).toLocaleString()}
      </LastChecked>
    </Card>
  );
};
