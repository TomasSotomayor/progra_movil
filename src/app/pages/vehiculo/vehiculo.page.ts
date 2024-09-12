import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  imagen: string;
  router: any;
  
  
  constructor(
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.imagen = 'assets/images/vehicle.jpg'
  }

  ngOnInit() {
  }

  vehiculo() {
    this.router.navigateByUrl('vehiculo');
  }

  volverButton() {
    this.navCtrl.back();
  }

  navigateToPageAgregarVehiculo() {
    this.navCtrl.navigateForward('/agregarvehiculo');
  }

}