/**
 * Servicio para gestionar la autenticación de usuarios
 * Este servicio utiliza el servicio HTTP para realizar peticiones a la API
 */

import { httpService } from './httpService';
import { API_URL } from './apiRoutes';

// Interfaces para los tipos de datos
export interface LoginCredentials {
  correo: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    nombre: string;
    correoInstitucional: string;
    correoPersonal: string;
    rol: string;
    etiquetas: string[];
    estadoInstructor?: string;
  };
  token: string;
}

class AuthService {
  private static instance: AuthService | null = null;
  private tokenKey = 'senacloud_token';
  private userKey = 'senacloud_user';

  private constructor() {
    // Constructor privado para implementar el patrón Singleton
    // Cargar token desde localStorage si existe
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      httpService.setToken(token);
    }
  }

  /**
   * Obtiene la instancia única del servicio de autenticación
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Inicia sesión con credenciales
   * @param credentials Credenciales de inicio de sesión
   * @returns Respuesta de autenticación
   */
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data: AuthResponse = await response.json();
      
      // Guardar token y usuario en localStorage
      localStorage.setItem(this.tokenKey, data.token);
      localStorage.setItem(this.userKey, JSON.stringify(data.user));
      
      // Configurar token en el servicio HTTP
      httpService.setToken(data.token);
      
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  public logout(): void {
    // Eliminar token y usuario de localStorage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    
    // Limpiar token en el servicio HTTP
    httpService.clearToken();
  }

  /**
   * Verifica si el usuario está autenticado
   * @returns true si el usuario está autenticado, false en caso contrario
   */
  public isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  /**
   * Obtiene el usuario autenticado
   * @returns Usuario autenticado o null si no hay usuario autenticado
   */
  public getAuthenticatedUser(): AuthResponse['user'] | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  /**
   * Obtiene el token de autenticación
   * @returns Token de autenticación o null si no hay token
   */
  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}

export const authService = AuthService.getInstance();