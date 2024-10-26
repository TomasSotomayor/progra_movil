import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage {
  costo: number = 0;
  fecha: string = "";
  ubicacionorigen: string = "";
  ubicaciondestino: string = "";

  constructor(
    private firebase: FirebaseService,
    private viajeService: ViajeService,
    private alertController: AlertController,
    private router: Router,
    private helper: HelperService
  ) {}

  ngOnInit() {}

  async addViaje() {
    try {
      const token = await this.firebase.obtenerToken();
      if (!token) {
        throw new Error('No se pudo obtener el token de usuario.');
      }
      const viajeData = {
        costo: this.costo,
        fecha: this.fecha,
        ubicacionorigen: this.ubicacionorigen,
        ubicaciondestino: this.ubicaciondestino,
        token: token,
      };
      await this.helper.showAlert("Viaje agregado correctamente.", "Información");
      await this.router.navigateByUrl('listaviajes');
    } catch (error) {
      console.error("Error al agregar viaje:", error);
      await this.helper.showAlert("Hubo un error al agregar el viaje.", "Error");
    }
  }

  async mostrarAlerta() {
    if (!this.costo || !this.fecha || !this.ubicacionorigen || !this.ubicaciondestino) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    const alert = await this.alertController.create({
      header: 'Registro Completado',
      message: '¡Tu registro ha sido completado con éxito!',
      buttons: ['OK']
    });
    await alert.present();
  }

  volverButton() {
    this.router.navigateByUrl('/listaviajes');
  }
}
