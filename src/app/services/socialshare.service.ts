import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Subject } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class SocialShareService {
  constructor(private socialShare: SocialSharing, private emailComposer: EmailComposer, private alertService: AlertService) {}

  /**
   * @description - Share the Message with URL
   * @param message - message to be shared
   * @param subject - Subject for email
   * @param to - receipt address
   */
  shareViaEmail(emailmessage, emailsubject, to) {
    // this.socialShare.shareViaEmail(message, subject, to.email).then((data) => {
    //   console.log("shareViaEmail");
    // })
    // this.emailComposer.isAvailable().then((available: boolean) => {
    // console.log('available===>', available);
    // if (available) {
    const email = {
      to: to.email,
      attachments: [],
      subject: emailsubject,
      body: emailmessage,
      isHtml: true,
    };
    console.log('email composer: ', email);
    // Send a text message using default options
    this.emailComposer.open(email);
    // }
    // });
  }

  /**
   * @description - Share the Message with URL
   * @param message - message to be shared
   * @param image - image if any
   * @param url - Url to be shared
   */
  shareViaWhatsApp(message, image, url) {
    // this.socialShare.shareViaWhatsApp(message, image, url).then((data) => {
    console.log('shareViaWhatsApp');
    // })
  }

  /**
   * @description - Share the Message with URL
   * @param message - message to be shared
   * @param image - image if any
   * @param url - Url to be shared
   */
  shareViaFacebook(message, image, url) {
    // this.socialShare.shareViaFacebook(message, image, url).then((data) => {
    console.log('shareViaFacebook');

    // })
  }

  /**
   * @description - Share the Message with URL
   * @param message - message to be shared
   * @param image - image if any
   * @param url - Url to be shared
   */
  shareViaTwitter(message, image, url) {
    // this.socialShare.shareViaTwitter(message, image, url).then((data) => {
    console.log('shareViaTwitter');
    // })
  }

  /**
   * @description - Share the Message with URL
   * @param dataToShare - data to be shared
   * @param subject- subject to be send with data
   */
  share(dataToShare, subject) {
    this.socialShare.share(dataToShare, subject).then((response) => {
      console.log('response====>', response);
    });
  }

  /**
   * Share via SMS
   */
  async shareViaSMS(shareRecords: any) {
    const data: any = await this.alertService.presentPhoneAlertPrompt();

    this.socialShare.shareViaSMS(shareRecords, data.number).then((response) => {
      console.log('SocialShareService -> shareViaSMS -> response', response);
    });
  }
}
