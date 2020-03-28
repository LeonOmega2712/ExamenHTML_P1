import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrmMain2PageRoutingModule } from './frm-main2-routing.module';

import { FrmMain2Page } from './frm-main2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrmMain2PageRoutingModule
  ],
  declarations: [FrmMain2Page]
})
export class FrmMain2PageModule {}
