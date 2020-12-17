import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AInANLanguages, otherLanguages, services } from '../data';
import { ServicesFilterComponent } from '../services-filter/services-filter.component';
import { AlertService, LocalStorageService } from '../../../services';

@Component({
  selector: 'app-facility-filter',
  templateUrl: './facility-filter.component.html',
  styleUrls: ['./facility-filter.component.scss'],
})
export class FacilityFilterComponent implements OnInit {
  @Input() selectedFilter: any;
  @Input() searchLatLong: any;
  @Input() data: any;
  @Input() cityname: any;
  @Input() address: any;
  @ViewChild('sLanguages2', { static: true }) sLanguages2: IonicSelectableComponent;
  @ViewChild('sLanguages3', { static: true }) sLanguages3: IonicSelectableComponent;
  @ViewChild('sLanguages1', { static: true }) sLanguages1: IonicSelectableComponent;
  filter = {
    sType: 'SA',
    sCodes: 'none',
    includeHRSA: 0,
    includeBupren: 0,
    selectedDistance: '0',
    customDistance: 0,
    sLanguages1: [],
    sLanguages2: [],
    sLanguages3: [],
    serviceFilter: [],
  };
  distance = ['5', '10', '15', '20'];
  languageService = [
    {
      name: 'Services for the deaf and hard of hearing',
      value: 'AH',
    },
  ];

  AInANLanguages: any;
  otherLanguages = otherLanguages;
  sLanguages2Length = 12;
  sLanguages3Length = 12;

  constructor(
    private modalController: ModalController,
    private zone: NgZone,
    private alertService: AlertService,
    private localstorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.AInANLanguages = AInANLanguages;
    this.otherLanguages.map((item) => {
      this.AInANLanguages.push(item);
    });
    this.AInANLanguages.sort();
    console.log('FacilityFilterComponent -> ngOnInit -> otherLanguages', otherLanguages);
    // this.AInANLanguages.console.log('Services', services);
    if (this.selectedFilter && this.data.length > 0) {
      this.filter = this.selectedFilter;
    } else {
    }

    console.log(this.searchLatLong, this.filter);
  }

  /**
   * Reset the applied filter
   */
  resetFilter(): void {
    this.filter = {
      sType: 'SA',
      sCodes: 'none',
      includeHRSA: 0,
      includeBupren: 0,
      selectedDistance: '0',
      customDistance: 0,
      sLanguages1: [],
      sLanguages2: [],
      sLanguages3: [],
      serviceFilter: [],
    };
  }

  /**
   * @description Closes the more info modal
   * @returns void
   */
  close(): void {
    this.modalController.dismiss();
  }

  updateStype(value: string) {
    this.filter.sType = value;
  }
  /**
   * Toggle the services shortcuts list
   */
  toggleServiceShortcuts() {
    this.filter.sCodes = this.filter.sCodes === 'VAMC' ? 'none' : 'VAMC';
  }
  /**
   * Toggle the Additional facility list
   * @param key
   */
  toggleAdditionalFacility(key: string) {
    this.filter[key] = this.filter[key] === 1 ? 0 : 1;
  }

  applyFilter() {
    this.modalController.dismiss(this.filter);
  }

  selectDistance(value) {
    this.filter.selectedDistance = this.filter.selectedDistance === value ? '0' : value;
  }

  toggleS2All(event) {
    if (event.item.value === 'all') {
      event.isSelected ? this.sLanguages2.toggleItems(true) : this.sLanguages2.toggleItems(false);
    }
  }

  selectsLanguages1() {
    this.sLanguages1.confirm();
    this.sLanguages1.close();
  }

  selectsLanguages2() {
    this.sLanguages2.confirm();
    this.sLanguages2.close();
  }

  selectsLanguages3() {
    this.sLanguages3.confirm();
    this.sLanguages3.close();
  }

  toggleS3All(event) {
    if (event.item.value === 'all') {
      event.isSelected ? this.sLanguages3.toggleItems(true) : this.sLanguages3.toggleItems(false);
    }
  }

  deleteS1Language(key, value) {
    this.filter[key] = this.filter[key].filter((language) => language.value !== value);
  }

  showAllS3Language() {
    this.filter.sLanguages3.length === this.sLanguages3Length
      ? (this.sLanguages3Length = 12)
      : (this.sLanguages3Length = this.filter.sLanguages3.length);
  }
  /**
   * Adding the Lauguanges from the list.
   */
  addLanguages() {
    console.log('FacilityFilterComponent -> addLanguages -> this.filter.serviceFilter', this.filter.serviceFilter);
    this.filter.serviceFilter.forEach((item) => {
      switch (item.id) {
        case 12:
          item.data.forEach((element) => {
            if (!this.filter.sLanguages1.some((e) => e.value === element.value)) {
              this.filter.sLanguages1.push(element);
            }
          });
          break;
        case 13:
          item.data.forEach((element) => {
            if (!this.filter.sLanguages2.some((e) => e.value === element.value)) {
              this.filter.sLanguages2.push(element);
            }
          });
          break;
        case 14:
          item.data.forEach((element) => {
            if (!this.filter.sLanguages3.some((e) => e.value === element.value)) {
              this.filter.sLanguages3.push(element);
            }
          });
          break;
      }
    });
  }
  /**
   * Display the Services Filter Modal
   */
  async showServicesFilter(): Promise<void> {
    const modal = await this.modalController.create({
      component: ServicesFilterComponent,
      componentProps: {
        serviceFilter: this.filter.serviceFilter,
        sType: this.filter.sType,
      },
      animated: true,
      mode: 'ios',
    });
    modal.onDidDismiss().then((result) => {
      console.log('FacilityFilterComponent -> result', result);
      if (result.data) {
        this.filter.serviceFilter = result.data;
        console.log(this.filter);
        this.addLanguages();
      }
    });
    return await modal.present();
  }

  /**
   * @description This alert box is use to save searches in local storage
   */
  async presentSearchAlert() {
    if (this.address.length > 0) {
      await this.alertService.presentAlertMysearches((key) => {
        if (key.search) {
          const keyName = key.search;
          key = key.search.replace(/ /g, '_');
          key = key.toLowerCase();
          const saveData = {
            keyname: keyName,
            lat: this.searchLatLong.latitude,
            long: this.searchLatLong.longitude,
            cityname: this.cityname,
            address: this.address,
            data: this.data,
            filter: this.filter,
          };
          this.localstorage.setObject('shsa_' + key, saveData);
          this.alertService.presentSearchAlert('Your Search Is Saved');
        } else {
          this.alertService.presentSearchAlert('Please Enter Search Name');
        }
      });
    } else {
      this.alertService.presentSearchAlert('No results. Please try a different location.');
    }
  }
}
