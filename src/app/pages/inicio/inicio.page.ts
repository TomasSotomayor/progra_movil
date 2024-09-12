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
      duration: 3000
    });
    await loading.present();
    
    setTimeout(() => {
      this.navCtrl.navigateRoot('/login');
    }, 3000);
  }

  async navigateToPageViajes() {
    const loading = await this.loadingController.create({
      message: 'Cargando viajes...',
      duration: 3000
    });
    await loading.present();
    
    setTimeout(() => {
      this.navCtrl.navigateForward('/listaviajes');
    }, 3000);
  }

  async navigateToPageVehiculo() {
    const loading = await this.loadingController.create({
      message: 'Cargando vehículos...',
      duration: 3000
    });
    await loading.present();
    
    setTimeout(() => {
      this.navCtrl.navigateForward('/vehiculo');
    }, 3000);
  }

  async navigateToPagePerfil() {
    const loading = await this.loadingController.create({
      message: 'Cargando perfil...',
      duration: 3000
    });
    await loading.present();
    
    setTimeout(() => {
      this.navCtrl.navigateForward('/perfil');
    }, 3000);
  }
}
