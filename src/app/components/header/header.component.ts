import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuModalComponent } from 'src/app/components/menu-modal/menu-modal.component';
import { UtilService } from 'src/app/services/util.service';
import { HelpComponent } from '../help/help.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() showBackButton: boolean = true;

  constructor(private navCtrl: NavController, private router: Router, public modalController: ModalController, public utilService: UtilService) {}

  ngOnInit() {}

  navigateBack() {
    this.navCtrl.back();
  }

  async openMenuModal() {
    const modal = await this.modalController.create({
      component: MenuModalComponent,
    });
    return await modal.present();
  }

  async openHelpModal() {
    const modal = await this.modalController.create({
      component: HelpComponent,
      cssClass: 'my-custom-class',
      animated: true,
      mode: 'ios',
    });
    return await modal.present();
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
