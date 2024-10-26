import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { FirebaseService } from './services/firebase.service'; // <--- Asegúrate de que esta ruta sea correcta
import { StorageService } from './services/storage.service'; // <--- Importación de StorageService
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp({
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
    provideHttpClient(),
    FirebaseService,   // Servicio de Firebase
    StorageService     // Servicio de almacenamiento
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
