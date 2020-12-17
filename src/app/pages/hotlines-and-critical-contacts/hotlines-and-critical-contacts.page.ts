import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

import { SocialShareService, UtilService, AlertService } from "src/app/services";
import { GetDataService } from "src/app/services/getdata";

@Component({
  selector: "app-hotlines-and-critical-contacts",
  templateUrl: "./hotlines-and-critical-contacts.page.html",
  styleUrls: ["./hotlines-and-critical-contacts.page.scss"],
})
export class HotlinesAndCriticalContactsPage implements OnInit {
  // Variable to store the page data
  data: any[] = [];

  // Flag to toggle all checkbox
  checkAll: boolean = false;

  // Variable to store the page name
  pageName = "Hotlines and Critical Contacts";

  constructor(private utilService: UtilService, private route: ActivatedRoute, private navCtrl: NavController, private socialShare: SocialShareService, private alertService: AlertService, private dataService: GetDataService) {}

  ngOnInit() {
    // Gets the data from JSON file using the page name
    // this.data = this.addCheckProperty(jsonContent['default'][this.pageName]);
    const parentPageName = "On-the-Ground Assistance";
    this.data = this.dataService.appData.find((item) => item.name === parentPageName).children.find((item) => item.name === this.pageName).html;
    this.data = this.addCheckProperty(this.data);
    this.route.queryParams.subscribe((result: any) => {
      console.log(result.parentName);

      if (result.parentName) {
        // this.pageName = result.parentName + ' - ' + this.pageName;
      }
    });
  }

  /**
   * @description Toggle all the checkboxes
   * @returns void
   */

  toggleAll(e): void {
    if (e.currentTarget.checked) {
      this.checkAll = true;
    } else {
      this.checkAll = false;
    }
    this.data = this.data.map((item) => {
      item.checked = this.checkAll;
      return item;
    });
  }

  /**
   * @description Add the check property to bind with the checkbox
   * @param data Page data
   * @returns void
   */

  addCheckProperty(data) {
    return data.map((item, index) => {
      item.id = index + 1;
      item.checked = false;
      return item;
    });
  }

  /**
   *  @description Check if there are checked items
   *  @returns boolean
   */

  isItemSelected() {
    return this.data.some((i) => i.checked === true);
  }

  /**
   * @description Use to share page data via social share
   * @returns void
   */

  async share(): Promise<void> {
    if (this.isItemSelected()) {
      let text = await this.convertDataToString(this.data);
      let pagedata = this.utilService.socialShareSubject + "\n" + this.pageName + "\n" + text;
      this.socialShare.share(pagedata, this.utilService.socialShareSubject);
    } else {
      this.alertService.presentAlert();
    }
  }

  /**
   *  @description converts data to string
   *  @returns void
   */

  convertDataToString(data): Promise<String> {
    return new Promise((resolve, reject) => {
      let string = "",
        itemNum = 1;
      data.forEach((item, index) => {
        if (item.checked) {
          let text = `${itemNum} ${item.title} ${item.number}\n`;
          string += text;
          itemNum += 1;
        }
        if (data.length === index + 1) {
          resolve(string);
        }
      });
    });
  }

  /**
   *  @description navigating back
   *  @returns void
   */
  navigateBack() {
    this.navCtrl.back();
  }

  getValue(e, item) {
    this.data = this.data.map((i) => {
      i.id === item.id ? (i.checked = e.detail.checked) : null;
      return i;
    });

    this.checkAll = this.data.every((i) => i.checked === true);
  }

  ionViewWillLeave() {
    console.log("View will leave");
    this.utilService.navigationAnimate();
  }
}
