import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaviajesPageRoutingModule } from './listaviajes-routing.module';

import { ListaviajesPage } from './listaviajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaviajesPageRoutingModule
  ],
  declarations: [ListaviajesPage]
})
export class ListaviajesPageModule {}
