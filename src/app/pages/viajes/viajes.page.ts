import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  router: any;
  

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  viajes() {
    console.log('viajes');
    // Redirige al usuario a la pantalla de viajes
    this.router.navigateByUrl('viajes');
  }

  volverButton() {
    this.navCtrl.back();
  }

}
