import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LocalStorageService } from '../../services';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.scss'],
})
export class SavedSearchesComponent implements OnInit {
  public StorageData;
  public dataFlag = false;
  @Input() loadSegment?: EventEmitter<any> = new EventEmitter();
  constructor(private localStorageService: LocalStorageService, private router: Router, private modalController: ModalController) {
    this.loadSegment.subscribe((data) => {
      console.log('data===>', data);
    });
  }

  ionViewWillEnter() {
    this.getData();
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * @description This function is use to get data from local storage.
   */
  async getData() {
    console.log('data==>');
    await this.localStorageService.keys().then((keysData) => {
      console.log('keysData==>', keysData);
      let storageInfo = [];
      if (keysData.length > 0) {
        this.dataFlag = true;
        for (let i = 0; i < keysData.length; i++) {
          this.localStorageService.getObject(keysData[i]).then((keyvalue) => {
            storageInfo.push(keyvalue);
          });
          if (i == keysData.length - 1) {
            console.log('storageInfo===>', storageInfo);
            this.StorageData = storageInfo;
          }
        }
      }
    });
  }

  /**
   * @description Open Treatmeant locator page
   * @param data
   */
  openPage(data: any) {
    this.router.navigate(['tabs/treatment-locator', data]);
  }

  // ionViewDidEnter() {
  //   console.log('here');
  //   this.getData();
  // }
}
