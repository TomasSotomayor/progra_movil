import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarvehiculoPage } from './listarvehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: ListarvehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarvehiculoPageRoutingModule {}
