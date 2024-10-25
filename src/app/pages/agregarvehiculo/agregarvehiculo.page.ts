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
    const id_usuario = await this.firebase.obtenerToken();
    const token = await this.firebase.obtenerToken();

    if(token) {
      try {
        const req = await this.vehiculoService.addVehiculo({
          p_patente: this.patente,
          p_marca: this.marca,
          p_modelo: this.modelo,
          p_anio: this.anio,
          p_color: this.color,
          p_tipo_combustible: this.tipo_combustible,
          p_capacidad_pasajeros: this.capacidad_pasajeros,
          token: token
        },
        this.imagen
      );
        await this.helper.showAlert("Vehículo agregado correctamente.", "Información");
        this.router.navigateByUrl('inicio');
      } catch (error) {
        console.error("Error al agregar vehículo: ", error);
        await this.helper.showAlert("Ocurrió un error al agregar el vehículo","Error");
      }
    }
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    if(image.webPath){
      const response = await fetch(image.webPath);
      const blob = await response.blob();

      this.imagen = {
        fname: 'foto' + image.format,
        src: image.webPath,
        file: blob
      }
    }
    var imageUrl = image.webPath;
    this.imagen.src = imageUrl;
  };

  volverButton() {
    this.router.navigateByUrl('/vehiculo');
  }

}
