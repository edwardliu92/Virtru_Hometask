import { useState } from "react";

import Button from "./Button";
import { generateShareableLink } from "../utils/api";
import { useServiceContext } from "../contexts/ServiceContext";

interface ShareModalProps {
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
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
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]"
      onClick={onClose}
    >
      <div
        className="fixed top-1/2 left-1/2 bg-white p-6 rounded-lg shadow-[0px_4px_6px_rgba(0,0,0,0.1)] max-w-[500px] w-[90%] -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Share Current Status</h2>
        <input
          className="w-full p-2 my-4 mx-0 border border-solid border-gray-700 rounded"
          value={shareableLink}
          readOnly
        />
        <Button
          style="mx-2 my-0"
          onClick={copyToClipboard}
          text={copied ? "Copied!" : "Copy Link"}
        />
        <Button style="mx-2 my-0" onClick={onClose} text="Close" />
      </div>
    </div>
  );
};

export default ShareModal;
