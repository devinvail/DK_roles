import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss']
})
export class HelpPage implements OnInit {
  constructor(private utilService: UtilService) {}

  ngOnInit() {}
  ionViewWillLeave() {
    console.log('View will leave');
    this.utilService.navigationAnimate();
  }
}
