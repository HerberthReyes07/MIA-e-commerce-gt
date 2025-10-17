import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
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
    let headers: Record<string, string> = {};

    if (this.getAuthToken() !== null) {
      headers = { "Authorization": "Bearer " + this.getAuthToken() };
    }

    return axios({
      method,
      url,
      data,
      headers,
      ...config,
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
