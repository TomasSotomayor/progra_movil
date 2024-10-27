import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/viaje.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-listaviajes',
  templateUrl: './listaviajes.page.html',
  styleUrls: ['./listaviajes.page.scss'],
})
export class ListaviajesPage implements OnInit {
  viajes: any[] = [];

  constructor(private navCtrl: NavController, private viajeService: ViajeService, private firebase: FirebaseService) {}

  async ngOnInit() {
  }

  navigateToPageViajes() {
    this.navCtrl.navigateForward('/viajes');
  }
}
