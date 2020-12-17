import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineResourcesPage } from './online-resources.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineResourcesPageRoutingModule {}
