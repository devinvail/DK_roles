import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
import { HelpComponent } from 'src/app/components/help/help.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, SharedComponentsModule],
  declarations: [HomePage],
  entryComponents: [HelpComponent],
})
export class HomePageModule {}
