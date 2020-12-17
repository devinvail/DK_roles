import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationToSharePageRoutingModule } from './information-to-share-routing.module';

import { InformationToSharePage } from './information-to-share.page';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationToSharePageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [InformationToSharePage],
})
export class InformationToSharePageModule {}
