import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { Http } from '@teamhive/capacitor-http';
import { Capacitor } from '@capacitor/core';
import { Http } from '@capacitor/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './localstorage.service';
import { resolve } from 'url';
import * as appData from '../../assets/app-data/app-data.json';
import { services } from '../pages/treatment-locator/data';

// const { Http } = Capacitor.Plugins;
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  public appData: any;
  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {}

  /**
   * @description Use to get place data with respect to place
   */
  getLocatorData(lat: number, long: number, filter?: any, pageNumber?: number) {
    console.log('GetDataService -> getLocatorData -> filter', filter);
    // Post initial params
    const body: any = {
      lat,
      long,
      pagesize: 100,
      sort: 0,
      page: pageNumber ? pageNumber : 1,
      sType: 'BOTH',
    };

    // Checks If there is filter then assign filter data to post params
    if (filter) {
      // Changes the sType params
      body.sType = filter.sType;

      // Appends sCode params for services shortcuts
      filter.sCodes !== 'none' ? (body.sCodes = filter.sCodes) : null;

      // Append Additional facility type params
      filter.includeHRSA === 1 ? (body.includeHRSA = 1) : null;
      filter.includeBupren === 1 ? (body.includeBupren = 1) : null;

      // Appends the selected distance params
      if (filter.selectedDistance !== '0') {
        // converting miles to meters and appends to params
        // tslint:disable-next-line: max-line-length
        body.limitValue =
          filter.selectedDistance === 'Custom' ? parseInt(filter.customDistance) * 1609.34 : parseInt(filter.selectedDistance) * 1609.34;
      }

      // Appends the Language services params
      if (filter.sLanguages1.length > 0) {
        body.sCodes ? (body.sCodes = body.sCodes + ', AH') : (body.sCodes = 'AH');
      }

      // Appends the American Indian and Alaskan native languages params
      if (filter.sLanguages2.length > 0) {
        body.sLanguages = filter.sLanguages2
          .filter((language) => language.value !== 'all')
          .map((language) => language.value)
          .toString();
      }

      // Appends the other languages params
      if (filter.sLanguages3.length > 0) {
        body.sLanguages = body.sLanguages
          ? body.sLanguages +
            ',' +
            filter.sLanguages3
              .filter((language) => language.value !== 'all')
              .map((language) => language.value)
              .toString()
          : filter.sLanguages3
              .filter((language) => language.value !== 'all')
              .map((language) => language.value)
              .toString();
      }

      // Appends the Services params
      if (filter.servicesCodes) {
        body.sCodes = body.sCodes ? `${body.sCodes}, ${filter.servicesCodes}` : filter.servicesCodes;
      }
    }
    console.log('GetDataService -> getLocatorData -> body', body);

    return this.httpClient.post(environment.STORE_LISTING_URL, body);
  }

  /**
   * Get app data
   */
  async getAppData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('https://vailinteractive.com/samhsa/app_data.php').subscribe(
        (data) => {
          this.appData = data;
          console.log('TCL -> : GetDataService -> constructor -> data', data);
          this.localStorageService.setObject('appData', data);
          resolve(true);
        },
        async (err) => {
          this.appData = (await this.localStorageService.getObject('appData')) || [];
          console.log('TCL -> : GetDataService -> constructor -> this.appData', this.appData);
          if (this.appData.length === 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  async setLocalDatafromJSONFile() {
    this.appData = appData['default'];
    return await this.localStorageService.setObject('appData', appData['default']);
  }

  async setServicesData() {
    const data = (await this.localStorageService.getObject('services')) || [];
    if (data.length === 0) {
      this.localStorageService.setObject('services', services);
    }
    return true;
  }

  getServicesData() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get('https://vailinteractive.com/samhsa/app_data.php', {
          params: { type: 'services' },
        })
        .subscribe(
          (data: any[]) => {
            data && data.length > 0
              ? this.localStorageService.setObject('services', data)
              : this.localStorageService.setObject('services', services);
            resolve(true);
          },
          (err) => {
            this.localStorageService.setObject('services', services);
            resolve(false);
          }
        );
    });
  }
}
