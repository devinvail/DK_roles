import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from '../../components/shared-components/shared-components.module';
import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { AboutComponent } from 'src/app/components/about/about.component';
import { SavedSearchesComponent } from 'src/app/components/saved-searches/saved-searches.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TabsPageRoutingModule, SharedComponentsModule],
  declarations: [TabsPage],
  entryComponents: [AboutComponent, SavedSearchesComponent],
})
export class TabsPageModule {}
