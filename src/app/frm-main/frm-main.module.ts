import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrmMainPageRoutingModule } from './frm-main-routing.module';

import { FrmMainPage } from './frm-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrmMainPageRoutingModule
  ],
  declarations: [FrmMainPage]
})
export class FrmMainPageModule {}
