import { useState, useEffect } from "react";
import styled from "styled-components";
import { ServiceList } from "../ServiceList/ServiceList";
import { ShareModal } from "../ShareModal/ShareModal";
import { useServicePolling } from "../../hooks/useServicePolling";
import { useServiceContext } from "../../contexts/ServiceContext";

const DashboardContainer = styled.div`
  padding: 24px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  max-width: 800px;
  margin: 0 auto 24px auto;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const ShareButton = styled.button`
  padding: 8px 16px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #1976d2;
  }
`;

export const Dashboard: React.FC = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const services = useServicePolling();
  const { selectedServices } = useServiceContext();

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
    <DashboardContainer>
      <Header>
        <div>
          <Title>Service Health Dashboard</Title>
          <p>Overall Status: {overallHealth}</p>
          <p>
            Monitoring {selectedServices.size || services.length} of{" "}
            {services.length} services
          </p>
        </div>
        <ShareButton onClick={() => setShowShareModal(true)}>
          Share Status
        </ShareButton>
      </Header>

      <ServiceList />

      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}
    </DashboardContainer>
  );
};
