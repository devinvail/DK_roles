import {Component, OnInit} from '@angular/core';
import {Platform, MenuController} from '@ionic/angular';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import {UtilService} from 'src/app/services';
import {GetDataService} from 'src/app/services/getdata';
import {SettingsService} from 'src/app/services/settings.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  appData: any;
  public selectedIndex = 0;

  public appPages = [
    {
      name: 'Preparing to Deploy',
      children: [
        {
          name: 'Readiness Refresher',
          link: 'tabs/slides/Behavioral_Health_Responder/1',
        },
        {
          name: 'Find Treatment Locations',
          link: 'https://findtreatment.samhsa.gov/',
        },
      ],
    },
    {
      name: 'On-the-Ground Assistance',
      children: [
        {
          name: 'Behaviors and Interventions',
          link: 'tabs/slides/Behaviors_and_Interventions/1',
        },
        {
          name: 'Information to Share with Survivors',
          link: 'tabs/information-to-share',
        },
        {
          name: 'Hotlines and Critical Contacts',
          link: 'tabs/hotlines-and-critical-contacts',
        },
        {
          name: 'SAMHSA Treatment Locator',
          link: 'tabs/treatment-locator',
        },
        {
          name: 'Online Resources',
          link: 'tabs/online-resources',
        },
        {
          name: 'Publications Directory',
          link: 'https://store.samhsa.gov/search_results?k=disaster',
        },
        {
          name: 'Stress Prevention and Management',
          link: 'tabs/slides/Stress_Prevention_and_Management/1',
          name_type: 'Stress Prevention and Management',
        },
      ],
    },
    {
      name: 'Postdeployment Guide',
      children: [
        {
          name: 'Tips for Supporting Re-entry',
          link: 'tabs/slides/Postdeployment_Guide/1',
          name_type: 'Postdeployment Guide',
        },
        {
          name: 'Professional Development',
          link: 'tabs/slides/Professional_Development/1',
          name_type: 'Professional Development',
        },
      ],
    },
  ];

  mainMenu: boolean = true;
  isSubMenu: boolean = false;

  pageName: string = '';
  subPageName: string = '';
  isExpandedMenu: boolean = false;

  subMenu: any[] = [];
  expandedMenu: any[] = [];

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private menuController: MenuController,
    public modalController: ModalController,
    public utilService: UtilService,
    private dataService: GetDataService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.menuController.enable(true, 'main-content');
    this.settingsService.role.subscribe((res) => {});
  }

  /**
   * @description Toggle from main menu to sub menu and sets the title
   * @param item Menu item
   * @returns void
   */
  toggleItem(item: any) {
    this.pageName = item.name;
    this.mainMenu = false;
    this.isSubMenu = true;
    this.subMenu = this.appPages.filter((i) => i.name === item.name);
  }

  /**
   * @description Navigate to page/toggle the menu item based on the url type
   * @param url Page url
   * @param index page index
   * @param item item
   * @returns void
   */
  // navigateToPage(url: string, index: number, item: any): void {
  //   if (url && url.includes('https')) {
  //     window.open(url, '_blank');
  //   } else if (url && url.toLowerCase() === 'slidelink') {
  //     this.router.navigate([url]);
  //   } else {
  //     if (item.children) {
  //       this.mainMenu = false;
  //       this.isSubMenu = false;
  //       this.isExpandedMenu = true;
  //       this.subPageName = item.name;
  //       this.expandedMenu = item.children;
  //     } else if (item.link) {
  //       this.router.navigate([url]);
  //       this.selectedIndex = index;
  //     }
  //   }
  // }

  mergeData(data: any[], allData: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let d = [];
      data.forEach((item, index) => {
        if (!item.children) {
          // if item doesn't have children it appends title directly to the html title
          const titleappend = allData.name + '- ' + item.html.title;
          const titleFlag = this.checkTitle(item.html.title, allData.name); // checks for duplicate title
          if (!titleFlag) {
            item.html.title = titleappend;
          }
        }
        item.children
          ? item.children.forEach((i) => {
              if (i.children) {
                this.appendTitle(i.name, i.children).then((data) => {
                  i.children = data;
                });
              } else {
                const titleFlag = this.checkTitle(i.html.title, item.name); // checks for duplicate title
                if (!titleFlag) {
                  i.html.title = item.name + '-' + i.html.title;
                }
              }
              i.children ? (d = [...d, ...i.children]) : (d = [...d, i]);
            })
          : (d = [...d, item]);
        data.length === index + 1 ? resolve(d) : null;
      });
    });
  }

  /**
   * @description function add title to childrens html title
   * @returns Promise
   */

  async appendTitle(title: string, children: any): Promise<any[]> {
    // tslint:disable-next-line: forin
    return new Promise((resolve, reject) => {
      for (let i = 0; i < children.length; i++) {
        const titleFlag = this.checkTitle(children[i].html.title, title); // checks for duplicate title
        if (!titleFlag) {
          children[i].html.title = title + '- ' + children[i].html.title;
        }
        if (i < children.length - 1) {
          resolve(children);
        }
      }
    });
  }

  /**
   * @description function checks wheather title already exists used avoid dupilcation
   * @returns boolean
   */

  checkTitle(title: string, name: string): boolean {
    if (title.includes(name)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @description Navigate to page based on the url type
   * @returns void
   */
  async navigateToPage(subpage, pagename, url) {
    if (url && url.includes('https')) {
      window.open(url, '_blank');
    } else if (
      (url && url === 'tabs/information-to-share') ||
      url === 'tabs/hotlines-and-critical-contacts' ||
      url === 'tabs/online-resources' ||
      url === 'tabs/treatment-locator'
    ) {
      this.router.navigate([url]);
    } else {
      const data = this.dataService.appData
        .find((item) => item.name === pagename)
        .children.find((item) => item.name === subpage);
      console.log('IndexPage -> navigateToPage -> data', data);
      if (data.children) {
        const slideData = await this.mergeData(data.children, data);
        this.utilService.slideData = slideData;
        this.router.navigate(['tabs/slides/1']);
      } else {
        this.utilService.slideData = [data];
        this.router.navigate(['tabs/slides/1']);
      }
    }
  }
  /**
   * @description Navigates to the item url
   * @param item Menu item
   * @param index index
   * @returns void
   */
  // navigate(item: any, index: number) {
  //   if (item.children) {
  //     this.mainMenu = false;
  //     this.isSubMenu = false;
  //     this.isExpandedMenu = true;
  //     this.subPageName = item.name;
  //     this.expandedMenu = item.children;
  //   } else {
  //     console.log('itme===>', item);
  //     if (item.url) {
  //       this.router.navigate([item.url]);
  //     } else {
  //       if (item.id) {
  //         console.log('s item', item);
  //         this.router.navigate(['/slides', this.subPageName.replace(/\ /g, '_'), item.id]);
  //       } else {
  //         // tslint:disable-next-line: max-line-length
  //         item.link === 'slideLink' ? this.router.navigate(['/slides', this.subPageName.replace(/\ /g, '_'), index + 1]) : this.router.navigate([item.link]);
  //       }
  //     }
  //   }
  // }

  /**
   * @description Navigates to the back page
   * @returns void
   */
  navigateBack(): void {
    this.navCtrl.back();
  }

  /**
   * @description Activates the sub menu item page
   * @returns void
   */
  activateSubPage(): void {
    this.isExpandedMenu = false;
    this.isSubMenu = true;
  }

  /**
   * @description Activates the main page
   * @returns void
   */
  activateMainPage(): void {
    this.isSubMenu = false;
    this.mainMenu = true;
  }

  search() {
    // console.log('in search==');
  }

  ionViewWillLeave() {
    console.log('View will leave');
    this.utilService.navigationAnimate();
  }
}
