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
  imagen: string | null = null; // Cambiado de undefined a null para mejor manejo

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    // Recupera los datos del usuario del servicio de almacenamiento
    const usuario = await this.storageService.getItem('usuario');
    if (usuario) {
      this.nombre = usuario.nombre; // Asegúrate de que la propiedad es 'nombre'
      this.correo = usuario.correo; // Asegúrate de que la propiedad es 'correo'
      this.telefono = usuario.telefono; // Asegúrate de que la propiedad es 'telefono'
      this.imagen = usuario.imagen; // Asegúrate de que la propiedad es 'imagen'
      console.log('Imagen cargada:', this.imagen); // Agrega un log para verificar el valor de imagen
    }
  }

  volverButton() {
    this.navCtrl.back();
  }
}
