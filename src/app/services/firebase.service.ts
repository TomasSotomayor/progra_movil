import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private fire: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async login(email: string, contrasena: string) {
    try {
      return await this.fire.signInWithEmailAndPassword(email, contrasena);
    } catch (error: any) {
      throw error;
    }
  }

  async registro(email: string, contrasena: string) {
    try {
      return await this.fire.createUserWithEmailAndPassword(email, contrasena);
    } catch (error) {
      throw error;
    }
  }

  async resetPassWord(email: string) {
    try {
      await this.fire.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async cerrarSesion() {
    await this.fire.signOut();
  }

  // Método para obtener el token del usuario autenticado
  async obtenerToken(): Promise<string | null> {
    const user = await this.fire.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null; // Retorna null si no hay usuario autenticado
  }

  // Método para agregar un vehículo
  async addVehiculo(vehiculo: any, imagen: string) {
    const vehiculoRef = this.firestore.collection('vehiculos');
    vehiculo.imagen = imagen;
    return await vehiculoRef.add(vehiculo);
  }

  // Método para agregar un viaje
  async addViaje(viaje: any) {
    const viajeRef = this.firestore.collection('viajes'); // Cambia 'viajes' si el nombre de tu colección es diferente
    return await viajeRef.add(viaje); // Agrega el viaje a Firestore
  }
}
