import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarvehiculoPageRoutingModule } from './listarvehiculo-routing.module';

import { ListarvehiculoPage } from './listarvehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarvehiculoPageRoutingModule
  ],
  declarations: [ListarvehiculoPage]
})
export class ListarvehiculoPageModule {}
