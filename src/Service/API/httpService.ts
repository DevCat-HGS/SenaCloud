/**
 * Servicio HTTP para realizar peticiones a la API
 * Este servicio centraliza todas las peticiones HTTP a la API
 */

import { API_URL } from './apiRoutes';

// Tipo para las opciones de la petición
type RequestOptions = {
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
};

// Clase Singleton para el servicio HTTP
export class HttpService {
  private static instance: HttpService;
  private token: string | null = null;

  private constructor() {}

  /**
   * Obtiene la instancia única del servicio
   */
  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  /**
   * Establece el token de autenticación
   * @param token Token JWT
   */
  public setToken(token: string): void {
    this.token = token;
  }

  /**
   * Elimina el token de autenticación
   */
  public clearToken(): void {
    this.token = null;
  }

  /**
   * Construye la URL completa con los parámetros de consulta
   * @param endpoint Endpoint de la API
   * @param params Parámetros de consulta
   * @returns URL completa
   */
  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${API_URL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    return url.toString();
  }

  /**
   * Construye las cabeceras de la petición
   * @param customHeaders Cabeceras personalizadas
   * @returns Cabeceras de la petición
   */
  private buildHeaders(customHeaders?: Record<string, string>): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...customHeaders,
    });

    if (this.token) {
      headers.append('Authorization', `Bearer ${this.token}`);
    }

    return headers;
  }

  /**
   * Realiza una petición GET
   * @param endpoint Endpoint de la API
   * @param options Opciones de la petición
   * @returns Promesa con la respuesta
   */
  public async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint, options?.params);
    const headers = this.buildHeaders(options?.headers);

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as T;
  }

  /**
   * Realiza una petición POST
   * @param endpoint Endpoint de la API
   * @param options Opciones de la petición
   * @returns Promesa con la respuesta
   */
  public async post<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint, options?.params);
    const headers = this.buildHeaders(options?.headers);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as T;
  }

  /**
   * Realiza una petición PUT
   * @param endpoint Endpoint de la API
   * @param options Opciones de la petición
   * @returns Promesa con la respuesta
   */
  public async put<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint, options?.params);
    const headers = this.buildHeaders(options?.headers);

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as T;
  }

  /**
   * Realiza una petición PATCH
   * @param endpoint Endpoint de la API
   * @param options Opciones de la petición
   * @returns Promesa con la respuesta
   */
  public async patch<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint, options?.params);
    const headers = this.buildHeaders(options?.headers);

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as T;
  }

  /**
   * Realiza una petición DELETE
   * @param endpoint Endpoint de la API
   * @param options Opciones de la petición
   * @returns Promesa con la respuesta
   */
  public async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint, options?.params);
    const headers = this.buildHeaders(options?.headers);

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as T;
  }
}

// Exportar una instancia única del servicio
export const httpService = HttpService.getInstance();