import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

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
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.correo = this.activateRoute.snapshot.params["correo"];
    console.log("PARAMETRO URL  ----> ", this.correo);
  }

  async cerrarSesion() {
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión...',
      duration: 500
    });
    await loading.present();
    
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
