import { Injectable } from '@angular/core';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
import { SocialShareService } from './socialshare.service';
import { AlertService } from './alert.service';

// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
  providedIn: 'root',
})
export class ActionSheetService {
  constructor(private actionSheet: ActionSheet, private socialshareservice: SocialShareService, private alertservice: AlertService) {}

  /**
   * @description This function is used to open Action sheet
   * It provides the index value pressed by the user
   */

  openSheet(shareData) {
    let buttonLabels = ['Share via Facebook', 'Share via Twitter', 'Share via WhatsApp', 'Share via Email'];
    const options: ActionSheetOptions = {
      buttonLabels: buttonLabels,
      addDestructiveButtonWithLabel: 'Cancel',
      androidTheme: 5,
      destructiveButtonLast: true,
    };
    this.actionSheet.show(options).then(async (buttonIndex: number) => {
      console.log('Button pressed: ' + buttonIndex);
      switch (buttonIndex) {
        case 1:
          this.socialshareservice.shareViaFacebook('demo', 'demo', 'demo');
          break;
        case 2:
          this.socialshareservice.shareViaTwitter('demo', 'demo', 'demo');
          break;
        case 3:
          this.socialshareservice.shareViaWhatsApp('demo', 'demo', 'demo');
          break;
        case 4:
          let data: any = await this.alertservice.presentAlertPrompt((data) => {
            if (data) {
              let subject = "This information has been sent to you from SAMHSA's Behavioral Health Disaster Response App";
              let message = '';

              for (let i = 0; i < shareData.length; i++) {
                for (const property in shareData[i]) {
                  // console.log(i + `${property}: ${shareData[i][property]}`);
                  if (property == 'name') {
                    message += '<div>' + (i + 1) + '.&nbsp;&nbsp;' + `${shareData[i][property]}` + '';
                  } else {
                    // tslint:disable-next-line: max-line-length
                    message +=
                      '&nbsp;<a href="' + `${shareData[i][property]}` + '">&nbsp;' + `${shareData[i][property]}` + '&nbsp;</a></div><br>';
                  }
                }
                if (i == shareData.length - 1) {
                  console.log('message==>', message);
                  this.socialshareservice.shareViaEmail(message, subject, data);
                }
              }
            }
          });

          break;
      }
    });
  }
}
