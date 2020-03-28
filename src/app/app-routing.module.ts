import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'frm-registro',
    loadChildren: () => import('./frm-registro/frm-registro.module').then( m => m.FrmRegistroPageModule)
  },
  {
    path: 'frm-main',
    loadChildren: () => import('./frm-main/frm-main.module').then( m => m.FrmMainPageModule)
  },
  {
    path: 'frm-main2',
    loadChildren: () => import('./frm-main2/frm-main2.module').then( m => m.FrmMain2PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
