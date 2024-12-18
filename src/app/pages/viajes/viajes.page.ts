import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { NavController } from '@ionic/angular';
import { UserModel } from 'src/app/models/usuario';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})

export class ViajesPage implements OnInit {
  id_usuario: number = 0;
  id_vehiculo: number = 0;
  costo: number = 0;
  ubicacion_origen: string = '';
  ubicacion_destino: string = '';
  usuario: UserModel[] = [];
  viaje: any[] = [];

  constructor(
    private navCtrl: NavController,
    private viajesService: ViajeService,
    private router: Router,
    private helper: HelperService,
    private usuarioService: UsuarioService,
    private storage: StorageService,
    private viajeService: ViajeService
  ) {}

  ngOnInit() {
    this.loadUsuario();
    this.loadViaje();
  }

  iChange(event:any) {
    this.id_vehiculo = event.detail.value.id_vehiculo;
  }

  async loadUsuario() {
    let tokenDatos = await this.storage.obtenStorage();
    const req = await this.usuarioService.obtenUsuario({
      p_correo: tokenDatos[0].usuario_correo,
      token: tokenDatos[0].token
    });
    this.usuario = req.data;
  }

  async loadViaje() {
    let tokenDatos = await this.storage.obtenStorage();
    const req = await this.viajeService.obtenViaje(tokenDatos[0].token)
    this.viaje = req.data;
  }

  async agregarViaje() {
    let tokenDatos = await this.storage.obtenStorage();
    try {
      console.log("Vehiculo: ", this.id_vehiculo)
      console.log("Usuario: ", tokenDatos[0].usuario_id)
      const req = await this.viajesService.addViaje({
        'p_id_usuario': tokenDatos[0].usuario_id,
        'p_id_vehiculo': this.id_vehiculo,
        'p_costo': this.costo,
        'p_ubicacion_origen': this.ubicacion_origen,
        'p_ubicacion_destino': this.ubicacion_destino,
        'token': tokenDatos[0].token
      });
      await this.helper.showAlert("Viaje agregado correctamente.", "Información");
      this.router.navigateByUrl('/listaviajes');
    } catch (error) {
      console.error("Error al agregar viaje: ", error);
      await this.helper.showAlert("Ocurrió un error al agregar el viaje","Error");
  }}

  volver() {
    this.navCtrl.navigateBack('/listaviajes');
  }
}
