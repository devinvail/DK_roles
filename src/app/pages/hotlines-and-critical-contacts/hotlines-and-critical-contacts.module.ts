import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HotlinesAndCriticalContactsPageRoutingModule } from './hotlines-and-critical-contacts-routing.module';

import { HotlinesAndCriticalContactsPage } from './hotlines-and-critical-contacts.page';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HotlinesAndCriticalContactsPageRoutingModule, SharedComponentsModule],
  declarations: [HotlinesAndCriticalContactsPage]
})
export class HotlinesAndCriticalContactsPageModule {}
