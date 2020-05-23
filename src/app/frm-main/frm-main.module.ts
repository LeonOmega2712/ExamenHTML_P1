import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrmMainPageRoutingModule } from './frm-main-routing.module';

import { FrmMainPage } from './frm-main.page';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrmMainPageRoutingModule,
    ChartsModule
  ],
  declarations: [FrmMainPage]
})
export class FrmMainPageModule {}
