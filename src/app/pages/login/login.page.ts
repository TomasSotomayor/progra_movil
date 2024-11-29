import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserModel } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo:string = "to.sotomayor@duocuc.cl";
  contrasena:string = "123456";
  token:string = "";
  usuario:UserModel[] = [];

  constructor(private router:Router,
              private firebase:FirebaseService,
              private helper:HelperService,
              private storage:StorageService,
              private usuarioService:UsuarioService
            ) { }

  ngOnInit() {
  }

  async login(){
    if (this.correo == "") {
      this.helper.showAlert("Ingrese el correo", "Error de validación");
      return;
    }
    if (this.contrasena == "") {
      this.helper.showAlert("Ingrese la contraseña", "Error de validación");
      return;
    }
    const loader = await this.helper.showLoader("Cargando");
    try {
      const reqFirebase = await this.firebase.login(this.correo,this.contrasena); 
      const token = await reqFirebase.user?.getIdToken();
      if (token) {
        this.token = token;
        const req = await this.usuarioService.obtenUsuario({
          p_correo:this.correo,
          token:token
        });
        this.usuario = req.data;
      }
      loader.dismiss();
    } catch (error:any) {
      let msgerror = "Ocurrió un error al iniciar sesión.";
      if(error.code == "auth/invalid-credential1"){
        msgerror = "Credenciales incorrectas.";
      }else if(error.code == "auth/wrong-password1"){
        msgerror = "Contraseña incorrecta.";
      }else if(error.code == "auth/invalid-email1"){
        msgerror = "Correo no válido.";
      }
      this.helper.showAlert(msgerror,"Aceptar");
      loader.dismiss();
    }
    const jsonToken = [{
      "token":this.token,
      "usuario_id":this.usuario[0].id_usuario,
      "usuario_correo":this.usuario[0].correo_electronico
    }];
    this.storage.agregarToken(jsonToken);
    let token = await this.storage.obtenStorage();
    this.router.navigateByUrl("inicio");
  }
  
  rContrasena(){
    this.router.navigateByUrl("rcontrasena");
  }

  registro(){
    this.router.navigateByUrl("registro");
  }

}
