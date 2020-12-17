import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private alertService: AlertService) {}

  prefix = 'shsa_';
  /**
   * @description This function is use to set local storage data as object
   */
  /**
   * @description This function is use to set local storage data as object
   */
  async setObject(keyName: string, object: object) {
    await Storage.set({
      key: keyName,
      value: JSON.stringify(object),
    });
  }

  /**
   * @description This function is use to get local storage data
   */
  async getObject(keyName: string) {
    const ret = await Storage.get({ key: keyName });
    const values = JSON.parse(ret.value);
    return values;
  }

  /**
   * @description This function is use to remove local storage data
   */
  async removeObject(key: string) {
    console.log('removeObjct', key);
    return await Storage.remove({ key });
  }

  /**
   * @description This function is use to set single item to local storage
   */
  async setItem(key: string, value: string) {
    localStorage.setItem(this.prefix + key, value);
  }

  /**
   * @description This function is use to get single item from local storage data
   */
  async getItem(key: string) {
    return localStorage.getItem(key);
  }

  /**
   * @description This function is use to remove local storage data
   */

  async removeItem(key: string) {
    localStorage.remove(key);
  }

  /**
   * @description This function is use to get all the keys stored in database
   */
  async keys() {
    const { keys } = await Storage.keys();
    const data = keys.filter((key) => key.includes(this.prefix));
    return data;
  }
}
