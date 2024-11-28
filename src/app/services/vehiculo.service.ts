import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private vehiculoSubject = new BehaviorSubject<any[]>([]); // Stream para emitir cambios en vehículos como array
  vehiculo$ = this.vehiculoSubject.asObservable(); // Observable para suscripción

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  /**
   * Agregar un vehículo al backend (Firebase o API)
   */
  async addVehiculo(datosVehiculo: dataBodyVehiculo, imgFileUser: any) {
    try {
      // Crear el FormData para enviar al backend
      const formData = new FormData();
      formData.append('p_id_usuario', datosVehiculo.p_id_usuario?.toString());
      formData.append('p_patente', datosVehiculo.p_patente);
      formData.append('p_marca', datosVehiculo.p_marca);
      formData.append('p_modelo', datosVehiculo.p_modelo);
      formData.append('p_anio', datosVehiculo.p_anio?.toString());
      formData.append('p_color', datosVehiculo.p_color);
      formData.append('p_tipo_combustible', datosVehiculo.p_tipo_combustible);
      if (datosVehiculo.token) {
        formData.append('token', datosVehiculo.token);
      }
      formData.append('image', imgFileUser.file, imgFileUser.fname);

      // Realizar la llamada HTTP para agregar el vehículo
      const response = await lastValueFrom(
        this.http.post<any>(environment.apiUrl + 'vehiculo/agregar', formData)
      );

      // Crear el objeto de vehículo que se debe emitir
      const nuevoVehiculo = {
        id: response.id,
        patente: datosVehiculo.p_patente,
        marca: datosVehiculo.p_marca,
        modelo: datosVehiculo.p_modelo,
        anio: datosVehiculo.p_anio,
        color: datosVehiculo.p_color,
        tipo_combustible: datosVehiculo.p_tipo_combustible,
        imagen_vehiculo: response.imagen_vehiculo, // Suponiendo que la API devuelve la URL de la imagen
      };

      // Emitir el nuevo vehículo al stream
      this.addVehiculoToStream(nuevoVehiculo);
      return response;
    } catch (error) {
      console.error('Error al agregar vehículo: ', error);
      throw error;
    }
  }

  /**
   * Obtener vehículos desde la API
   */
  async obtenVehiculo(data: dataGetVehiculo) {
    try {
      const params = {
        p_id: data.p_id,
        token: data.token,
      };

      // Realizar la llamada para obtener los vehículos
      const response = await lastValueFrom(
        this.http.get<any>(environment.apiUrl + 'vehiculo/obtener', { params })
      );

      // Emitir el array de vehículos obtenido al stream
      const vehiculos = Array.isArray(response) ? response : Object.values(response);

      // Limpiar el stream antes de emitir los nuevos vehículos
      this.vehiculoSubject.next(vehiculos);  // Reemplaza el stream anterior

      return vehiculos;
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      throw error;
    }
  }

  // Alias para mantener compatibilidad con el código actual
  async obtenerVehiculos(data: dataGetVehiculo) {
    return this.obtenVehiculo(data);
  }

  /**
   * Stream para escuchar cambios en los vehículos
   */
  getVehiculoStream() {
    return this.vehiculoSubject.asObservable(); // Escuchar cambios en el stream de vehículos
  }

  /**
   * Emitir un nuevo vehículo al stream para que se actualice la lista
   */
  addVehiculoToStream(vehiculo: any) {
    const vehiculosActuales = this.vehiculoSubject.getValue();

    // Verifica si el vehículo ya existe (por patente o ID, dependiendo del backend)
    if (!vehiculosActuales.find(v => v.patente === vehiculo.patente)) {
      this.vehiculoSubject.next([...vehiculosActuales, vehiculo]); // Solo emite si no está duplicado
    }
  }

  /**
   * Obtener vehículos desde Firestore
   */
  obtenerVehiculosDesdeFirestore(): Observable<any[]> {
    return this.firestore.collection('vehiculos').valueChanges();
  }
}

// Interfaces para los datos del vehículo
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
