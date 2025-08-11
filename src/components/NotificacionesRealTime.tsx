import React, { useEffect, useState } from 'react';
import { useSocket } from '../Service/API/SocketContext';
import NotificacionesService from '../Service/Notificaciones/NotificacionesService';

interface Notificacion {
  id: string;
  tipo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
  destinatario: {
    id: string;
    nombre: string;
  };
}

interface NotificacionesRealTimeProps {
  userId: string;
}

const NotificacionesRealTime: React.FC<NotificacionesRealTimeProps> = ({ userId }) => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [nuevasNotificaciones, setNuevasNotificaciones] = useState(0);
  const { isConnected } = useSocket();

  useEffect(() => {
    // Inicializar el servicio de notificaciones cuando el socket esté conectado
    if (isConnected) {
      NotificacionesService.connect();

      // Actualizar las notificaciones cuando cambien
      const handleNotificacionesActualizadas = (notificacionesActualizadas: Notificacion[]) => {
        // Filtrar notificaciones para este usuario
        const notificacionesUsuario = notificacionesActualizadas.filter(
          (notif) => notif.destinatario.id === userId
        );
        
        // Contar nuevas notificaciones no leídas
        const noLeidas = notificacionesUsuario.filter((notif) => !notif.leida).length;
        
        setNotificaciones(notificacionesUsuario);
        setNuevasNotificaciones(noLeidas);
      };

      NotificacionesService.addListener(handleNotificacionesActualizadas);

      // Limpiar al desmontar
      return () => {
        NotificacionesService.removeListener(handleNotificacionesActualizadas);
        NotificacionesService.disconnect();
      };
    }
  }, [isConnected, userId]);

  const toggleMostrarNotificaciones = () => {
    setMostrarNotificaciones(!mostrarNotificaciones);
    
    // Si se están mostrando las notificaciones, marcar todas como leídas
    if (!mostrarNotificaciones && nuevasNotificaciones > 0) {
      notificaciones
        .filter((notif) => !notif.leida)
        .forEach((notif) => {
          NotificacionesService.marcarComoLeida(notif.id);
        });
      
      setNuevasNotificaciones(0);
    }
  };

  const marcarComoLeida = (id: string) => {
    NotificacionesService.marcarComoLeida(id);
    
    // Actualizar estado local
    setNotificaciones(notificaciones.map(notif => 
      notif.id === id ? { ...notif, leida: true } : notif
    ));
    
    // Actualizar contador
    setNuevasNotificaciones(prev => Math.max(0, prev - 1));
  };

  const getTipoIcono = (tipo: string) => {
    switch (tipo) {
      case 'info':
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'exito':
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'advertencia':
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
    }
  };

  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative">
      {/* Botón de notificaciones */}
      <button
        onClick={toggleMostrarNotificaciones}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {/* Indicador de nuevas notificaciones */}
        {nuevasNotificaciones > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {nuevasNotificaciones}
          </span>
        )}
      </button>

      {/* Panel de notificaciones */}
      {mostrarNotificaciones && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700">Notificaciones</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notificaciones.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No tienes notificaciones
              </div>
            ) : (
              <div>
                {notificaciones.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notif.leida ? 'bg-blue-50' : ''}`}
                    onClick={() => marcarComoLeida(notif.id)}
                  >
                    <div className="flex items-start">
                      {getTipoIcono(notif.tipo)}
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{notif.mensaje}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatearFecha(notif.fecha)}</p>
                      </div>
                      {!notif.leida && (
                        <span className="ml-2 flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-2 border-t border-gray-200 bg-gray-50 text-center">
            <button 
              className="text-xs text-green-600 hover:text-green-800 font-medium"
              onClick={() => setMostrarNotificaciones(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificacionesRealTime;