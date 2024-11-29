import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  constructor(private http: HttpClient) {}
  
  async addViaje(datosViaje: dataBodyViaje) {
    try {
      const body = {
        p_id_usuario: datosViaje.p_id_usuario,
        p_ubicacion_origen: datosViaje.p_ubicacion_origen,
        p_ubicacion_destino: datosViaje.p_ubicacion_destino,
        p_costo: datosViaje.p_costo,
        p_id_vehiculo: datosViaje.p_id_vehiculo,
        token: datosViaje.token
      };
      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'viaje/agregar', body));
      return response;
    } catch(error) {
      console.error('Error al agregar viaje: ', error)
      throw error;
  }};

  async obtenViaje(p_token: string) {
    try {
      const params = {
        token: p_token
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'viaje/obtener', {params}));
      return response;
    } catch (error) {
      throw error;
  }};

}

interface dataBodyViaje {
  p_id_usuario: number;
  p_ubicacion_origen: string;
  p_ubicacion_destino: string;
  p_costo: number;
  p_id_vehiculo: number;
  token?: string;
}
