import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  correo:string = "";
  contrasena:string = "";

  constructor(private router:Router) {}

  ngOnInit() {
  }

  login(){
    // path: 'inicio/:correo',
    if (this.correo != "" && this.contrasena != "") {
      this.router.navigateByUrl("/inicio/" + this.correo);
    }
  }

  rContrasena() {
    this.router.navigateByUrl("/rcontrasena");
  }

  registrar() {
    this.router.navigateByUrl("/registro");
  }

}