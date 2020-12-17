import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  navigateBack() {
    this.modalController.dismiss();
  }
}
