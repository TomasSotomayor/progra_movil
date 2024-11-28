import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule),
  },
  {
    path: 'vehiculo',
    loadChildren: () => import('./pages/vehiculo/vehiculo.module').then(m => m.VehiculoPageModule),
  },
  {
    path: 'viajes',
    loadChildren: () => import('./pages/viajes/viajes.module').then(m => m.ViajesPageModule),
  },
  {
    path: 'rcontrasena',
    loadChildren: () => import('./pages/rcontrasena/rcontrasena.module').then(m => m.RcontrasenaPageModule),
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule),
  },
  {
    path: 'agregarvehiculo',
    loadChildren: () => import('./pages/agregarvehiculo/agregarvehiculo.module').then(m => m.AgregarvehiculoPageModule),
  },
  {
    path: 'listaviajes',
    loadChildren: () => import('./pages/listaviajes/listaviajes.module').then(m => m.ListaviajesPageModule),
  },
  {
    path: 'agregar-vehiculo',
    loadChildren: () => import('./pages/agregarvehiculo/agregarvehiculo.module').then(m => m.AgregarvehiculoPageModule),
  },
  {
    path: '**',
    loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404PageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
