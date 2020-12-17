import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Information } from 'src/app/models/information';
import { UtilService } from 'src/app/services';

import { Plugins } from '@capacitor/core';
import { GetDataService } from 'src/app/services/getdata';

@Component({
  selector: 'app-section',
  templateUrl: './section.page.html',
  styleUrls: ['./section.page.scss'],
})
export class SectionPage implements OnInit {
  information: Information[];
  pageName: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private dataService: GetDataService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (result: any) => {
      this.pageName = result.params.name.replace(/\_/g, ' ');
      this.information = await this.dataService.appData;
      this.information = this.information.find((item) => item.name === this.pageName).children;
      console.log('SectionPage -> ngOnInit -> this.information', this.information);
    });
  }

  /**
   * @description Toggles the accordian
   * @param index Index of the menu item to be toggled
   * @returns void
   */
  toggleSection(index: number): void {
    this.information[index].open = !this.information[index].open;
  }

  async navigate(item, parent, index) {
    console.log('SectionPage -> navigate -> item', item);
    if (item.url === 'slide') {
      // this.utilService.removeAppendedTitle(parent.children);
      parent && parent.children ? (this.utilService.slideData = parent.children) : (this.utilService.slideData = [item]);
      this.router.navigate(['/tabs/slides', index]);
    } else {
      const { Browser } = Plugins;
      item.type === 'page' ? this.router.navigate([item.url]) : await Browser.open({ url: item.url });
    }
  }

  ionViewWillLeave() {
    console.log('View will leave');
    this.utilService.navigationAnimate();
  }
}
