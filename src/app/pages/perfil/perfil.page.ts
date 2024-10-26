import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

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
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    // Recupera los datos del usuario del servicio de almacenamiento
    const usuario = await this.storageService.getItem('usuario');
    if (usuario) {
      this.nombre = usuario.nombre;
      this.correo = usuario.correo;
      this.telefono = usuario.telefono;
      this.imagen = usuario.imagen;
    }
  }

  volverButton() {
    this.navCtrl.back();
  }
}
