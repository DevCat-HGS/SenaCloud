/**
 * Servicio para gestionar eventos
 * Este servicio utiliza el servicio HTTP para realizar peticiones a la API de eventos
 */

import { httpService } from './httpService';
import { EVENT_ROUTES } from './apiRoutes';

// Interfaces para los tipos de datos
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventDto {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  participants?: string[];
}

export interface UpdateEventDto {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  participants?: string[];
}

// Clase para el servicio de eventos
export class EventService {
  private static instance: EventService;

  private constructor() {}

  /**
   * Obtiene la instancia única del servicio
   */
  public static getInstance(): EventService {
    if (!EventService.instance) {
      EventService.instance = new EventService();
    }
    return EventService.instance;
  }

  /**
   * Obtiene todos los eventos
   * @returns Promesa con la lista de eventos
   */
  public async getAllEvents(): Promise<Event[]> {
    return httpService.get<Event[]>(EVENT_ROUTES.GET_ALL);
  }

  /**
   * Obtiene un evento por su ID
   * @param id ID del evento
   * @returns Promesa con el evento
   */
  public async getEventById(id: string): Promise<Event> {
    return httpService.get<Event>(EVENT_ROUTES.GET_BY_ID(id));
  }

  /**
   * Crea un nuevo evento
   * @param eventData Datos del evento a crear
   * @returns Promesa con el evento creado
   */
  public async createEvent(eventData: CreateEventDto): Promise<Event> {
    return httpService.post<Event>(EVENT_ROUTES.CREATE, { body: eventData });
  }

  /**
   * Actualiza un evento existente
   * @param id ID del evento
   * @param eventData Datos del evento a actualizar
   * @returns Promesa con el evento actualizado
   */
  public async updateEvent(id: string, eventData: UpdateEventDto): Promise<Event> {
    return httpService.put<Event>(EVENT_ROUTES.UPDATE(id), { body: eventData });
  }

  /**
   * Elimina un evento
   * @param id ID del evento
   * @returns Promesa con el resultado de la operación
   */
  public async deleteEvent(id: string): Promise<{ success: boolean }> {
    return httpService.delete<{ success: boolean }>(EVENT_ROUTES.DELETE(id));
  }

  /**
   * Actualiza la participación de un usuario en un evento
   * @param eventId ID del evento
   * @param userId ID del usuario
   * @param participating Indica si el usuario participa o no
   * @returns Promesa con el evento actualizado
   */
  public async updateParticipant(
    eventId: string,
    userId: string,
    participating: boolean
  ): Promise<Event> {
    return httpService.patch<Event>(EVENT_ROUTES.UPDATE_PARTICIPANT(eventId, userId), {
      body: { participating },
    });
  }
}

// Exportar una instancia única del servicio
export const eventService = EventService.getInstance();