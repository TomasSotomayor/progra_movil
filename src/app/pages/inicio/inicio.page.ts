import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

import { ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { ElementRef, ViewChildren, ViewChild } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/app/models/usuario';
import { ViajeService } from 'src/app/services/viaje.service';
import { HelperService } from 'src/app/services/helper.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  correo: string = "";
  loaded: boolean = false;
  usuario: UserModel[] = [];
  viajes: any[] = [];



  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;
  private animation: Animation | undefined;

  constructor(private activateRoute:ActivatedRoute,
    private router:Router,
    private animationCtrl: AnimationController,
    private firebase:FirebaseService,
    private usuarioService:UsuarioService,
    private storage:StorageService,
    private viajeService:ViajeService,
    private helper:HelperService,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) { }



  seleViaje(paramId:number) {
    console.log("Viaje seleccionado: ", paramId);
  }

  async loadViajes() {
    let dataStorage = await this.storage.obtenStorage();
    const req = await this.viajeService.obtenViaje(dataStorage[0].token);
    this.viajes = req.data;
  }

  async loadUsuario() {
    let dataStorage = await this.storage.obtenStorage();
    const req = await this.usuarioService.obtenUsuario(
      {
        p_correo:dataStorage[0].usuario_correo,
        token:dataStorage[0].token
      }
    );
    this.usuario = req.data;
    console.log("Data inicio usuario: ", this.usuario);
  }



  ionViewDidLeave(): void {
    console.log("view did leave");
    
  }
  ionViewWillLeave(): void {
    console.log("view will leave");
    
  }
  ionViewDidEnter(): void {
    console.log("view did enter");
    if (this.card) {
      this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
    }
  }

  ionViewWillEnter(): void {
   console.log("view will enter");
  }



  ngOnInit() {
    this.loadUsuario();
    this.loadViajes();
    this.correo = this.activateRoute.snapshot.params["correo"];
    console.log("Parámetro URL: ", this.correo);
    setTimeout(() => {
      this.loaded = true;
    },4000)
  }

  async cerrarSesion() {
    const confirmo = await this.helper.showConfirm("¿Está seguro de que quiere cerrar sesión?")
    if(confirmo) {
      this.firebase.cerrarSesion();
      this.router.navigateByUrl('/login');
      const loading = await this.loadingController.create({
        message: 'Cerrando sesión...',
        duration: 500
      });
      await loading.present();
    }
    setTimeout(() => {
      this.navCtrl.navigateRoot('/login');
    }, 500);
  }

  async navigateToPageViajes() {
    const loading = await this.loadingController.create({
      message: 'Cargando viajes...',
      duration: 500
    });
    await loading.present();
    setTimeout(() => {
      this.navCtrl.navigateForward('/listaviajes');
    }, 500);
  }

  async navigateToPageVehiculo() {
    const loading = await this.loadingController.create({
      message: 'Cargando vehículos...',
      duration: 500
    });
    await loading.present();
    setTimeout(() => {
      this.navCtrl.navigateForward('/vehiculo');
    }, 500);
  }

  async navigateToPagePerfil() {
    const loading = await this.loadingController.create({
      message: 'Cargando perfil...',
      duration: 500
    });
    await loading.present();
    setTimeout(() => {
      this.navCtrl.navigateForward('/perfil');
    }, 500);
  }
}
