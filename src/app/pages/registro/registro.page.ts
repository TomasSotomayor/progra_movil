import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service'; // Importar el StorageService

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
    private firebase: FirebaseService,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private router: Router,
    private helper: HelperService,
    private storageService: StorageService // Inyectar el StorageService
  ) {}

  ngOnInit() {}

  async registro() {
    // Valida que todos los campos estén completos
    if (!this.nombre || !this.correo || !this.telefono || !this.contrasena) {
      await this.mostrarAlerta('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const userFirebase = await this.firebase.registro(this.correo, this.contrasena);
      const token = await userFirebase.user?.getIdToken();

      if (token) {
        const req = await this.usuarioService.addUsuario(
          {
            p_correo_electronico: this.correo,
            p_nombre: this.nombre,
            p_telefono: this.telefono,
            token: token
          },
          this.imagen
        );

        // Almacena los datos del usuario en el StorageService
        await this.storageService.setItem('usuario', {
          nombre: this.nombre,
          correo: this.correo,
          telefono: this.telefono,
          imagen: this.imagen ? this.imagen.src : null,
        });

        // Muestra confirmación de registro y redirige
        await this.helper.showAlert("Usuario agregado correctamente.", "Información");
        await this.router.navigateByUrl('login');
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      await this.mostrarAlerta('Error', 'Hubo un problema al registrar el usuario. Inténtalo de nuevo.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  volverButton() {
    this.router.navigateByUrl('/login');
  }

  takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      if (image.webPath) {
        const response = await fetch(image.webPath);
        const blob = await response.blob();
        this.imagen = {
          fname: 'foto.' + image.format,
          src: image.webPath,
          file: blob
        };
      }

      this.imagen.src = image.webPath;
    } catch (error) {
      console.error("Error al tomar la foto:", error);
      await this.mostrarAlerta('Error', 'No se pudo tomar la foto. Inténtalo de nuevo.');
    }
  };
}
