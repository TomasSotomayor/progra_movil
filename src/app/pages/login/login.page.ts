import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo:string = "asd@asd.cl";
  contrasena:string = "123456";

  constructor(private router:Router,
              private firebase:FirebaseService,
              private helper:HelperService,
              private storage:StorageService


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
    /* if (this.correo == "123" && this.contrasena == '123') {
      this.router.navigateByUrl("/inicio");
    }else{
      alert("Credenciales incorrectas.");
    } */

    const loader = await this.helper.showLoader("Cargando");
    try {

      await this.firebase.login(this.correo,this.contrasena);

      loader.dismiss();
    } catch (error:any) {

      let msg = "Ocurrió un error al iniciar sesión.";

      if(error.code == "auth/invalid-credential1"){
        msg = "Credenciales incorrectas.";
      }else if(error.code == "auth/wrong-password1"){
        msg = "Contraseña incorrecta.";
      }else if(error.code == "auth/invalid-email1"){
        msg = "Correo no valido.";
      }


      this.helper.showAlert(msg,"Aceptar");
      loader.dismiss();
    }

    const jsonToken =
    [
      {
        "token":"123hbkjasnbdkjbsdkjs123",
        "nombre":"PGY4121"
      }
    ];

    this.storage.agregarToken(jsonToken);



    //Obtenemos la info que guardamos en storage
    let token = await this.storage.obtenerStorage();
    console.log(token[0].nombre);


    this.router.navigateByUrl("/inicio");
  }

  rContrasena(){
    this.router.navigateByUrl("reset-password");
  }

  registro(){
    this.router.navigateByUrl("registro");
  }

}
