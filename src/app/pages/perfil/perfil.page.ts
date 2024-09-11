import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  imagen: string;

  constructor(private navCtrl: NavController) {
    // Inicializa la propiedad imagen con la ruta de la imagen
    this.imagen = 'assets/images/conductor.jpg';
  }

  // Método para manejar el botón "Volver"
  volverButton() {
    this.navCtrl.back();
  }
}