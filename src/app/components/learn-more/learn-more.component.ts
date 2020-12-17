import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from '../../services';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.scss'],
})
export class LearnMoreComponent implements OnInit {
  storageData = [];
  constructor(private modalController: ModalController, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.getData();
  }
  /**
   * @description Closes the more info modal
   * @returns void
   */
  close(): void {
    this.modalController.dismiss();
  }

  /**
   * @description This function is use to get data from local storage.
   */
  async getData() {
    const keysData = await this.localStorageService.keys();
    console.log('MysearchComponent -> getData -> keysData', keysData);
    const storageInfo = [];
    if (keysData.length > 0) {
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
}
