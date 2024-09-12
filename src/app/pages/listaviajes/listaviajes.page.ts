import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-listaviajes',
  templateUrl: './listaviajes.page.html',
  styleUrls: ['./listaviajes.page.scss'],
})
export class ListaviajesPage implements OnInit {
  router: any;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  
  volverButton() {
    this.navCtrl.back();
  }

  navigateToPageViajes() {
    this.navCtrl.navigateForward('/viajes');
  }
 
}