import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guard/auth.guard';
import { LoggedGuard } from '../app/guard/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {                                                                        // se agrega el LoggedGuard al path de home
    path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [LoggedGuard]
  },
  {
    path: 'frm-registro',
    loadChildren: () => import('./frm-registro/frm-registro.module').then( m => m.FrmRegistroPageModule)
  },
  {
    path: 'frm-main',                                                     // se agrega el AuthGuard al path de frm-main
    loadChildren: () => import('./frm-main/frm-main.module').then( m => m.FrmMainPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'frm-main2',                                                    // de igual forma a  frm-main2
    loadChildren: () => import('./frm-main2/frm-main2.module').then( m => m.FrmMain2PageModule), canActivate: [AuthGuard]
  },
  {
    path: 'tabs-page',
    loadChildren: () => import('./tabs-page/tabs-page.module').then( m => m.TabsPagePageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'card-editor/:col/:id',
    loadChildren: () => import('./card-editor/card-editor.module').then( m => m.CardEditorPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }