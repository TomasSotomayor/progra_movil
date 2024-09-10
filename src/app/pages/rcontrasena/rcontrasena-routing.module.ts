import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RcontrasenaPage } from './rcontrasena.page';

const routes: Routes = [
  {
    path: '',
    component: RcontrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RcontrasenaPageRoutingModule {}
