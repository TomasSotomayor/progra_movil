import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  imagen: string | null = null;

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private usuarioService: UsuarioService
  ) {}

  async ngOnInit() {
    let tokenDatos = await this.storageService.obtenStorage();
    const req = await this.usuarioService.obtenUsuario({
      p_correo: tokenDatos[0].usuario_correo,
      token: tokenDatos[0].token
    });
    tokenDatos[0].nombre
    tokenDatos[0].
    tokenDatos[0].token
    tokenDatos[0].token

    const usuario = await this.storageService.getItem('usuario');
    if (usuario) {
      this.nombre = usuario.nombre;
      this.correo = usuario.correo;
      this.telefono = usuario.telefono;
      this.imagen = usuario.imagen;
      console.log('Imagen cargada:', this.imagen);
  }}

  volverButton() {
    this.navCtrl.back();
  }
}
