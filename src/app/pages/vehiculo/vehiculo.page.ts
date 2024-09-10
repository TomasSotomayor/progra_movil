import { Component, OnInit, } from '@angular/core';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  router: any;
  
  
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  vehiculo() {
    console.log('vehiculo');
    this.router.navigateByUrl('vehiculo');
  }

  volverButton() {
    this.navCtrl.navigateRoot('/inicio/');
  }

  

}
