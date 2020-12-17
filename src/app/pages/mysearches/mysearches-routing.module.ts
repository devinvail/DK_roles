import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MysearchesPage } from './mysearches.page';

const routes: Routes = [
  {
    path: '',
    component: MysearchesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MysearchesPageRoutingModule {}
