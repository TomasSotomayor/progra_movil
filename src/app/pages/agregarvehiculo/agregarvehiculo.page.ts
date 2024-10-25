import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { HelperService } from 'src/app/services/helper.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-agregarvehiculo',
  templateUrl: './agregarvehiculo.page.html',
  styleUrls: ['./agregarvehiculo.page.scss'],
})

export class AgregarvehiculoPage  {
  patente: string = '';
  marca: string = '';
  modelo: string = '';
  anio: number = 0;
  color: string = '';
  tipo_combustible: string = '';
  capacidad_pasajeros: number = 0;
  imagen: any;

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private helper: HelperService,
    private firebase: FirebaseService
  ) { }

  ngOnInit() {
  }

  async agregarVehiculo() {
    const userFirebase = await this.firebase.registro(this.correo,this.contrasena);
    const token = await userFirebase.user?.getIdToken();

    const id_usuario = await this.helper.getUserId();
    if(token) {
      try {
        const req = await this.vehiculoService.addVehiculo({
          p_id_usuario: id_usuario,
          p_patente: this.patente,
          p_marca: this.marca,
          p_modelo: this.modelo,
          p_anio: this.anio,
          p_color: this.color,
          p_tipo_combustible: this.tipo_combustible,
          p_capacidad_pasajeros: this.capacidad_pasajeros,
          token: token,
          image: this.imagen
        });
        await this.helper.showAlert("Vehículo agregado correctamente.", "Información");
        this.router.navigateByUrl('inicio');
      } catch (error) {
        console.error("Error al agregar vehículo: ", error);
        await this.helper.showAlert("Ocurrió un error al agregar el vehículo","Error");
      }
    }
      
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    if (image.webPath) {
      const response = await fetch(image.webPath);
      const blob = await response.blob();

      this.imagen = {
        fname: 'vehiculo' + image.format,
        src: image.webPath,
        file: blob,
      };
    }
  }










  // Método para manejar el botón "Agregar"
  async agregarVehiculo() {
    const userData = await this.storage.obtenStorage();
    const idUsuario = userData[0]?.usuario_id;

    const userFirebase = await this.firebase.agregarVehiculo()
    const token = await userFirebase.user?.getIdToken()
    if(token) {
      const req = await this.vehiculoService.addVehiculo({
        p_marca: this.marca,
        p_modelo: this.modelo,
        p_color: this.color,
        p_anio: this.anio,
        p_combustible: this.combustible,
        p_capacidadPasajeros: this.capacidadPasajeros,
        token:token
      },
      this.imagen
    );
    await this.helper.showAlert("Vehículo agregado correctamente.", "Información");
    await this.router.navigateByUrl('/vehiculo');
    }}

  // Método para manejar el botón "Volver"
  volverButton() {
    this.router.navigateByUrl('/vehiculo');
  }

}
