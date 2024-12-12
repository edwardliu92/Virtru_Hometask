import styled from "styled-components";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import { useServiceContext } from "../../contexts/ServiceContext";

const ListContainer = styled.div`
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const NoServices = styled.div`
  text-align: center;
  padding: 32px;
  color: #757575;
`;

export const ServiceList: React.FC = () => {
  const { services, selectedServices, toggleService } = useServiceContext();

  if (!services.length) {
    return <NoServices>No services available</NoServices>;
  }

  return (
    <ListContainer>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          selected={selectedServices.has(service.id)}
          onToggle={() => toggleService(service.id)}
        />
      ))}
    </ListContainer>
  );
};
