import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  constructor(private http: HttpClient) { }
  
  async addVehiculo(datosVehiculo:dataBodyVehiculo, imgFileUser:any) {
    try {
      const formData = new FormData();
      formData.append('p_id_usuario', datosVehiculo.p_id_usuario?.toString());
      formData.append('p_patente', datosVehiculo.p_patente);
      formData.append('p_marca', datosVehiculo.p_marca);
      formData.append('p_modelo', datosVehiculo.p_modelo);
      formData.append('p_anio', datosVehiculo.p_anio?.toString());
      formData.append('p_color', datosVehiculo.p_color);
      formData.append('p_tipo_combustible', datosVehiculo.p_tipo_combustible);
      if(datosVehiculo.token) {
        formData.append('token', datosVehiculo.token);
      }
      formData.append('image', imgFileUser.file, imgFileUser.name);
      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'vehiculo/agregar', formData));
      return response;
    } catch(error) {
      console.error('Error al agregar vehículo: ', error)
      throw error;
    }
  }

  async obtenVehiculo(data:dataGetVehiculo) {
    try {
      const params = {
        p_id: data.p_id,
        token: data.token
      }
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'vehiculo/obtener', {params}));
      return response;
    } catch (error) {
      throw error;
    }
  }
}

interface dataBodyVehiculo {
  p_id_usuario: number;
  p_patente: string;
  p_marca: string;
  p_modelo: string;
  p_anio: number;
  p_color: string;
  p_tipo_combustible: string;
  token?: string;
}

interface dataGetVehiculo {
  p_id: number;
  token: string;
}
