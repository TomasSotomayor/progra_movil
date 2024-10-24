import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private http:HttpClient) { }

  async obtenViaje(parToken:string) {
    try {
      const params = {
        token:parToken
      };
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'viaje/obtener', {params}));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async registroViaje(datosViaje:dataBodyViaje) {
    try {
      const formData = new FormData();
      formData.append('p_costo', datosViaje.p_costo);
      formData.append('p_fecha', datosViaje.p_fecha);
      formData.append('p_ubicacionorigen', datosViaje.p_ubicacionorigen);
      formData.append('p_ubicaciondestino', datosViaje.p_ubicaciondestino);
      if(datosViaje.token) {
        formData.append('token', datosViaje.token);
      }
      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'user/agregar', formData));
      return response;
    } catch(error) {
      throw error;
    }
  }
  
}

interface dataBodyViaje {
  p_costo: number;
  p_fecha: string;
  p_ubicacionorigen: string;
  p_ubicaciondestino: string;
  token?:string;
}
