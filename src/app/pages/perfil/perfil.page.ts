import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  imagen: string;

  constructor(private navCtrl: NavController) {
    this.imagen = 'assets/images/conductor.jpg';
  }

  volverButton() {
    this.navCtrl.back();
  }

}
