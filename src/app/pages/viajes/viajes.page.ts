import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/viaje.service'; // Asegúrate de que la ruta sea correcta
import { Preferences } from '@capacitor/preferences';
import { DataBodyViaje } from 'src/app/pages/viajes/viajes.page';


interface DataBodyViaje { // Asegúrate de definir la interfaz aquí también
  p_costo: number; // El costo debe ser un número
  p_fecha: string;
  p_ubicacionorigen: string;
  p_ubicaciondestino: string;
  token?: string; // El token es opcional
}

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  viajes: any[] = []; // Cambia 'any' al tipo adecuado según tu modelo de datos
  token: string | null = null; // Propiedad para almacenar el token
  nuevoViaje: DataBodyViaje = { // Usa la interfaz aquí
    p_costo: 0, // Inicializa como 0 en lugar de null para evitar problemas de tipo
    p_fecha: '',
    p_ubicacionorigen: '',
    p_ubicaciondestino: ''
  };

  constructor(
    private navCtrl: NavController,
    private viajeService: ViajeService // Inyecta el servicio de viajes
  ) {}

  ngOnInit() {
    this.cargarViajes(); // Llama a la función para cargar los viajes
  }

  async cargarViajes() {
    try {
      const tokenResult = await Preferences.get({ key: 'token' });
      this.token = tokenResult.value; // Almacena el valor en la propiedad 'token'

      if (this.token) {
        this.viajes = await this.viajeService.getViajes(this.token); // Carga los datos de los viajes desde el servicio
      } else {
        console.error('Token no encontrado'); // Manejo de caso cuando no hay token
      }
    } catch (error) {
      console.error('Error al cargar los viajes:', error);
    }
  }

  async guardarViaje() {
    try {
      // Valida que todos los campos estén llenos
      if (this.nuevoViaje.p_costo !== null && this.nuevoViaje.p_fecha && this.nuevoViaje.p_ubicacionorigen && this.nuevoViaje.p_ubicaciondestino) {
        this.nuevoViaje.token = this.token; // Agrega el token al objeto nuevoViaje

        // Guarda el nuevo viaje utilizando el servicio
        await this.viajeService.agregarViaje(this.nuevoViaje); // Envía el objeto corregido
        // Reinicia el formulario
        this.nuevoViaje = { p_costo: 0, p_fecha: '', p_ubicacionorigen: '', p_ubicaciondestino: '' }; // Reinicia el objeto nuevoViaje
        // Recarga la lista de viajes
        this.cargarViajes();
      } else {
        console.error('Por favor, complete todos los campos');
      }
    } catch (error) {
      console.error('Error al guardar el viaje:', error);
    }
  }

  volver() {
    this.navCtrl.navigateBack('/listaviajes'); // Redirige a la vista principal.
  }
}
