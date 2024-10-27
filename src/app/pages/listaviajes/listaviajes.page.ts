import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/viaje.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-listaviajes',
  templateUrl: './listaviajes.page.html',
  styleUrls: ['./listaviajes.page.scss'],
})
export class ListaviajesPage implements OnInit {
  viajes: any[] = []; // Array para almacenar los viajes

  constructor(private navCtrl: NavController, private viajeService: ViajeService, private firebase: FirebaseService) {}

  async ngOnInit() {
    try {
      const token = await this.firebase.obtenerToken(); // Obtener el token
      if (token) {
        this.viajes = await this.viajeService.obtenViaje(token); // Obtener viajes del servicio
      } else {
        console.error('No se pudo obtener el token de usuario.');
      }
    } catch (error) {
      console.error('Error al cargar los viajes:', error);
    }
  }

  volver() {
    this.navCtrl.back();
  }

  navigateToPageViajes() {
    this.navCtrl.navigateForward('/viajes');
  }
}
