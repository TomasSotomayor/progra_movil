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
      this.nombre = usuario.p_nombre; // Ajustar a los campos correctos
      this.correo = usuario.p_correo_electronico; // Ajustar a los campos correctos
      this.telefono = usuario.p_telefono; // Ajustar a los campos correctos
      this.imagen = usuario.imagen; // Asegúrate de que la imagen esté guardada correctamente
    }
  }

  volverButton() {
    this.navCtrl.back();
  }
}
