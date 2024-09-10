import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  correo: string = "";

  constructor(private activateRoute: ActivatedRoute, 
              private navCtrl: NavController) { }

  ngOnInit() {
    this.correo = this.activateRoute.snapshot.params["correo"];
    console.log("PARAMETRO URL  ----> ", this.correo);
  }

  cerrarSesion() {
    console.log('Cerrando sesión...');
    // Redirige al usuario a la pantalla de inicio de sesión
    this.navCtrl.navigateRoot('/login');
  }

  navigateToPageViajes() {
    this.navCtrl.navigateForward('/viajes');
  }

  navigateToPageVehiculo() {
    this.navCtrl.navigateForward('/vehiculo');
  }

  navigateToPagePerfil() {
    this.navCtrl.navigateForward('/perfil');
  }
}
