import { Component, OnInit, } from '@angular/core';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  imagen: string;
  router: any;
  
  
  constructor(private navCtrl: NavController) {
    this.imagen = 'assets/images/vehicle.jpg'
  }

  ngOnInit() {
  }

  vehiculo() {
    console.log('vehiculo');
    this.router.navigateByUrl('vehiculo');
  }

  volverButton() {
    this.navCtrl.back();
  }
  

}