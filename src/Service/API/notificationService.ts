/**
 * Servicio para gestionar notificaciones
 * Este servicio utiliza el servicio HTTP para realizar peticiones a la API de notificaciones
 */

import { httpService } from './httpService';
import { NOTIFICATION_ROUTES } from './apiRoutes';

// Interfaces para los tipos de datos
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationDto {
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

// Clase para el servicio de notificaciones
export class NotificationService {
  private static instance: NotificationService;

  private constructor() {}

  /**
   * Obtiene la instancia única del servicio
   */
  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Obtiene todas las notificaciones
   * @returns Promesa con la lista de notificaciones
   */
  public async getAllNotifications(): Promise<Notification[]> {
    return httpService.get<Notification[]>(NOTIFICATION_ROUTES.GET_ALL);
  }

  /**
   * Obtiene las notificaciones de un usuario
   * @param userId ID del usuario
   * @returns Promesa con la lista de notificaciones del usuario
   */
  public async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return httpService.get<Notification[]>(NOTIFICATION_ROUTES.GET_BY_USER(userId));
  }

  /**
   * Crea una nueva notificación
   * @param notificationData Datos de la notificación a crear
   * @returns Promesa con la notificación creada
   */
  public async createNotification(notificationData: CreateNotificationDto): Promise<Notification> {
    return httpService.post<Notification>(NOTIFICATION_ROUTES.CREATE, { body: notificationData });
  }

  /**
   * Marca una notificación como leída
   * @param id ID de la notificación
   * @returns Promesa con la notificación actualizada
   */
  public async markNotificationAsRead(id: string): Promise<Notification> {
    return httpService.patch<Notification>(NOTIFICATION_ROUTES.MARK_AS_READ(id), {
      body: { read: true },
    });
  }

  /**
   * Elimina una notificación
   * @param id ID de la notificación
   * @returns Promesa con el resultado de la operación
   */
  public async deleteNotification(id: string): Promise<{ success: boolean }> {
    return httpService.delete<{ success: boolean }>(NOTIFICATION_ROUTES.DELETE(id));
  }
}

// Exportar una instancia única del servicio
export const notificationService = NotificationService.getInstance();