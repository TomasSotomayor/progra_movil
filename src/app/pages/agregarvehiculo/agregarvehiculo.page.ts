import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { HelperService } from 'src/app/services/helper.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-agregarvehiculo',
  templateUrl: './agregarvehiculo.page.html',
  styleUrls: ['./agregarvehiculo.page.scss'],
})
export class AgregarvehiculoPage {
  id_usuario: number = 0;
  patente: string = '';
  marca: string = '';
  modelo: string = '';
  anio: number = 0;
  color: string = '';
  tipo_combustible: string = '';
  imagen: any;

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private helper: HelperService,
    private storage: StorageService
  ) {}

  async agregarVehiculo() {
    const tokenDatos = await this.storage.obtenStorage();
    try {
      const vehiculoData = {
        p_id_usuario: tokenDatos[0].usuario_id,
        p_patente: this.patente,
        p_marca: this.marca,
        p_modelo: this.modelo,
        p_anio: this.anio,
        p_color: this.color,
        p_tipo_combustible: this.tipo_combustible,
        token: tokenDatos[0].token,
      };

      const req = await this.vehiculoService.addVehiculo(vehiculoData, this.imagen);

      this.vehiculoService.addVehiculoToStream(req); // Emitir el nuevo vehículo
      await this.helper.showAlert('Vehículo agregado correctamente.', 'Información');
      this.router.navigateByUrl('/vehiculo');
    } catch (error) {
      console.error('Error al agregar vehículo: ', error);
      await this.helper.showAlert('Ocurrió un error al agregar el vehículo', 'Error');
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
        fname: 'foto.' + image.format,
        src: image.webPath,
        file: blob,
      };
    }
  }
}
