import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MysearchesPageRoutingModule } from './mysearches-routing.module';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { MysearchesPage } from './mysearches.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MysearchesPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [MysearchesPage]
})
export class MysearchesPageModule { }
