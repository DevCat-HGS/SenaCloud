/**
 * Servicio para gestionar guías
 * Este servicio utiliza el servicio HTTP para realizar peticiones a la API de guías
 */

import { httpService } from './httpService';
import { GUIDE_ROUTES } from './apiRoutes';

// Interfaces para los tipos de datos
export interface Guide {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CreateGuideDto {
  title: string;
  content: string;
  status?: 'draft' | 'published' | 'archived';
}

export interface UpdateGuideDto {
  title?: string;
  content?: string;
}

// Clase para el servicio de guías
export class GuideService {
  private static instance: GuideService;

  private constructor() {}

  /**
   * Obtiene la instancia única del servicio
   */
  public static getInstance(): GuideService {
    if (!GuideService.instance) {
      GuideService.instance = new GuideService();
    }
    return GuideService.instance;
  }

  /**
   * Obtiene todas las guías
   * @returns Promesa con la lista de guías
   */
  public async getAllGuides(): Promise<Guide[]> {
    return httpService.get<Guide[]>(GUIDE_ROUTES.GET_ALL);
  }

  /**
   * Obtiene una guía por su ID
   * @param id ID de la guía
   * @returns Promesa con la guía
   */
  public async getGuideById(id: string): Promise<Guide> {
    return httpService.get<Guide>(GUIDE_ROUTES.GET_BY_ID(id));
  }

  /**
   * Crea una nueva guía
   * @param guideData Datos de la guía a crear
   * @returns Promesa con la guía creada
   */
  public async createGuide(guideData: CreateGuideDto): Promise<Guide> {
    return httpService.post<Guide>(GUIDE_ROUTES.CREATE, { body: guideData });
  }

  /**
   * Actualiza una guía existente
   * @param id ID de la guía
   * @param guideData Datos de la guía a actualizar
   * @returns Promesa con la guía actualizada
   */
  public async updateGuide(id: string, guideData: UpdateGuideDto): Promise<Guide> {
    return httpService.put<Guide>(GUIDE_ROUTES.UPDATE(id), { body: guideData });
  }

  /**
   * Actualiza el estado de una guía
   * @param id ID de la guía
   * @param status Nuevo estado
   * @returns Promesa con la guía actualizada
   */
  public async updateGuideStatus(
    id: string,
    status: 'draft' | 'published' | 'archived'
  ): Promise<Guide> {
    return httpService.patch<Guide>(GUIDE_ROUTES.UPDATE_STATUS(id), {
      body: { status },
    });
  }

  /**
   * Elimina una guía
   * @param id ID de la guía
   * @returns Promesa con el resultado de la operación
   */
  public async deleteGuide(id: string): Promise<{ success: boolean }> {
    return httpService.delete<{ success: boolean }>(GUIDE_ROUTES.DELETE(id));
  }
}

// Exportar una instancia única del servicio
export const guideService = GuideService.getInstance();