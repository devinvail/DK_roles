import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationToSharePage } from './information-to-share.page';

const routes: Routes = [
  {
    path: '',
    component: InformationToSharePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationToSharePageRoutingModule {}
