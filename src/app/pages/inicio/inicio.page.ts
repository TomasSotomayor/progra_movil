import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

import { ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { ElementRef, ViewChildren, ViewChild } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/app/models/usuario';
import { ViajeService } from 'src/app/services/viaje.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  correo: string = "";

  constructor(
    private activateRoute: ActivatedRoute, 
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private firebase:FirebaseService,
    private router:Router,
    private helper:HelperService
  ) { }

  ngOnInit() {
    this.correo = this.activateRoute.snapshot.params["correo"];
    console.log("PARAMETRO URL  ----> ", this.correo);
  }

  async cerrarSesion() {
    const confirmo = await this.helper.showConfirm("¿Está seguro de que quiere cerrar sesión?")
    if(confirmo) {
      this.firebase.cerrarSesion();
      this.router.navigateByUrl('/login');
      const loading = await this.loadingController.create({
        message: 'Cerrando sesión...',
        duration: 500
      });
      await loading.present();
    }
    
    setTimeout(() => {
      this.navCtrl.navigateRoot('/login');
    }, 500);
  }

  async navigateToPageViajes() {
    const loading = await this.loadingController.create({
      message: 'Cargando viajes...',
      duration: 500
    });
    await loading.present();
    
    setTimeout(() => {
      this.navCtrl.navigateForward('/listaviajes');
    }, 500);
  }

  async navigateToPageVehiculo() {
    const loading = await this.loadingController.create({
      message: 'Cargando vehículos...',
      duration: 500
    });
    await loading.present();
    
    setTimeout(() => {
      this.navCtrl.navigateForward('/vehiculo');
    }, 500);
  }

  async navigateToPagePerfil() {
    const loading = await this.loadingController.create({
      message: 'Cargando perfil...',
      duration: 500
    });
    await loading.present();
    
    setTimeout(() => {
      this.navCtrl.navigateForward('/perfil');
    }, 500);
  }
}
