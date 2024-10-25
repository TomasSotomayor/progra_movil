import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FirebaseService } from 'src/app/services/firebase.service'; // Servicio de Firebase
import { HelperService } from 'src/app/services/helper.service'; // Servicio auxiliar para mostrar alertas
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  idUsuario: string = "";  // ID del usuario, asegúrate de obtenerlo correctamente.
  marca: string = "Marca";
  modelo: string = "Modelo";
  color: string = "Color";
  patente: string = "Patente";
  anio: string = "Año";
  combustible: string = "Combustible";
  imagen: any;

  constructor(
    private firebase: FirebaseService,
    private alertController: AlertController,
    private router: Router,
    private helper: HelperService
  ) {}

  ngOnInit() {

  }

  async registrarVehiculo() {
    const token = await this.firebase.obtenerToken(); // Asume que tienes un método para obtener el token
    if (token) {
      const req = await this.firebase.addVehiculo({
        idUsuario: this.idUsuario,
        marca: this.marca,
        modelo: this.modelo,
        color: this.color,
        patente: this.patente,
        anio: this.anio,
        combustible: this.combustible,
        token: token
      }, this.imagen);

      await this.helper.showAlert("Vehículo agregado correctamente.", "Información");
      await this.router.navigateByUrl('listavehiculos');  // Redirigir a la lista de vehículos
    } else {
      this.helper.showAlert("Error al registrar el vehículo", "Error");
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    if (image.webPath) {
      const response = await fetch(image.webPath);
      const blob = await response.blob();
      this.imagen = {
        fname: 'foto' + image.format,
        src: image.webPath,
        file: blob
      };
    }
  }

  async mostrarAlerta() {
    if (!this.marca || !this.modelo || !this.color || !this.patente || !this.anio || !this.combustible) {
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
      message: '¡Tu vehículo ha sido registrado con éxito!',
      buttons: ['OK']
    });

    await alert.present();
  }
}
