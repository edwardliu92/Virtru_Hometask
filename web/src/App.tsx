import { useEffect, FC } from "react";
import { ServiceProvider } from "./contexts/ServiceContext";
import Dashboard from "./components/Dashboard";
import { SharedServiceState } from "./types";

const App: FC = () => {
  useEffect(() => {
    // Handle shared state from URL
    const params = new URLSearchParams(window.location.search);
    const sharedState = params.get("share");

    if (sharedState) {
      try {
        const decodedState: SharedServiceState = JSON.parse(atob(sharedState));
        // You can now use this state to show comparisons
        console.log("Shared state:", decodedState);
      } catch (error) {
        console.error("Invalid shared state:", error);
      }
    }
  }, []);

  return (
    <ServiceProvider>
      <Dashboard />
    </ServiceProvider>
  );
};

export default App;
