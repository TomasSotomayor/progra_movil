import { UsuarioService } from 'src/app/services/usuario.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = "";
  correo: string = "";
  telefono: string = "";
  contrasena: string = "";
  imagen: any;

  constructor(
    private firebase:FirebaseService,
    private usuarioService:UsuarioService,
    private alertController: AlertController,
    private router: Router,
    private helper: HelperService
  ) {}

  ngOnInit() {
  }

  async registro() {
    const userFirebase = await this.firebase.registro(this.correo,this.contrasena);
    const token = await userFirebase.user?.getIdToken();
    if(token){
      const req = await this.usuarioService.addUsuario({
          p_correo_electronico:this.correo,
          p_nombre:this.nombre,
          p_telefono:this.telefono,
          token:token
        },
        this.imagen
      );
    }
    await this.helper.showAlert("Usuario agregado correctamente.", "Información");
    await this.router.navigateByUrl('login');
  }

  // Función para mostrar la alerta cuando se confirmen los datos
  async mostrarAlerta() {
    // Comprobación básica de que los campos requeridos estén llenos
    if (!this.nombre || !this.correo || !this.telefono || !this.contrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Si todo está correcto, mostrar alerta de registro completado
    const alert = await this.alertController.create({
      header: 'Registro Completado',
      message: '¡Tu registro ha sido completado con éxito!',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Método para manejar el botón "Volver"
  volverButton() {
    this.router.navigateByUrl('/login');
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    if(image.webPath){
      const response = await fetch(image.webPath);
      const blob = await response.blob();

      this.imagen = {
        fname: 'foto' + image.format,
        src: image.webPath,
        file: blob
      }
    }

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    this.imagen.src = imageUrl;
  };
}
