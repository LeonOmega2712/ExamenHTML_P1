import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPagePageRoutingModule } from './tabs-page-routing.module';

import { TabsPagePage } from './tabs-page.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TabsPagePage,
    children: [
      {
        path: 'frm-main', // se agrega el AuthGuard al path de frm-main
        loadChildren: () =>
          import('../frm-main/frm-main.module').then(
            (m) => m.FrmMainPageModule
          ),
      },
      {
        path: 'frm-main2', // de igual forma a  frm-main2
        loadChildren: () =>
          import('../frm-main2/frm-main2.module').then(
            (m) => m.FrmMain2PageModule
          ),
      },
      {
        path: 'frm-main3', // de igual forma a  frm-main2
        loadChildren: () =>
          import('../frm-main3/frm-main3.module').then(
            (m) => m.FrmMain3PageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/frm-main',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TabsPagePageRoutingModule, RouterModule.forChild(routes)],
  declarations: [TabsPagePage],
})
export class TabsPagePageModule {}
