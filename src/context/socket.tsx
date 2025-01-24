"use client";
// SocketContext.tsx
import { AppConfig } from "@/config/appConfig";
import {
  ISocketStatus,
  SocketContextType,
  SocketProviderProps,
} from "@/types/common";
import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

// The URL of your backend server
const SOCKET_URL = AppConfig.SOCKET_URL;

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<ISocketStatus>("disconnected");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log(SOCKET_URL, "SOCKET_URL");
  useEffect(() => {
    // Create socket instance with error handling
    const socketInstance = io(SOCKET_URL, {
      secure: true, // Force secure connection
      rejectUnauthorized: false,
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection event handlers
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setConnectionStatus("connected");
      setErrorMessage(null);
    });

    socketInstance.on("connect_error", (error) => {
      console.log("Socket connection error:", error);
      console.log("Full Socket Connection Error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      setConnectionStatus("error");
      setErrorMessage(error.message);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setConnectionStatus("disconnected");
    });

    setSocket(socketInstance);

    // Clean up the socket when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectionStatus, errorMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
