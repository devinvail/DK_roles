import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AboutComponent } from 'src/app/components/about/about.component';
import { SavedSearchesComponent } from 'src/app/components/saved-searches/saved-searches.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  tabItems = [
    {
      route: 'home',
      icon: 'home',
      name: 'HOME',
    },
    {
      route: 'index',
      icon: 'list',
      name: 'INDEX',
    },
    {
      route: 'mysearches',
      icon: 'heart',
      name: 'MY SEARCHES',
    },
    {
      route: 'about',
      icon: 'information-circle',
      name: 'ABOUT',
    },
  ];
  constructor(public utilService: UtilService, private router: Router, private modalController: ModalController) {}

  ngOnInit() {}

  navigate(route) {
    route === 'home' || route === 'index'
      ? this.router.navigate(['tabs/' + route])
      : route === 'about'
      ? this.openAboutModal()
      : this.openSavedSearchedModal();
  }

  async openAboutModal() {
    const modal = await this.modalController.create({
      component: AboutComponent,
      animated: true,
      mode: 'ios',
    });
    return await modal.present();
  }

  async openSavedSearchedModal() {
    const modal = await this.modalController.create({
      component: SavedSearchesComponent,
      animated: true,
      mode: 'ios',
    });
    return await modal.present();
  }
}
