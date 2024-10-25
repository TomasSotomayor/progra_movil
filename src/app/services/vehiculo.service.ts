import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private hhtp: HttpClient) { }

  async addVehiculo(vehiculoData: any) {
    try {
      const formData = new FormData();
      Object.keys(vehiculoData).forEach(key => {
        formData.append(key, vehiculoData[key]);
      });
      const response = await lastValueFrom(this.http.post<any>(environment.apiUrl + 'vehiculo/agregar', formData));
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getVehiculo(id?: number) {
    const params: any = { token: await this.getToken() };
    if (id) {
      params.p_id = id;
    }
    try {
      const response = await lastValueFrom(this.http.get<any>(environment.apiUrl + 'vehiculo/obtener', { params }));
      return response;
    } catch (error) {
      throw error;
    }
  }

}
