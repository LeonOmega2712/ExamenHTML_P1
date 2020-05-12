import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardEditorPage } from './card-editor.page';

const routes: Routes = [
  {
    path: '',
    component: CardEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardEditorPageRoutingModule {}
