import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importaciones de Firebase y servicios
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { FirebaseService } from './services/firebase.service'; // <--- Asegúrate de que esta ruta sea correcta

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireAuthModule,  // Módulo para autenticación de Firebase
    AngularFireModule.initializeApp({  // Configura Firebase aquí con tus credenciales
      apiKey: "AIzaSyCFuQHBgbZjXp5xbFEuOUkAy-oW5xWYiAY",
      authDomain: "oyanedel-sotomayor.firebaseapp.com",
      projectId: "oyanedel-sotomayor",
      storageBucket: "oyanedel-sotomayor.appspot.com",
      messagingSenderId: "215322682992",
      appId: "1:215322682992:web:920c40c2bf44906efa36b5"
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseService  // <--- Agrega el servicio a los proveedores
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
