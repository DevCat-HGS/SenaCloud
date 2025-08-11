/**
 * Servicio para gestionar actividades
 * Este servicio utiliza el servicio HTTP para realizar peticiones a la API de actividades
 */

import { httpService } from './httpService';
import { ACTIVITY_ROUTES } from './apiRoutes';

// Interfaces para los tipos de datos
export interface Activity {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdBy: string;
  assignedTo: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateActivityDto {
  title: string;
  description: string;
  dueDate: string;
  assignedTo: string[];
}

export interface UpdateActivityDto {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string[];
}

// Clase para el servicio de actividades
export class ActivityService {
  private static instance: ActivityService;

  private constructor() {}

  /**
   * Obtiene la instancia única del servicio
   */
  public static getInstance(): ActivityService {
    if (!ActivityService.instance) {
      ActivityService.instance = new ActivityService();
    }
    return ActivityService.instance;
  }

  /**
   * Obtiene todas las actividades
   * @returns Promesa con la lista de actividades
   */
  public async getAllActivities(): Promise<Activity[]> {
    return httpService.get<Activity[]>(ACTIVITY_ROUTES.GET_ALL);
  }

  /**
   * Obtiene una actividad por su ID
   * @param id ID de la actividad
   * @returns Promesa con la actividad
   */
  public async getActivityById(id: string): Promise<Activity> {
    return httpService.get<Activity>(ACTIVITY_ROUTES.GET_BY_ID(id));
  }

  /**
   * Crea una nueva actividad
   * @param activityData Datos de la actividad a crear
   * @returns Promesa con la actividad creada
   */
  public async createActivity(activityData: CreateActivityDto): Promise<Activity> {
    return httpService.post<Activity>(ACTIVITY_ROUTES.CREATE, { body: activityData });
  }

  /**
   * Actualiza una actividad existente
   * @param id ID de la actividad
   * @param activityData Datos de la actividad a actualizar
   * @returns Promesa con la actividad actualizada
   */
  public async updateActivity(id: string, activityData: UpdateActivityDto): Promise<Activity> {
    return httpService.put<Activity>(ACTIVITY_ROUTES.UPDATE(id), { body: activityData });
  }

  /**
   * Elimina una actividad
   * @param id ID de la actividad
   * @returns Promesa con el resultado de la operación
   */
  public async deleteActivity(id: string): Promise<{ success: boolean }> {
    return httpService.delete<{ success: boolean }>(ACTIVITY_ROUTES.DELETE(id));
  }
}

// Exportar una instancia única del servicio
export const activityService = ActivityService.getInstance();