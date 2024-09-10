import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RcontrasenaPageRoutingModule } from './rcontrasena-routing.module';

import { RcontrasenaPage } from './rcontrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RcontrasenaPageRoutingModule
  ],
  declarations: [RcontrasenaPage]
})
export class RcontrasenaPageModule {}
