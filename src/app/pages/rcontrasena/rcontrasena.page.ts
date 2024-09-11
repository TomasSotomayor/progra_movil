import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rcontrasena',
  templateUrl: './rcontrasena.page.html',
  styleUrls: ['./rcontrasena.page.scss'],
})
export class RcontrasenaPage {
  correo: string = ''; // Variable para almacenar el correo ingresado

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  async enviarCorreo() {
    if (!this.correo) {
      // Mostrar alerta de error si el campo de correo está vacío
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingrese su e-mail.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Mostrar alerta de éxito si el correo está ingresado
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
