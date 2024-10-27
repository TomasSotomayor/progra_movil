import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = '';
  correo: string = '';
  telefono: string = '';
  imagen: string | null = null;

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private usuarioService: UsuarioService
  ) {}

  async ngOnInit() {
    let tokenDatos = await this.storageService.obtenStorage();

    // Validación para evitar errores al acceder a tokenDatos[0]
    if (tokenDatos && tokenDatos.length > 0) {
      const req = await this.usuarioService.obtenUsuario({
        p_correo: tokenDatos[0].usuario_correo,
        token: tokenDatos[0].token
      });

      const usuario = await this.storageService.getItem('usuario');
      if (usuario && usuario.correo === tokenDatos[0].usuario_correo) {
        this.nombre = usuario.nombre;
        this.correo = usuario.correo;
        this.telefono = usuario.telefono;
        this.imagen = usuario.imagen; // URL de la imagen obtenida y cargada
        console.log('Imagen cargada:', this.imagen);
      }
    } else {
      console.warn("El array tokenDatos está vacío o es indefinido.");
    }
  }

  volverButton() {
    this.navCtrl.back();
  }
}
