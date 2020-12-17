import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async presentAlertPrompt(callback) {
    const alert = await this.alertController.create({
      header: 'Email',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Please enter email',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            callback(data);
            console.log('Confirm Cancel');
            // return false;
          },
        },
        {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            callback(data);
            // return data;
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertMysearches(callback) {
    const alert = await this.alertController.create({
      header: 'Add to My Searches',
      inputs: [
        {
          name: 'search',
          type: 'text',
          placeholder: 'Please enter search',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            callback(data);
            console.log('Confirm Cancel');
            // return false;
          },
        },
        {
          text: 'Save',
          handler: (data) => {
            console.log('Confirm Ok', data);
            callback(data);
            // return data;
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'SAMHSA',
      message: 'You need to select value',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentSearchAlert(alertMessage) {
    const alert = await this.alertController.create({
      header: 'SAMHSA',
      message: alertMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentPhoneAlertPrompt() {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Enter Phone Number',
        inputs: [
          {
            name: 'number',
            type: 'number',
            placeholder: 'Please enter phone number',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (data) => {
              console.log('Confirm Cancel');
              resolve(false);
              // return false;
            },
          },
          {
            text: 'Ok',
            handler: (data) => {
              console.log('Confirm Ok', data);
              resolve(data);
              // return data;
            },
          },
        ],
      });

      await alert.present();
    });
  }

  async deleteSavedResultConfirmation() {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Delete',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (data) => {
              resolve(false);
              // return false;
            },
          },
          {
            text: 'Yes',
            handler: (data) => {
              console.log('Confirm Ok');
              resolve(true);
              // return data;
            },
          },
        ],
      });

      await alert.present();
    });
  }
}
