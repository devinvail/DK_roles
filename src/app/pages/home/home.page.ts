import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Plugins} from '@capacitor/core';
import {UtilService} from 'src/app/services/util.service';
import {HelpComponent} from 'src/app/components/help/help.component';
import {
  ModalController,
  AlertController,
  ActionSheetController,
} from '@ionic/angular';
import {GetDataService} from 'src/app/services/getdata';
import {LoaderService} from 'src/app/services/loader.service';
import {LocalStorageService} from 'src/app/services';
import {SettingsService} from 'src/app/services/settings.service';
import {AuthService} from 'src/app/services/auth.service';
import {HttpClient} from '@angular/common/http';

import {take, map, tap, delay, switchMap} from 'rxjs/operators';
import {pipe} from 'rxjs';
const {Network} = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  menus: any[] = [];
  userId = 'devinvail@gmail.com';
  role: string = 'supervisor';

  roleMenus = [
    {
      role: 'supervisor',
      menus: [
        'find treatment locations',
        'preparing to deploy',
        'on-the-ground assistance',
        'postdeployment guide',
      ],
    },
    {
      role: 'responder',
      menus: [
        'find treatment locations',
        'preparing to deploy',
        'on-the-ground assistance',
      ],
    },
    {
      role: 'survivor',
      menus: ['find treatment locations'],
    },
  ];

  constructor(
    public utilService: UtilService,
    private router: Router,
    private modalController: ModalController,
    private dataService: GetDataService,
    private alertController: AlertController,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService,
    private settingsService: SettingsService,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getData();
    this.getServicesData();

    this.userId = this.authService.userId;
    this.settingsService.fetchRole(this.userId);

    this.settingsService._role.subscribe((role) => {
      console.log('sub places in hone: ', role);
      this.role = role;
      if (this.menus.length > 0) {
        this.setMenu();
      }
    });
  }

  // addData(userId: string, role: string) {
  //   this.settingsService.addData(userId, role).then((role) => {
  //     console.log('role in home: ', role);
  //   });
  // }

  navigate(menu: any) {
    menu.children
      ? this.router.navigate(['/tabs/section', menu.linkParam])
      : this.router.navigate([menu.link]);
  }

  async getData() {
    this.loaderService.present();
    const status = await Network.getStatus();
    if (status.connected) {
      const data = await this.dataService.getAppData();
      console.log('TCL -> : AppComponent -> initializeApp -> data', data);

      if (!data) {
        await this.dataService.setLocalDatafromJSONFile();
        this.setMenu();
        this.loaderService.dismiss();
      } else {
        this.setMenu();
        this.loaderService.dismiss();
      }
    } else {
      const data = (await this.localStorageService.getObject('appData')) || [];
      if (data.length > 0) {
        this.dataService.appData = data;
        this.setMenu();
        this.loaderService.dismiss();
      } else {
        await this.dataService.setLocalDatafromJSONFile();
        this.setMenu();
        this.loaderService.dismiss();
      }
    }
  }

  async openPage() {
    // const modal = await this.modalController.create({
    //   component: HelpComponent,
    //   cssClass: "my-custom-class",
    //   animated: true,
    //   mode: "ios",
    // });
    // return await modal.present();

    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Supervisor',
            handler: () => {
              console.log('supervisor handler');
              this.chooseRole('supervisor');
            },
          },
          {
            text: 'Responder',
            handler: () => {
              console.log('responder handler');

              this.chooseRole('responder');
            },
          },
          {
            text: 'Survivor',
            handler: () => {
              console.log('survivor handler');

              this.chooseRole('survivor');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  chooseRole(role: string) {
    console.log(role);

    this.settingsService.updateRole(role, this.userId);
    console.log('Called');
    this.alertCtrl
      .create({
        header: 'Updating Role',
        message:
          'your role has been updated. app content will reflect this change.',
        buttons: [
          {
            text: 'ok',
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  async getServicesData() {
    const status = await Network.getStatus();
    if (status.connected) {
      const data = await this.dataService.getServicesData();
      console.log('HomePage -> getServicesData -> status', status);
    } else {
      this.dataService.setServicesData();
    }
  }

  async setMenu() {
    // const data = jsonContent["default"];
    // console.log("data==>", data);
    const menusToShow = this.roleMenus.find((list) => list.role === this.role);
    console.log(
      'TCL ->  ~ file: home.page.ts ~ line 195 ~ HomePage ~ setMenu ~ menusToShow',
      menusToShow
    );
    this.menus = await this.dataService.appData.filter((menu) => {
      if (menusToShow.menus.includes(menu.name.toLowerCase())) {
        return menu;
      }
    });

    console.log('HomePage -> setMenu -> this.menus', this.menus);
    // this.menus = data;
  }

  ionViewWillLeave() {
    console.log('View will leave');
    this.utilService.navigationAnimate();
  }

  // async retryGetData(alertMessage: string) {
  //   const alert = await this.alertController.create({
  //     header: 'SAMHSA',
  //     message: alertMessage,
  //     buttons: [
  //       {
  //         text: 'Exit',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (data) => {
  //           navigator['app'].exitApp();
  //         },
  //       },
  //       {
  //         text: 'Retry',
  //         handler: (data) => {
  //           this.getData();
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  async openHelpModal() {
    const modal = await this.modalController.create({
      component: HelpComponent,
      cssClass: 'my-custom-class',
      animated: true,
      mode: 'ios',
    });
    return await modal.present();
  }
}
