import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage {
  costo?: string;
  fecha?: string;
  ubicacionorigen?: string;
  ubicaciondestino?: string;
  nropatente?: string;
  navCtrl: any;
  

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  volverButton() {
    this.router.navigateByUrl('/listaviajes');
  }

  async mostrarAlerta() {
    // Comprobación básica de que los campos requeridos estén llenos
    if (!this.costo || !this.fecha || !this.ubicacionorigen || !this.ubicaciondestino || !this.nropatente) {
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
}