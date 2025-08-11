/**
 * Servicio para gestionar usuarios
 * Este servicio utiliza el servicio HTTP para realizar peticiones a la API de usuarios
 */

import { httpService } from './httpService';
import { USER_ROUTES } from './apiRoutes';

// Interfaces para los tipos de datos
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isInstructor: boolean;
  instructorStatus?: 'active' | 'inactive';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: string;
  isInstructor?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  isInstructor?: boolean;
  status?: 'active' | 'inactive';
}

// Clase para el servicio de usuarios
export class UserService {
  private static instance: UserService;

  private constructor() {}

  /**
   * Obtiene la instancia única del servicio
   */
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Obtiene todos los usuarios
   * @returns Promesa con la lista de usuarios
   */
  public async getAllUsers(): Promise<User[]> {
    return httpService.get<User[]>(USER_ROUTES.GET_ALL);
  }

  /**
   * Obtiene un usuario por su ID
   * @param id ID del usuario
   * @returns Promesa con el usuario
   */
  public async getUserById(id: string): Promise<User> {
    return httpService.get<User>(USER_ROUTES.GET_BY_ID(id));
  }

  /**
   * Crea un nuevo usuario
   * @param userData Datos del usuario a crear
   * @returns Promesa con el usuario creado
   */
  public async createUser(userData: CreateUserDto): Promise<User> {
    return httpService.post<User>(USER_ROUTES.CREATE, { body: userData });
  }

  /**
   * Actualiza un usuario existente
   * @param id ID del usuario
   * @param userData Datos del usuario a actualizar
   * @returns Promesa con el usuario actualizado
   */
  public async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    return httpService.put<User>(USER_ROUTES.UPDATE(id), { body: userData });
  }

  /**
   * Elimina un usuario
   * @param id ID del usuario
   * @returns Promesa con el resultado de la operación
   */
  public async deleteUser(id: string): Promise<{ success: boolean }> {
    return httpService.delete<{ success: boolean }>(USER_ROUTES.DELETE(id));
  }

  /**
   * Actualiza el estado de un instructor
   * @param id ID del instructor
   * @param status Nuevo estado
   * @returns Promesa con el usuario actualizado
   */
  public async updateInstructorStatus(
    id: string,
    status: 'active' | 'inactive'
  ): Promise<User> {
    return httpService.patch<User>(USER_ROUTES.UPDATE_INSTRUCTOR_STATUS(id), {
      body: { instructorStatus: status },
    });
  }
}

// Exportar una instancia única del servicio
export const userService = UserService.getInstance();