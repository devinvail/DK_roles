import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilService } from 'src/app/services';
// import {Slides} from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnInit {
  constructor(private utilService: UtilService) {}

  ngOnInit() {}

  ionViewWillLeave() {
    console.log('View will leave');
    this.utilService.navigationAnimate();
  }
}
