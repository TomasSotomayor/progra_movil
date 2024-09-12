import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaviajePageRoutingModule } from './listaviaje-routing.module';

import { ListaviajePage } from './listaviaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaviajePageRoutingModule
  ],
  declarations: [ListaviajePage]
})
export class ListaviajePageModule {}
