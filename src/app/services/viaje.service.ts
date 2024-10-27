import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  constructor(private http: HttpClient) {}

  // Método para obtener todos los viajes
  async getViajes(parToken: string): Promise<any[]> {
    try {
      const params = { token: parToken }; // Se debe pasar el token como parámetro
      const response = await lastValueFrom(this.http.get<any[]>(`${environment.apiUrl}viaje/obtener`, { params }));
      return response;
    } catch (error) {
      console.error('Error al obtener los viajes:', error);
      throw error; // Propaga el error para manejo posterior
    }
  }

  // Método para obtener un viaje específico
  async obtenViaje(parToken: string): Promise<any> {
    try {
      const params = { token: parToken };
      const response = await lastValueFrom(this.http.get<any>(`${environment.apiUrl}viaje/obtener`, { params }));
      return response;
    } catch (error) {
      console.error('Error al obtener el viaje:', error);
      throw error;
    }
  }

  // Método para agregar un viaje
  async agregarViaje(datosViaje: DataBodyViaje): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('p_costo', datosViaje.p_costo.toString());
      formData.append('p_fecha', datosViaje.p_fecha);
      formData.append('p_ubicacionorigen', datosViaje.p_ubicacionorigen);
      formData.append('p_ubicaciondestino', datosViaje.p_ubicaciondestino);
      if (datosViaje.token) {
        formData.append('token', datosViaje.token);
      }
      const response = await lastValueFrom(this.http.post<any>(`${environment.apiUrl}viaje/agregar`, formData));
      return response;
    } catch (error) {
      console.error('Error al agregar el viaje:', error);
      throw error;
    }
  }
}

interface DataBodyViaje {
  p_costo: number;
  p_fecha: string;
  p_ubicacionorigen: string;
  p_ubicaciondestino: string;
  token?: string;
}
