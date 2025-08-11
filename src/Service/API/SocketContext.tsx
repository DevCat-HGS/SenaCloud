import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import socketService from './socketService';
import { Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  emit: (event: string, data?: any) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string) => void;
  connectToNamespace: (namespace: string) => Socket;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket debe ser usado dentro de un SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
  autoConnect?: boolean;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ 
  children, 
  autoConnect = true 
}) => {
  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    socketService.connect();
    setIsConnected(socketService.isConnected());
  };

  const disconnect = () => {
    socketService.disconnect();
    setIsConnected(false);
  };

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socketService.on('connect', handleConnect);
    socketService.on('disconnect', handleDisconnect);

    return () => {
      socketService.off('connect');
      socketService.off('disconnect');
      disconnect();
    };
  }, [autoConnect]);

  const value = {
    socket: socketService.isConnected() ? (socketService as any).socket : null,
    isConnected,
    connect,
    disconnect,
    emit: socketService.emit.bind(socketService),
    on: socketService.on.bind(socketService),
    off: socketService.off.bind(socketService),
    connectToNamespace: socketService.connectToNamespace.bind(socketService),
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};