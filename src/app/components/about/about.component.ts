import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private utilService: UtilService) {}

  ngOnInit() {}
  ionViewWillLeave() {
    console.log('View will leave');
    this.utilService.navigationAnimate();
  }
}
