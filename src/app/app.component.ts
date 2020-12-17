import { Component, OnInit, NgZone } from "@angular/core";
import { Platform, MenuController, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { Plugins } from "@capacitor/core";
import { LearnMoreComponent } from "./components/learn-more/learn-more.component";
const { Network } = Plugins;
import { UtilService } from "src/app/services";
import { UserPromptService } from "./services/user-prompt.service";
import { AuthService } from "./services/auth.service";
import { SettingsService } from "./services/settings.service";
import { take, map, tap, delay, switchMap } from "rxjs/operators";
// import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  messageFlag = false;
  userId: string;
  public appPages = [
    {
      title: "Home",
      url: "/tabs/home",
      icon: "home",
    },
    {
      title: "About",
      url: "/tabs/about",
      icon: "information-circle",
    },
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menuController: MenuController,
    private modalController: ModalController,
    public zone: NgZone,
    private utilService: UtilService,
    private userPromptService: UserPromptService,
    private authService: AuthService,
    private settingsService: SettingsService
  ) {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    toggleDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

    // Add or remove the "dark" class based on if the media query matches
    function toggleDarkTheme(shouldAdd) {
      document.body.classList.toggle("dark", shouldAdd);
    }
    this.initializeApp();
  }

  async ngOnInit() {
    await this.menuController.enable(true, "main");
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleLightContent();
      this.checkNetworkListerner();
      this.splashScreen.hide();
      await this.menuController.enable(true, "main");
      this.userPromptService.checkForUpdates();

      this.getUserSettings();
    });
  }

  getUserSettings() {
    // this.userId = this.authService.userId;
    // this.settingsService.fetchRole(this.userId).pipe(
    //   map((res) => {
    //     console.log("data in AC: ", res);
    //   })
    // );
  }
  /**
   * @description This function is monitoring network status changes and show/hide the oflline message with respect to newtwork changes.
   */
  async checkNetworkListerner() {
    console.log("checkNetworkListerner");
    if (!(await this.checkInternet())) {
      this.messageFlag = true;
    }
    Network.addListener("networkStatusChange", (status) => {
      console.log("Network status changed", status);
      this.zone.run(() => {
        if (status.connected) {
          this.messageFlag = false;
        } else {
          this.messageFlag = true;
        }
      });
    });
  }

  /**
   * @description Get the current network status
   */
  async checkInternet() {
    const status = await Network.getStatus();
    return status.connected;
  }

  /**
   * @description Presents the show learn more modal
   * @returns Promise<void>
   */
  async showLearnMoreModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: LearnMoreComponent,
      componentProps: {},
      animated: true,
      mode: "ios",
    });
    return await modal.present();
  }
}
