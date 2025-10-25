import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  constructor() {
    axios.defaults.baseURL = environment.apiBaseUrl;
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  request<T = any>(method: string, url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // Fusionar cabeceras: respetar las que vienen en config y añadir Authorization si existe
    const mergedHeaders: Record<string, any> = {
      ...(config?.headers as any),
    };

    const token = this.getAuthToken();
    if (token) {
      mergedHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Si el cuerpo es FormData, dejar que Axios establezca el Content-Type con boundary
    if (typeof FormData !== 'undefined' && data instanceof FormData) {
      delete mergedHeaders['Content-Type'];
    } else {
      // Para JSON u otros, si no se especificó, usar application/json
      if (!mergedHeaders['Content-Type']) {
        mergedHeaders['Content-Type'] = 'application/json';
      }
    }

    return axios({
      method,
      url,
      data,
      ...config,
      headers: mergedHeaders,
    });
  }

  // Extrae un mensaje legible desde un error de Axios/HTTP
  getErrorMessage(error: unknown): string {
    const axErr = error as AxiosError<any>;
    return (
      axErr?.response?.data?.message ||
      'Se produjo un error inesperado'
    );
  }

  // Obtiene el status HTTP si existe
  getErrorStatus(error: unknown): number | undefined {
    const axErr = error as AxiosError<any>;
    return axErr?.response?.status;
  }
}
