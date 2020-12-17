import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubSectionPageRoutingModule } from './sub-section-routing.module';

import { SubSectionPage } from './sub-section.page';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubSectionPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [SubSectionPage],
})
export class SubSectionPageModule {}
