import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Information } from 'src/app/models/information';
import { UtilService } from 'src/app/services';
import { NavController } from '@ionic/angular';
import { GetDataService } from 'src/app/services/getdata';

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.page.html',
  styleUrls: ['./sub-section.page.scss'],
})
export class SubSectionPage implements OnInit {
  pageName: string;
  information: Information[] = [];
  navigationMenuDetails: object;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private navControlller: NavController,
    private dataService: GetDataService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(async (result: any) => {
      const length = Object.keys(result.params).length;
      if (length === 3) {
        let data = await this.dataService.appData;
        data = data
          .find((item) => item.name === result.params.parent)
          .children.find((item) => item.name === result.params.subParent)
          .children.find((item) => item.name === result.params.child).children;
        console.log('SubSectionPage -> ngOnInit -> data', data);
        this.utilService.removeAppendedTitle(data);
        this.information = data;
        this.setIndex();
      } else if (length === 2) {
        let data = await this.dataService.appData;
        data = data.find((item) => item.name === result.params.parent).children.find((item) => item.name === result.params.child).children;
        this.utilService.removeAppendedTitle(data);
        this.information = data;
        this.setIndex();
      }
    });
  }

  /**
   * @description - Mapping the children data content.
   * @returns void
   */
  // tslint:disable-next-line: no-unused-expression
  setIndex(): void {
    let index = 1;
    this.information.map((content) => {
      if (content.children) {
        content.children.map((item) => {
          item.index = index;
          index += 1;
        });
      } else {
        content.index = index;
        index += 1;
      }
    });
  }
  /**
   * @description - Navigate to particular slide page
   * @param slideNumber - sub section number
   * @returns void
   */

  navigateToSlides(slideNumber: number, menuName?: string, subMenu?: string, childData?: any): void {
    this.utilService.slideData = this.information;
    this.navControlller.navigateForward(['tabs/slides', slideNumber], { animated: true, animationDirection: 'forward' });
  }

  /**
   * @description Toggles the menu accordian
   * @param index Menu index
   * @returns void
   */
  toggleSection(index: number): void {
    this.information[index].open = !this.information[index].open;
  }

  ionViewWillLeave() {
    console.log('View will leave');
    this.utilService.navigationAnimate();
  }
}
