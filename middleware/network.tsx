import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FC,
  useContext,
} from "react";
import NetInfo from "@react-native-community/netinfo";

// Define the type for the context value
interface NetworkContextType {
  isConnected: boolean;
}

// Create the context with a default value
export const NetworkContext = createContext<NetworkContextType>({
  isConnected: true, // Default value
});

// Define the type for the props of NetworkProvider
interface NetworkProviderProps {
  children: ReactNode;
}

// NetworkProvider component
export const NetworkProvider: FC<NetworkProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};

// Custom hook to access the network context
export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext); // Corrected type here
  if (!context) {
    throw new Error("useNetwork must be within a NetworkProvider");
  }
  return context;
};
