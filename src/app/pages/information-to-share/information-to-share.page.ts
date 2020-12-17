import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { UtilService, SocialShareService, AlertService } from "src/app/services";
import { GetDataService } from "src/app/services/getdata";

@Component({
  selector: "app-information-to-share",
  templateUrl: "./information-to-share.page.html",
  styleUrls: ["./information-to-share.page.scss"],
})
export class InformationToSharePage implements OnInit {
  // Array to store page data
  data: any[] = [];

  // Flag to check and uncheck all checkboxes
  checkAll: boolean = false;

  // Variable to store page name
  pageName = "Information to Share with Survivors";

  constructor(private router: Router, private navCtrl: NavController, private socialShare: SocialShareService, private utilService: UtilService, private alertService: AlertService, private dataService: GetDataService) {}

  ngOnInit() {
    // Parent menu name of Information to share page
    const parentPageName = "On-the-Ground Assistance";

    // Gets the Information to share page data using the parent page and current page name
    this.data = this.dataService.appData.find((item) => item.name === parentPageName).children.find((item) => item.name === this.pageName).html;

    // Add check property to each item to bind with the checkbox
    this.data = this.addCheckProperty(this.data);
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
   * @description Check true to the children items
   * @param children children items
   * @param status status of the checkbox
   * @returns any[];
   */
  checkChildren(children: any[], status: boolean): any[] {
    return children.map((d) => {
      d.checked = status;
      return d;
    });
  }

  /**
   * @description Add the check property to bind with the checkbox
   * @param data Page data
   * @returns void
   */

  addCheckProperty(data): any {
    return data.map((item, index) => {
      item.id = index + 1;
      item.checked = false;
      return item;
    });
  }

  /**
   *  @description Check checkbox status
   *  @returns void
   */

  getValue(e, item) {
    this.data = this.data.map((i) => {
      i.id === item.id ? (i.checked = e.detail.checked) : null;
      return i;
    });
    this.checkAll = this.data.every((i) => i.checked === true);
  }

  /**
   *  @description Check if there are checked items
   *  @returns boolean
   */

  isItemSelected(): boolean {
    return this.data.some((i) => i.checked === true);
  }

  /**
   * @description Use to share page data via social share
   * @returns void
   */

  async share(): Promise<void> {
    if (this.isItemSelected()) {
      let text = await this.convertDataToString(this.data);
      let pageData = this.utilService.socialShareSubject + "\n" + this.pageName + "\n" + text;
      this.socialShare.share(pageData, this.utilService.socialShareSubject);
    } else {
      this.alertService.presentAlert();
    }
  }

  /**
   *  @description converts data to string
   *  @returns void
   */

  convertDataToString(data): Promise<String> {
    console.log("data===>", data);
    return new Promise((resolve, reject) => {
      let string = "",
        itemNum = 1;
      data.forEach((item, index) => {
        if (item.checked) {
          let text = `${itemNum} ${item.title} \n`;
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

  /**
   * @description navigates to the slide page
   * @param link Page link
   * @returns void
   */

  navigateToSlide(link: string, index): void {
    this.utilService.slideData = this.formatData(this.data);
    this.router.navigate(["tabs/slides", index]);
  }

  formatData(data) {
    return data.map((item) => {
      return {
        name: item.title,
        html: item,
      };
    });
  }

  ionViewWillLeave() {
    console.log("View will leave");
    this.utilService.navigationAnimate();
  }
}
