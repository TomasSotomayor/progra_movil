import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  id_usuario: number = 0;
  id_vehiculo: number = 0;
  costo: number = 0;
  fecha: string = '';
  ubicacion_origen: string = '';
  ubicacion_destino: string = '';

  constructor(
    private navCtrl: NavController,
    private viajesService: ViajeService,
    private router: Router,
    private helper: HelperService,
    private usuarioService: UsuarioService,
    private storage: StorageService
  ) {}

  ngOnInit() {
  }

  async agregarViaje() {
    let tokenDatos = await this.storage.obtenStorage();
    const reqA = await this.usuarioService.obtenUsuario({
      p_correo: tokenDatos[0].usuario_correo,
      token: tokenDatos[0].token
    });
    try {
      const req = await this.viajesService.addViaje({
        'p_id_usuario': tokenDatos[0].usuario_id,
        'p_ubicacion_origen': this.ubicacion_origen,
        'p_ubicacion_destino': this.ubicacion_destino,
        'p_costo': this.costo,
        'p_id_vehiculo':tokenDatos[0].vehiculo_id,
        'p_fecha': this.fecha,
        'token': tokenDatos[0].token
      });
      await this.helper.showAlert("Viaje agregado correctamente.", "Información");
      this.router.navigateByUrl('listaviajes');
    } catch (error) {
      console.error("Error al agregar viaje: ", error);
      await this.helper.showAlert("Ocurrió un error al agregar el viaje","Error");
    }
  }

  volver() {
    this.navCtrl.navigateBack('/listaviajes'); // Redirige a la vista principal.
  }
}
