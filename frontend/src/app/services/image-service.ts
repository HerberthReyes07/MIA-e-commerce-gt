import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  /**
   * Construye la URL completa para una imagen del backend.
   * 
   * - Si el backend usa Ngrok, devuelve una ruta a la función proxy de Netlify
   *   para evitar problemas de CORS con el header "ngrok-skip-browser-warning".
   * - Si no es Ngrok, devuelve la URL absoluta directa al backend.
   * 
   * @param imagePath Ruta relativa de la imagen (ej: "/uploads/product123.jpg")
   * @returns URL completa lista para usar en src de <img>
   */
  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return '';

    // Detectar si el backend está detrás de Ngrok
    const isNgrok = /ngrok/i.test(environment.apiBaseUrl);
    
    if (isNgrok) {
      // Usar proxy de Netlify Functions para evitar CORS con Ngrok
      const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
      const qs = new URLSearchParams({ path });
      return `/.netlify/functions/img-proxy?${qs.toString()}`;
    }

    // Caso normal: construir URL absoluta
    const base = environment.apiBaseUrl.endsWith('/')
      ? environment.apiBaseUrl.slice(0, -1)
      : environment.apiBaseUrl;
    return `${base}${imagePath}`;
  }
}
