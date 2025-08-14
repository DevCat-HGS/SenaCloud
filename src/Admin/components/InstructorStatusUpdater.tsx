import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '../../Service/API/SocketContext';
import { Socket } from 'socket.io-client';

interface InstructorStatusUpdaterProps {
  instructorId: string;
  initialStatus: 'pendiente' | 'aprobado';
  onStatusChange?: (newStatus: 'pendiente' | 'aprobado') => void;
}

const InstructorStatusUpdater: React.FC<InstructorStatusUpdaterProps> = ({
  instructorId,
  initialStatus,
  onStatusChange
}) => {
  const [status, setStatus] = useState<'pendiente' | 'aprobado'>(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const { connectToNamespace, isConnected } = useSocket();
  const instructorSocketRef = useRef<Socket | null>(null);

  // Conectar al namespace de instructores
  useEffect(() => {
    if (isConnected) {
      instructorSocketRef.current = connectToNamespace('/instructors');
      
      // Configurar eventos una vez conectado
      instructorSocketRef.current.on('connect', () => {
        console.log('Conectado al namespace de instructores para actualizar estado');
      });

      // Limpiar al desmontar
      return () => {
        if (instructorSocketRef.current) {
          instructorSocketRef.current.disconnect();
          instructorSocketRef.current = null;
        }
      };
    }
  }, [isConnected, connectToNamespace]);

  // Escuchar actualizaciones de estado de instructor
  useEffect(() => {
    if (instructorSocketRef.current) {
      const handleStatusUpdate = (data: { instructorId: string; status: 'pendiente' | 'aprobado' }) => {
        if (data.instructorId === instructorId) {
          setStatus(data.status);
          if (onStatusChange) {
            onStatusChange(data.status);
          }
        }
      };

      // Suscribirse al evento de actualización de estado
      instructorSocketRef.current.on('instructor-status-updated', handleStatusUpdate);

      // Limpiar al desmontar
      return () => {
        instructorSocketRef.current?.off('instructor-status-updated');
      };
    }
  }, [instructorId, onStatusChange, instructorSocketRef.current]);

  const updateStatus = async (newStatus: 'pendiente' | 'aprobado') => {
    if (newStatus === status) return;
    
    setIsUpdating(true);
    
    try {
      if (isConnected && instructorSocketRef.current) {
        // Crear una promesa para manejar la respuesta del socket
        let timeoutId: ReturnType<typeof setTimeout>;
        
        await new Promise<void>((resolve, reject) => {
          // Función para manejar la respuesta exitosa
          const handleSuccess = (data: any) => {
            instructorSocketRef.current?.off('status-update-success', handleSuccess);
            instructorSocketRef.current?.off('error', handleError);
            clearTimeout(timeoutId);
            resolve();
          };
          
          // Función para manejar errores
          const handleError = (error: any) => {
            instructorSocketRef.current?.off('status-update-success', handleSuccess);
            instructorSocketRef.current?.off('error', handleError);
            clearTimeout(timeoutId);
            reject(new Error(error.message || 'Error al actualizar el estado del instructor'));
          };
          
          // Registrar listeners
          instructorSocketRef.current?.on('status-update-success', handleSuccess);
          instructorSocketRef.current?.on('error', handleError);
          
          // Emitir evento para actualizar el estado
          instructorSocketRef.current?.emit('update-instructor-status', {
            instructorId,
            status: newStatus
          });
          
          // Establecer un timeout por si no hay respuesta
          timeoutId = setTimeout(() => {
            instructorSocketRef.current?.off('status-update-success', handleSuccess);
            instructorSocketRef.current?.off('error', handleError);
            reject(new Error('Timeout al actualizar el estado del instructor'));
          }, 5000); // 5 segundos de timeout
        });
      } else {
        throw new Error('No hay conexión con el servidor');
      }
      
      // Actualizar estado local
      setStatus(newStatus);
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      // Aquí se podría mostrar un mensaje de error al usuario
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Estado:</span>
      <div className="relative inline-block">
        <select
          value={status}
          onChange={(e) => updateStatus(e.target.value as 'pendiente' | 'aprobado')}
          disabled={isUpdating}
          className={`
            appearance-none
            pl-3 pr-8 py-1 rounded-md text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-green-500
            ${status === 'aprobado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
            ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {isUpdating && (
        <div className="animate-spin h-4 w-4 border-2 border-green-500 rounded-full border-t-transparent"></div>
      )}
    </div>
  );
};

export default InstructorStatusUpdater;