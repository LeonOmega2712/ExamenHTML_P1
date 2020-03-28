import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrmRegistroPageRoutingModule } from './frm-registro-routing.module';

import { FrmRegistroPage } from './frm-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrmRegistroPageRoutingModule
  ],
  declarations: [FrmRegistroPage]
})
export class FrmRegistroPageModule {}
