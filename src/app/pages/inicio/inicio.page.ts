import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController, AnimationController, Animation } from '@ionic/angular';
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

export class InicioPage implements OnInit {
  correo: string = "";
  loaded: boolean = false;
  usuario: UserModel[] = [];
  viajes: any[] = [];

  @ViewChild('card', { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;
  private animation: Animation | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private animationCtrl: AnimationController,
    private firebase: FirebaseService,
    private usuarioService: UsuarioService,
    private storage: StorageService,
    private viajeService: ViajeService,
    private helper: HelperService,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadUsuario();
    this.loadViajes();
    this.correo = this.activateRoute.snapshot.params["correo"];
    console.log("Parámetro URL: ", this.correo);
    setTimeout(() => {
      this.loaded = true;
    }, 4000);
  }

  async loadUsuario() {
    let dataStorage = await this.storage.obtenStorage();
    const req = await this.usuarioService.obtenUsuario({
      p_correo: dataStorage[0].usuario_correo,
      token: dataStorage[0].token
    });
    this.usuario = req.data;
    console.log("Data inicio usuario: ", this.usuario);

    // Verifica que haya un usuario disponible antes de acceder a sus propiedades
    if (this.usuario.length > 0) {
      await this.storage.setItem('usuario', {
        nombre: this.usuario[0].nombre,
        correo: this.usuario[0].correo_electronico, // Cambiado a correo_electronico
        telefono: this.usuario[0].telefono,
        imagen: this.usuario[0].imagen_usuario // Cambiado a imagen_usuario
      });
    } else {
      console.error("No se encontró ningún usuario.");
    }
  }

  async loadViajes() {
    let dataStorage = await this.storage.obtenStorage();
    const req = await this.viajeService.obtenViaje(dataStorage[0].token);
    this.viajes = req.data;
  }

  ionViewDidEnter(): void {
    console.log("view did enter");
    if (this.card) {
      this.animation = this.animationCtrl
        .create()
        .addElement(this.card.nativeElement)
        .duration(2000)
        .iterations(Infinity)
        .direction('alternate')
        .keyframes([
          { offset: 0, backgroundColor: 'blue' },
          { offset: 0.5, backgroundColor: 'red' },
          { offset: 1, backgroundColor: 'green' }
        ]);
      this.animation.play();
    }
  }

  async cerrarSesion() {
    const confirmo = await this.helper.showConfirm("¿Está seguro de que quiere cerrar sesión?");
    if (confirmo) {
      const menu = document.querySelector('ion-menu');
      if (menu && menu.hasAttribute('opened')) {
        await menu.close();
      }
      const loading = await this.loadingController.create({
        message: 'Cerrando sesión...',
        duration: 500
      });
      await loading.present();
      await this.firebase.cerrarSesion();
      setTimeout(() => {
        this.navCtrl.navigateRoot('/login');
      }, 500);
    }
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
