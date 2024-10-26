import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rcontrasena',
  templateUrl: './rcontrasena.page.html',
  styleUrls: ['./rcontrasena.page.scss'],
})
export class RcontrasenaPage {
  correo: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }


  async enviarCorreo() {
    if (!this.correo) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese su e-mail.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    const alert = await this.alertController.create({
      header: 'Mensaje enviado con éxito',
      message: 'Revise su correo para restablecer su contraseña.',
      buttons: ['OK']
    });
    await alert.present();
  }


  volverButton() {
    this.router.navigateByUrl('/login');
  }

}
