import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrmMain2Page } from './frm-main2.page';

const routes: Routes = [
  {
    path: '',
    component: FrmMain2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrmMain2PageRoutingModule {}
