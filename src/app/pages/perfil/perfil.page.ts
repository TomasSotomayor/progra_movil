import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

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