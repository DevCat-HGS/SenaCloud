import socketService from '../API/socketService';
import { Socket } from 'socket.io-client';

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
  // Otros campos según sea necesario
}

class NotificacionesService {
  private socket: Socket | null = null;
  private static instance: NotificacionesService | null = null;
  private notificaciones: Notificacion[] = [];
  private listeners: Array<(notificaciones: Notificacion[]) => void> = [];

  private constructor() {
    // Constructor privado para implementar el patrón Singleton
  }

  /**
   * Obtiene la instancia única del servicio de notificaciones
   */
  public static getInstance(): NotificacionesService {
    if (!NotificacionesService.instance) {
      NotificacionesService.instance = new NotificacionesService();
    }
    return NotificacionesService.instance;
  }

  /**
   * Inicializa la conexión con el namespace de notificaciones
   */
  public connect(): void {
    if (!this.socket) {
      // Conectar al namespace específico de notificaciones
      this.socket = socketService.connectToNamespace('/notifications');

      this.socket.on('connect', () => {
        console.log('Conectado al servicio de notificaciones');
      });

      // Escuchar actualizaciones de notificaciones
      this.socket.on('notifications-updated', (notificaciones: Notificacion[]) => {
        this.notificaciones = notificaciones;
        this.notifyListeners();
      });

      this.socket.on('disconnect', () => {
        console.log('Desconectado del servicio de notificaciones');
      });
    }
  }

  /**
   * Desconecta del servicio de notificaciones
   */
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Obtiene todas las notificaciones
   */
  public getNotificaciones(): Notificacion[] {
    return this.notificaciones;
  }

  /**
   * Marca una notificación como leída
   * @param notificacionId ID de la notificación
   */
  public marcarComoLeida(notificacionId: string): void {
    if (this.socket) {
      this.socket.emit('notification-read', notificacionId);
    } else {
      console.error('Socket no inicializado. Llama a connect() primero.');
    }
  }

  /**
   * Crea una nueva notificación
   * @param notificacion Datos de la notificación
   */
  public crearNotificacion(notificacion: Omit<Notificacion, 'id' | 'fecha' | 'leida'>): void {
    if (this.socket) {
      this.socket.emit('notification-created', notificacion);
    } else {
      console.error('Socket no inicializado. Llama a connect() primero.');
    }
  }

  /**
   * Añade un listener para cambios en las notificaciones
   * @param listener Función a ejecutar cuando cambien las notificaciones
   */
  public addListener(listener: (notificaciones: Notificacion[]) => void): void {
    this.listeners.push(listener);
  }

  /**
   * Elimina un listener
   * @param listener Función a eliminar
   */
  public removeListener(listener: (notificaciones: Notificacion[]) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  /**
   * Notifica a todos los listeners sobre cambios en las notificaciones
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.notificaciones));
  }
}

export default NotificacionesService.getInstance();