import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaviajePage } from './listaviaje.page';

const routes: Routes = [
  {
    path: '',
    component: ListaviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaviajePageRoutingModule {}
