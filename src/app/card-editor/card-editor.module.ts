import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardEditorPageRoutingModule } from './card-editor-routing.module';

import { CardEditorPage } from './card-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardEditorPageRoutingModule
  ],
  declarations: [CardEditorPage]
})
export class CardEditorPageModule {}
