import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaviajesPage } from './listaviajes.page';

const routes: Routes = [
  {
    path: '',
    component: ListaviajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaviajesPageRoutingModule {}
