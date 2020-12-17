import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { IndexPage } from './index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [IndexPage]
})
export class IndexPageModule { }
