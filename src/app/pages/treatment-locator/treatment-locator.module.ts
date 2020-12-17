import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatmentLocatorPageRoutingModule } from './treatment-locator-routing.module';

import { TreatmentLocatorPage } from './treatment-locator.page';
import { MoreInfoComponent } from './more-info/more-info.component';
import { FacilityFilterComponent } from './facility-filter/facility-filter.component';
import { IonicSelectableModule } from 'ionic-selectable';

import { ServicesFilterComponent } from './services-filter/services-filter.component';
import { SharedComponentsModule } from 'src/app/components/shared-components/shared-components.module';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TreatmentLocatorPageRoutingModule, IonicSelectableModule, SharedComponentsModule],
  declarations: [TreatmentLocatorPage, MoreInfoComponent, FacilityFilterComponent, ServicesFilterComponent],
  entryComponents: [MoreInfoComponent, FacilityFilterComponent, ServicesFilterComponent],
})
export class TreatmentLocatorPageModule {}
