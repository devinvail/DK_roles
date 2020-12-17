import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { SwUpdate } from "@angular/service-worker";
import { interval } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserPromptService {
  constructor(private alertCtrl: AlertController, private updates: SwUpdate) {
    console.log("UserPromptService -> constructor -> updates.isEnabled", updates.isEnabled);
    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate().then(() => console.log("checking for updates")));
      this.checkForUpdates();
    }
  }

  /**
   * Emits an UpdateAvailableEvent event whenever a new app version is available.
   */
  checkForUpdates() {
    console.log("function called");
    this.updates.available.subscribe((event) => {
      console.log("PromptUserService -> checkForUpdates -> event", event);
      this.promptUser();
    });
  }

  /**
   * Prompt user to ask if app needs to be updated to the latest app version or not.
   */
  async promptUser() {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Confirm!",
      message: "Do you need to check for updates?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: "Okay",
          handler: () => {
            this.updates.activateUpdate().then(() => document.location.reload());
          },
        },
      ],
    });

    await alert.present();
  }
}
