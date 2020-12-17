import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading: boolean = false;
  constructor(private loaderController: LoadingController) {}

  /**
   * To display the loader when method is called
   * @param message custom message of the loader
   */
  async present(message?: string) {
    // this.isLoading = true;
    // this.loaderController
    //   .create({
    //     message: message ? message : await this.utilService.getTranslatedKeys('pleaseWait'),
    //     duration: 1000,
    //   })
    //   .then((spinner) => spinner.present());
    if (!this.isLoading) {
      this.isLoading = true;
      return await this.loaderController
        .create({
          spinner: 'crescent',
          cssClass: 'custom-loader',
        })
        .then((a) => {
          a.present().then(() => {
            if (!this.isLoading) {
              a.dismiss().then();
            }
          });
        });
    }
  }

  /**
   * To close the loader when the function is called
   */
  dismiss(): void {
    // this.isLoading = false;
    // this.loaderController.getTop().then((loader) => {
    //   if (loader) {
    //     loader.dismiss();
    //   }
    // });
    if (this.isLoading) {
      setTimeout(async () => {
        this.isLoading = false;
        const data = await this.loaderController.getTop();
        return data ? await this.loaderController.dismiss().then() : '';
      }, 500);
    }
  }
}
