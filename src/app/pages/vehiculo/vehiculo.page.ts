import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) {}

  ngOnInit() {}
  
  async navigateToPageRegistrarVehiculo() {
    this.navCtrl.navigateForward('/agregarvehiculo');
  }

}
