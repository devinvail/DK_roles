import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubSectionPage } from './sub-section.page';

const routes: Routes = [
  {
    path: '',
    component: SubSectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubSectionPageRoutingModule {}
