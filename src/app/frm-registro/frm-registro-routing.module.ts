import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrmRegistroPage } from './frm-registro.page';

const routes: Routes = [
  {
    path: '',
    component: FrmRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrmRegistroPageRoutingModule {}
