import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationStateChange: Subject<boolean> = new Subject<boolean>();

  constructor(private diagnostic: Diagnostic, private alertController: AlertController) {
    const { Device } = Plugins;
    this.diagnostic.registerLocationStateChangeHandler(async (state) => {
      const info = await Device.getInfo();
      // tslint:disable-next-line: max-line-length
      if (
        (info.platform.toLowerCase() === 'android' && state !== this.diagnostic.locationMode.LOCATION_OFF) ||
        (info.platform.toLowerCase() === 'ios' &&
          (state === this.diagnostic.permissionStatus.GRANTED || state === this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE))
      ) {
        this.locationStateChange.next(true);
      }
    });
  }

  /**
   * Get user current location, also check if location is enabled and authorized
   */
  async getCurrentLocation() {
    const { Geolocation } = Plugins;
    return Geolocation.getCurrentPosition();
  }

  /**
   * Check if location is authorized or not
   */
  async isLocationAuthorized() {
    try {
      return await this.diagnostic.isLocationAuthorized();
    } catch (e) {
      console.log('Location Available Error');
    }
  }

  /**
   * Check if location is enabled or not
   */
  async isLocationAvailable() {
    try {
      return await this.diagnostic.isLocationEnabled();
    } catch (e) {
      console.log('Location Available Error');
    }
  }

  /**
   * Request location authorization
   */
  async requestLocationAuth() {
    try {
      const stauts = await this.diagnostic.requestLocationAuthorization();
      let currentStatus = 'not-allowed';
      switch (status) {
        case this.diagnostic.permissionStatus.GRANTED:
          currentStatus = 'allowed';
          break;
        case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
          currentStatus = 'allowed';
          break;
        case this.diagnostic.permissionStatus.DENIED_ONCE:
          this.showAlert('This feature requires location permission to be full functional');
          currentStatus = 'once';
          break;
        case this.diagnostic.permissionStatus.DENIED_ALWAYS:
          this.showAlert(
            'This feature requires location permission to be full functional. Please enable it from app settings on your device.'
          );
          currentStatus = 'denied';
          break;
      }
      return currentStatus;
    } catch (e) {
      console.log('Location Auth Error');
    }
  }
  /**
   * Get current location authoriztion status
   */
  async getCurrentAuthorizationStatus() {
    try {
      const status = await this.diagnostic.getLocationAuthorizationStatus();
      let currentStatus = 'not-allowed';
      switch (status) {
        case this.diagnostic.permissionStatus.GRANTED:
          currentStatus = 'allowed';
          break;
        case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
          currentStatus = 'allowed';
          break;
        case this.diagnostic.permissionStatus.DENIED_ONCE:
          this.showAlert('This feature requires location permission to be full functional');
          currentStatus = 'once';
          break;
        case this.diagnostic.permissionStatus.DENIED_ALWAYS:
          this.showAlert(
            'This feature requires location permission to be full functional. Please enable it from app settings on your device.'
          );
          currentStatus = 'denied';
          break;
      }
      return currentStatus;
    } catch (e) {
      console.log('Location auth get error');
    }
  }
  /**
   * Show the alert message if Location is disable
   * @param message - Message data
   */
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Location Required',
      message,
      buttons: ['Ok'],
    });

    await alert.present();
  }
  /**
   * Open the Location Settings page
   */
  openLocationSettingsPage() {
    this.diagnostic.switchToLocationSettings();
  }
  /**
   * Check the it is device or not.
   */
  async isDevice() {
    const { Device } = Plugins;
    const info = await Device.getInfo();
    console.log('info: ', info);
    // tslint:disable-next-line: max-line-length
    if (info && (info.platform.toLowerCase() === 'android' || info.platform.toLowerCase() === 'ios')) {
      return true;
    } else {
      return false;
    }
  }
}
