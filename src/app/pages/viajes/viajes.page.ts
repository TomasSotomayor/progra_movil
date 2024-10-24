import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ViajeService} from 'src/app/services/viaje.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage {
  costo: number = 0;
  fecha: string = "";
  ubicacionorigen: string = "";
  ubicaciondestino: string = "";
  navCtrl: any;


  constructor(
    private firebase:FirebaseService,
    private viajeService:ViajeService,
    private alertController: AlertController,
    private router: Router,
    private helper: HelperService
  ) { }

  ngOnInit() {
  }

  async addViaje() {
    const userFirebase = await this.firebase.addViaje();
    const token = await userFirebase.user?.getIdToken();
    if(token) {
      const req = await this.viajeService.registroViaje({
        p_costo: this.costo,
        p_fecha: this.fecha,
        p_ubicacionorigen: this.ubicacionorigen,
        p_ubicaciondestino: this.ubicaciondestino,
        token:token
      })
    }
    await this.helper.showAlert("Viaje agregado correctamente.", "Información");
    await this.router.navigateByUrl('listaviajes');
  }

  async mostrarAlerta() {
    // Comprobación básica de que los campos requeridos estén llenos
    if (!this.costo || !this.fecha || !this.ubicacionorigen || !this.ubicaciondestino) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    const alert = await this.alertController.create({
      header: 'Registro Completado',
      message: '¡Tu registro ha sido completado con éxito!',
      buttons: ['OK']
    });

    await alert.present();
  }

  volverButton() {
    this.router.navigateByUrl('/listaviajes');
  }
}
