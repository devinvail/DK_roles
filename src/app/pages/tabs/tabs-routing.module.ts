import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then((m) => m.HomePageModule),
          },
        ],
      },
      {
        path: 'index',
        children: [
          {
            path: '',
            loadChildren: () => import('../index/index.module').then((m) => m.IndexPageModule),
          },
        ],
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then((m) => m.AboutPageModule),
          },
        ],
      },
      {
        path: 'help',
        children: [
          {
            path: '',
            loadChildren: () => import('../help/help.module').then((m) => m.HelpPageModule),
          },
        ],
      },
      {
        path: 'mysearches',
        loadChildren: () => import('../mysearches/mysearches.module').then((m) => m.MysearchesPageModule),
      },
      {
        path: 'information-to-share',
        loadChildren: () => import('../information-to-share/information-to-share.module').then((m) => m.InformationToSharePageModule),
      },

      {
        path: 'section/:name',
        loadChildren: () => import('../shared/section/section.module').then((m) => m.SectionPageModule),
      },
      {
        path: 'sub-section/:parent/:child',
        loadChildren: () => import('../shared/sub-section/sub-section.module').then((m) => m.SubSectionPageModule),
      },
      {
        path: 'sub-section/:parent/:subParent/:child',
        loadChildren: () => import('../shared/sub-section/sub-section.module').then((m) => m.SubSectionPageModule),
      },
      {
        path: 'slides/:content/:active',
        loadChildren: () => import('../shared/slides/slides.module').then((m) => m.SlidesPageModule),
      },
      {
        path: 'slides/:active',
        loadChildren: () => import('../shared/slides/slides.module').then((m) => m.SlidesPageModule),
      },
      {
        path: 'hotlines-and-critical-contacts',
        // tslint:disable-next-line: max-line-length
        loadChildren: () => import('../hotlines-and-critical-contacts/hotlines-and-critical-contacts.module').then((m) => m.HotlinesAndCriticalContactsPageModule),
      },
      {
        path: 'online-resources',
        loadChildren: () => import('../online-resources/online-resources.module').then((m) => m.OnlineResourcesPageModule),
      },
      {
        path: 'treatment-locator',
        loadChildren: () => import('../treatment-locator/treatment-locator.module').then((m) => m.TreatmentLocatorPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
