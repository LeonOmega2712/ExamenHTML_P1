import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrmMain3Page } from './frm-main3.page';

const routes: Routes = [
  {
    path: '',
    component: FrmMain3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrmMain3PageRoutingModule {}
