import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss'],
})
export class MoreInfoComponent implements OnInit {
  // Array to store services data
  @Input() data: any[];
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  /**
   * @description Closes the more info modal
   * @returns void
   */
  close(): void {
    this.modalController.dismiss();
  }
}
