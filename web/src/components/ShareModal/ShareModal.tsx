import { useState } from "react";
import styled from "styled-components";
import { generateShareableLink } from "../../utils/api";
import { useServiceContext } from "../../contexts/ServiceContext";

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 16px 0;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #2196f3;
  color: white;
  cursor: pointer;
  margin: 0 8px;

  &:hover {
    background: #1976d2;
  }
`;

interface ShareModalProps {
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const { services } = useServiceContext();
  const [copied, setCopied] = useState(false);
  const shareableLink = generateShareableLink(services);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h2>Share Current Status</h2>
        <Input value={shareableLink} readOnly />
        <Button onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy Link"}
        </Button>
        <Button onClick={onClose}>Close</Button>
      </Modal>
    </Overlay>
  );
};
