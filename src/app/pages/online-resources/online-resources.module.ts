import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineResourcesPageRoutingModule } from './online-resources-routing.module';

import { OnlineResourcesPage } from './online-resources.page';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineResourcesPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [OnlineResourcesPage]
})
export class OnlineResourcesPageModule {}
