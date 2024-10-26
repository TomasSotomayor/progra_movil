import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { FirebaseService } from './services/firebase.service';
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient(),
    FirebaseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
