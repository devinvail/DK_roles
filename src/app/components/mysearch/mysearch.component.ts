import { Component, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { LocalStorageService, AlertService } from '../../services';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mysearch',
  templateUrl: './mysearch.component.html',
  styleUrls: ['./mysearch.component.scss'],
})
export class MysearchComponent implements AfterViewInit {
  storageData = [];
  public dataFlag = false;
  @Input() tabPage?: boolean;
  @Input() segmentPage?: boolean;
  @Output() loadSegment?: EventEmitter<any> = new EventEmitter();
  @Output() closeModal?: EventEmitter<any> = new EventEmitter();
  @Output() navigateToMap?: EventEmitter<any> = new EventEmitter();
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private loader: LoaderService,
    private alertService: AlertService
  ) {}

  ngAfterViewInit() {
    this.getData();
  }

  /**
   * @description This function is use to get data from local storage.
   */
  async getData() {
    const keysData = await this.localStorageService.keys();
    console.log('MysearchComponent -> getData -> keysData', keysData);
    const storageInfo = [];
    if (keysData.length > 0) {
      this.dataFlag = true;
      for (let i = 0; i < keysData.length; i++) {
        this.localStorageService.getObject(keysData[i]).then((keyvalue) => {
          keyvalue.localKey = keysData[i];
          storageInfo.push(keyvalue);
        });
        if (i === keysData.length - 1) {
          this.storageData = storageInfo;
        }
      }
    }
  }
  /**
   * @description Open Treatmeant locator page
   * @param data
   */
  openPage(data: any) {
    console.log('MysearchComponent -> openPage -> data', data);
    console.log(this.tabPage);
    this.closeModal.emit(true);
    this.loader.present();
    if (this.segmentPage) {
      console.log('Emitting segment page data');
      this.loadSegment.emit(data);
      return;
    }
    // this.modalController.dismiss();
    if (!this.tabPage) {
      this.loadSegment.emit(data);
    } else {
      this.router.navigate(['tabs/treatment-locator', { data: data.localKey }]);
    }
  }

  navigateToMapPage() {
    this.closeModal.emit(true);

    if (this.segmentPage) {
      this.navigateToMap.emit(true);
    } else {
      this.router.navigate(['tabs/treatment-locator']);
    }
  }

  async deleteRecord(data) {
    console.log('deleteRecord data:', data);
    const confirmation = await this.alertService.deleteSavedResultConfirmation();
    if (confirmation) {
      await this.localStorageService.removeObject('shsa_' + data.keyname.toLowerCase().replace(/ /g, '_'));
      this.storageData = this.storageData.filter((item) => item.keyname !== data.keyname);
    }
  }

  getAdditionalFacilityType(filterData) {
    let additionalFacility = '';
    if (filterData.includeHRSA === 1) {
      additionalFacility = 'Health Care Center';
    }

    if (filterData.includeBupren === 1) {
      additionalFacility += additionalFacility.length > 0 ? ', Buprenorphine Practitioners' : 'Buprenorphine Practitioners';
    }

    if (additionalFacility.length === 0) {
      additionalFacility = 'None';
    }

    return additionalFacility;
  }
}
