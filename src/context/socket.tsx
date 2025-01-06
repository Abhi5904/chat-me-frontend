"use client";
// SocketContext.tsx
import { AppConfig } from "@/config/appConfig";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

// The URL of your backend server
const SOCKET_URL = AppConfig.API_URL;

// Define the context type
interface SocketContextType {
  socket: Socket | null;
}

// Props type for the provider
interface SocketProviderProps {
  children: ReactNode; // Allows any valid React child element(s)
}

// Create a Context for the socket with the correct type
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Create a custom hook to use the socket context
export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

// Create the SocketProvider component
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Create a new socket connection when the component mounts
    const socketInstance = io(SOCKET_URL, {
      withCredentials: true, // Important for CORS
    });
    setSocket(socketInstance);

    // Clean up the socket when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
