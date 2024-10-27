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
      const formData = new FormData();
      formData.append('p_id_usuario', datosViaje.p_id_usuario?.toString());
      formData.append('p_id_vehiculo', datosViaje.p_id_vehiculo?.toString());
      formData.append('p_id_estado', datosViaje.p_id_estado?.toString());
      formData.append('p_costo', datosViaje.p_costo?.toString());
      formData.append('p_fecha', datosViaje.p_fecha);
      formData.append('p_ubicacion_origen', datosViaje.p_ubicacion_origen);
      formData.append('p_ubicacion_destino', datosViaje.p_ubicacion_destino);
      if(datosViaje.token) {
        formData.append('token', datosViaje.token);
      };
      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'viaje/agregar', formData));
      return response;
    } catch(error) {
      console.error('Error al agregar vehículo: ', error)
      throw error;
  }}

  async obtenViaje(data:dataGetViaje) {
    try {
      const params = {
        p_id: data.p_id,
        p_id_usuario: data.p_id_usuario,
        token: data.token
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'viaje/obtener', {params}));
      return response;
    } catch (error) {
      throw error;
  }}

}

interface dataBodyViaje {
  p_id_usuario: number;
  p_id_vehiculo: number;
  p_id_estado: number;
  p_costo: number;
  p_ubicacion_origen: string;
  p_ubicacion_destino: string;
  p_fecha: string;
  token?: string;
}

interface dataGetViaje {
  p_id: number;
  p_id_usuario: number;
  token: string;
}
