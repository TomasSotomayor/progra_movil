import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregarvehiculo',
  templateUrl: './agregarvehiculo.page.html',
  styleUrls: ['./agregarvehiculo.page.scss'],
})
export class AgregarvehiculoPage  {

  // Variables para almacenar los datos del formulario
  marca: string = '';  
  modelo: string = '';
  color: string = '';
  patente: string = '';
  anio: number | null = null;  // Cambiado de "año" a "anio" para evitar errores con caracteres especiales
  combustible: string = '';
  capacidadPasajeros: number | null = null;  
  idUsuario: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  

  // Método para manejar el botón "Volver"
  volverButton() {
    this.router.navigateByUrl('/vehiculo');
  }

  // Método para manejar el botón "Agregar"
  async agregarVehiculo() {
    if (!this.marca || !this.modelo || !this.patente || !this.anio || !this.idUsuario) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos obligatorios.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Vehículo agregado exitosamente.',
      buttons: ['OK']
    });
    await alert.present();

    // Redirige a la página de vehículos después de agregar el vehículo
    this.router.navigateByUrl('/vehiculo');
  }
}
