import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  contrasena?: string;
  repetirContrasena?: string;
  navCtrl: any;

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  // Función para mostrar la alerta cuando se confirmen los datos
  async mostrarAlerta() {
    // Comprobación básica de que los campos requeridos estén llenos
    if (!this.nombre || !this.correo || !this.telefono || !this.direccion || !this.contrasena || !this.repetirContrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Comprobación básica de que las contraseñas coinciden
    if (this.contrasena !== this.repetirContrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Si todo está correcto, mostrar alerta de registro completado
    const alert = await this.alertController.create({
      header: 'Registro Completado',
      message: '¡Tu registro ha sido completado con éxito!',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método para manejar el botón "Volver"
  volverButton() {
    this.router.navigateByUrl('/login');
  }
}
