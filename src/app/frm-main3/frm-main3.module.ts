import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrmMain3PageRoutingModule } from './frm-main3-routing.module';

import { FrmMain3Page } from './frm-main3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrmMain3PageRoutingModule
  ],
  declarations: [FrmMain3Page]
})
export class FrmMain3PageModule {}
