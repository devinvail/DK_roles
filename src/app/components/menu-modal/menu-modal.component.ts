import { Component, OnInit } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      name: 'Preparing to Deploy',
      children: [
        {
          name: 'Readiness Refresher',
          children: [
            {
              name: 'Behavioral Health Responder',
              children: [
                {
                  name: 'Psychological First Aid',
                  link: 'slideLink'
                },
                {
                  name: 'Suicide Prevention and Intervention',
                  link: 'slideLink'
                },
                {
                  name: 'Disaster Counseling Refresher',
                  link: 'slideLink'
                },

                {
                  name: 'Cultural Competence Special Populations',
                  link: null,
                  children: [
                    {
                      name: 'General Cultural Competence',
                      link: 'slideLink'
                    },
                    {
                      name: 'American Indians/Alaska Natives',
                      link: 'slideLink'
                    }
                  ]
                },
                {
                  name: 'Responding to Specific Incidents',
                  link: null,
                  children: [
                    {
                      name: 'Infectious Diseases',
                      link: 'slideLink'
                    },
                    {
                      name: 'Terrorism',
                      link: 'slideLink'
                    }
                  ]
                },
                {
                  name: 'Stress Prevention & Management',
                  link: 'slideLink'
                }
              ]
            },
            {
              name: 'Supervisor of Behavioral Health Responder',
              children: [
                {
                  name: 'Stress Prevention & Management',
                  link: 'slideLink'
                },
                {
                  name: 'Terrorism: Prepare to Respond',
                  link: 'slideLink'
                },

                {
                  name: 'Cultural Competence & Special Populations',
                  link: null,
                  children: [
                    {
                      name: 'General Cultural Competence',
                      link: 'slideLink'
                    },

                    {
                      name: 'American Indians/Alaska Natives',
                      link: 'slideLink'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'Find Treatment Locations',
          link: 'https://findtreatment.samhsa.gov/'
        }
      ],
      isOpen: false
    },
    {
      name: 'On-the-Ground Assistance',
      children: [
        {
          name: 'Behaviors and Interventions',
          children: [
            {
              name: 'Problem Solving with Survivors',
              link: 'slideLink'
            },

            {
              name: 'Disaster Reactions & Interventions',
              link: null,
              children: [
                {
                  name: 'Ages 1-5',
                  link: 'slideLink'
                },
                {
                  name: 'Ages 6-11',
                  link: 'slideLink'
                },
                {
                  name: 'Ages 12-18',
                  link: 'slideLink'
                },
                {
                  name: 'Adults',
                  link: 'slideLink'
                },
                {
                  name: 'Older Adults',
                  link: 'slideLink'
                }
              ]
            },
            {
              name: 'Cultural Competence',
              link: null,
              children: [
                {
                  name: 'Sensitivity Checklist',
                  link: 'slideLink'
                },
                {
                  name: 'Use of Interpreters',
                  link: 'slideLink'
                }
              ]
            },
            {
              name: 'Substance Abuse Indicators',
              link: 'slideLink'
            }
          ]
        },
        {
          name: 'Information to Share with Surviviors',
          link: '/information-to-share'
        },
        {
          name: 'Hotlines and Critical Contacts',
          link: '/hotlines-and-critical-contacts'
        },
        {
          name: 'SAMHSA Treatment Locator',
          link: 'slideLink'
        },
        {
          name: 'Online Resources',
          link: '/online-resources'
        },
        {
          name: 'Publications Directory',
          link: 'slideLink'
        },
        {
          name: 'Stress Prevention and Management',
          children: [
            {
              name: 'Behavioral Health Responder',
              link: 'slideLink'
            },
            {
              name: 'Supervisor of Behavioral Health Responder',
              link: 'slideLink'
            }
          ]
        }
      ],
      isOpen: false
    },
    {
      name: 'Postdeployment Guide',
      children: [
        {
          name: 'Tips for Supporting Re-entry',
          children: [
            {
              name: 'Responder',
              link: 'slideLink'
            },
            {
              name: 'Supervisor',
              link: 'slideLink'
            },
            {
              name: 'Family',
              link: 'slideLink'
            }
          ]
        },
        {
          name: 'Professional Development',
          link: 'slideLink'
        }
      ],
      isOpen: false
    },
    {
      name: 'About',
      link: '/about'
    },
    {
      name: 'Help',
      link: '/help'
    }
  ];

  mainMenu: boolean = true;
  isSubMenu: boolean = false;

  pageName: string = '';
  subPageName: string = '';
  isExpandedMenu: boolean = false;

  subMenu: any[] = [];
  expandedMenu: any[] = [];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private router: Router, private menuController: MenuController, public modalController: ModalController) {}

  async ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.name.toLowerCase() === path.toLowerCase());
    }
    this.menuController.enable(true, 'main-content');
  }

  navigateToPage(url: string, index: number): void {
    this.dismissModal();
    this.router.navigate([url]);
    this.selectedIndex = index;
    // this.menuController.close();
  }

  async toggleItem(item: any) {
    this.pageName = item.name;
    this.mainMenu = false;
    this.isSubMenu = true;
    this.subMenu = this.appPages.filter(i => i.name === item.name);
  }

  toggleSubItem(item: any, index: number, parentItemName: string) {
    if (item.children) {
      this.mainMenu = false;
      this.isSubMenu = false;
      this.isExpandedMenu = true;
      this.subPageName = item.name;
      this.expandedMenu = item.children;
    } else {
      item.link === 'slideLink' ? this.router.navigate(['/slides', parentItemName.replace(/\ /g, '_'), index + 1]) : this.router.navigate([item.link]);
      // this.menuController.toggle();
    }
  }

  navigate(item, index) {
    this.dismissModal();
    item.link === 'slideLink' ? this.router.navigate(['/slides', this.subPageName.replace(/\ /g, '_'), index + 1]) : this.router.navigate([item.link]);

    // this.menuController.toggle();
  }

  activateSubPage() {
    this.isExpandedMenu = false;
    this.isSubMenu = true;
  }

  activateMainPage() {
    this.isSubMenu = false;
    this.mainMenu = true;
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
