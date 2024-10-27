import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { HelperService } from 'src/app/services/helper.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agregarvehiculo',
  templateUrl: './agregarvehiculo.page.html',
  styleUrls: ['./agregarvehiculo.page.scss'],
})

export class AgregarvehiculoPage  {
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
    private usuarioService: UsuarioService,
    private storage: StorageService
  ) { }

  ngOnInit() {
  }

  async agregarVehiculo() {
    let tokenDatos = await this.storage.obtenStorage();
    const reqA = await this.usuarioService.obtenUsuario({
      p_correo: tokenDatos[0].usuario_correo,
      token: tokenDatos[0].token
    });
    try {
      const req = await this.vehiculoService.addVehiculo({
        'p_id_usuario': tokenDatos[0].usuario_id,
        'p_patente': this.patente,
        'p_marca': this.marca,
        'p_modelo': this.modelo,
        'p_anio': this.anio,
        'p_color': this.color,
        'p_tipo_combustible': this.tipo_combustible,
        'token': tokenDatos[0].token
      }, this.imagen);
      await this.helper.showAlert("Vehículo agregado correctamente.", "Información");
      this.router.navigateByUrl('inicio');
    } catch (error) {
      console.error("Error al agregar vehículo: ", error);
      await this.helper.showAlert("Ocurrió un error al agregar el vehículo","Error");
  }}

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
    }}
    var imageUrl = image.webPath;
    this.imagen.src = imageUrl;
  };

  volverButton() {
    this.router.navigateByUrl('/vehiculo');
  }

}
