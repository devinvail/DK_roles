import { Component, OnInit } from "@angular/core";
import { DocumentViewer, DocumentViewerOptions } from "@ionic-native/document-viewer/ngx";
import { File } from "@ionic-native/file/ngx";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { NavController, Platform, AlertController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Plugins } from "@capacitor/core";

import { UtilService, SocialShareService, AlertService, ActionSheetService } from "src/app/services";
import { LoaderService } from "src/app/services/loader.service";
import { async } from "@angular/core/testing";
import { GetDataService } from "src/app/services/getdata";

declare let window: any;

@Component({
  selector: "app-online-resources",
  templateUrl: "./online-resources.page.html",
  styleUrls: ["./online-resources.page.scss"],
})
export class OnlineResourcesPage implements OnInit {
  data: any[] = [];
  checkAll: boolean = false;
  private fileTransfer: FileTransferObject;
  private downloadFile;
  private shareValue: any[] = [];
  information: any[] = [];
  pageName = "Online Resources";

  constructor(
    private transfer: FileTransfer,
    private route: ActivatedRoute,
    private document: DocumentViewer,
    private file: File,
    private socialShare: SocialShareService,
    private utilService: UtilService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private platform: Platform,
    private loaderService: LoaderService,
    private alertController: AlertController,
    private dataService: GetDataService
  ) {}

  async ngOnInit() {
    const parentPageName = "On-the-Ground Assistance";
    this.information = await this.dataService.appData;
    console.log("OnlineResourcesPage -> ngOnInit -> this.information", this.information);
    this.information = this.information.find((item) => item.name === parentPageName).children.find((item) => item.name === this.pageName).html;
    this.information = this.addCheckProperty(this.information);
  }

  /**
   * @description -Initialize JSON data
   */
  // getData() {
  //   this.information = this.addCheckProperty(jsondata['default'][this.pageName]);
  // }

  /**
   * @description -check URL and open the link
   */
  async openUrl(link, type, name) {
    if (type == "pdf") {
      // To download the PDF file
      this.checkIfPdfDownloaded(name + ".pdf", link);
      // this.download(name + ".pdf", link);
    } else {
      const { Browser } = Plugins;
      await Browser.open({ url: link });
    }
  }

  /**
   * Check if pdf is already downloaded or not, if downloaded then open that pdf otherwise download it
   * @param fileName - pdf file name
   * @param filePath - pdf file path
   */
  checkIfPdfDownloaded(fileName: string, filePath: string) {
    this.loaderService.present();
    fileName = fileName.split(" ").join("_");
    console.log("TCL -> : OnlineResourcesPage -> checkIfPdfDownloaded -> fileName", fileName);

    window.resolveLocalFileSystemURL(
      this.file.dataDirectory + fileName,
      (entry) => {
        console.log("TCL -> : OnlineResourcesPage -> checkIfPdfDownloaded -> entry", entry);
        this.openPdf(this.file.dataDirectory + fileName);
      },
      (error) => {
        console.log("TCL -> : OnlineResourcesPage -> checkIfPdfDownloaded -> error", error);
        this.download(fileName, filePath);
      }
    );
  }

  /**
   * Open the downloaded pdf
   * @param fileName
   */
  openPdf(fileName: string) {
    this.loaderService.dismiss();
    const options: DocumentViewerOptions = {
      title: "My PDF",
    };

    this.document.viewDocument(fileName, "application/pdf", options);
  }

  /**
   * @description - Download the pdf file from the URL
   * @param fileName - pdf file name
   * @param filePath - pdf file path
   */
  download(fileName: string, filePath: string) {
    const url = encodeURI(filePath);
    this.fileTransfer = this.transfer.create();
    const options: DocumentViewerOptions = {
      title: "My PDF",
    };

    this.fileTransfer
      .download(url, this.file.dataDirectory + fileName, true)
      .then((entry) => {
        // open downloaded file
        this.downloadFile = entry.toURL();
        this.openPdf(this.downloadFile);
      })
      .catch(async (error) => {
        //here logging an error.
        console.log("download failed: " + JSON.stringify(error));
        this.loaderService.dismiss();
        const alert = await this.alertController.create({
          header: "SAMHSA",
          message: "Internet Connection Not Available",
          buttons: ["OK"],
        });
        await alert.present();
      });
  }

  /**
   * @description Toggle all the checkboxes
   * @returns void
   */
  toggleAll(e): void {
    this.checkAll = !this.checkAll;
    this.information = this.information.map((item) => {
      item.children = this.checkChildren(item.children, this.checkAll);
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
  addCheckProperty(data) {
    return data.map((item, index) => {
      item.id = index + 1;
      // item. = false;
      item.children = this.addCheckPropertyToChildren(item.children);
      return item;
    });
  }

  /**
   * @description Adds the checked property to children data
   * @param data children data
   * @returns any[]
   */
  addCheckPropertyToChildren(data: any[]) {
    return data.map((d) => {
      d.checked = false;
      return d;
    });
  }

  /**
   *  @description Check checkbox status
   *  @returns void
   */

  getValue(e, item, child) {
    if (e.currentTarget.checked) {
      this.shareValue.push(item);
    } else {
      this.shareValue = [];
    }
  }

  /**
   *  @description navigating back
   *  @returns void
   */

  navigateBack() {
    this.navCtrl.back();
  }

  /**
   *  @description shares page info
   *  @returns void
   */

  async share(): Promise<void> {
    let data = [];
    if (this.shareValue.length == 0) {
      this.alertService.presentAlert();
    } else {
      const shareData = await this.getShareValue();
      const text = await this.convertDataToString(shareData);
      let pagedata = this.utilService.socialShareSubject + "\n" + this.pageName + "\n" + text;
      this.socialShare.share(pagedata, this.utilService.socialShareSubject);
    }
  }

  /**
   *  @description converts data to string
   *  @returns void
   */
  convertDataToString(data): Promise<string> {
    return new Promise((resolve, reject) => {
      let string = "";
      data.forEach((item, index) => {
        let text = `${index + 1} ${item.title} ${item.url} \n`;
        string += text;
        if (data.length === index + 1) {
          resolve(string);
        }
      });
    });
  }

  /**
   *  @description makes data in form of links and name
   *  @returns object
   */
  getShareValue(): Promise<object> {
    return new Promise((resolve, reject) => {
      const data = [];
      this.information.map((item, index) => {
        item.children.forEach((d, i) => {
          if (d.checked === true) {
            data.push({
              title: d.title,
              url: d.url,
            });
          }
          console.log(this.information.length === index + 1 && item.children.length === i + 1);
          if (this.information.length === index + 1 && item.children.length === i + 1) {
            resolve(data);
          }
        });
      });
    });
  }

  ionViewWillLeave() {
    console.log("View will leave");
    this.utilService.navigationAnimate();
  }
}
