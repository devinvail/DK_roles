import { Injectable } from '@angular/core';
// import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public slideData: any[] = [];

  /**
   * @description Flag to Toggle the sidebar/tab
   * @type {boolean}
   * @memberof UtilService
   */
  isSideMenu: boolean = false;
  socialShareSubject = "This information has been sent to you from SAMHSA's Behavioral Health Disaster Response App";

  constructor() {}

  share(data: any) {
    // this.socialSharing.share(data).then(result => {
    //   console.log("Result", result);
    // }).catch(error => {
    //   console.log("Error", error)
    // })
  }

  /**
   * @description - replace html data to text
   * @param html - html content data
   */
  htmlToText(html) {
    //remove code brakes and tabs
    html = html.replace(/\n/g, '');
    html = html.replace(/\t/g, '');

    //keep html brakes and tabs
    html = html.replace(/<\/td>/g, '\t');
    html = html.replace(/<\/table>/g, '\n');
    html = html.replace(/<\/tr>/g, '\n');
    html = html.replace(/<\/p>/g, '\n');
    html = html.replace(/<\/div>/g, '\n');
    html = html.replace(/<\/h>/g, '\n');
    html = html.replace(/<br>/g, '\n');
    html = html.replace(/<br( )*\/>/g, '\n');

    //parse html into text
    var dom = new DOMParser().parseFromString('<!doctype html><body>' + html, 'text/html');
    return dom.body.textContent;
  }

  /**
   * @description - Removes Appended title from html title when we move from other than index page.
   * @returns Promise
   */

  removeAppendedTitle(data: any) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
        this.removeChildrenTitle(data[i]).then((data) => {
          data[i] = data;
        });
      } else {
        data[i].html.title = this.getTitle(data[i].html.title);
      }
    }
  }

  /**
   * @description - Removes Appended title from html title.
   * @returns String
   */
  getTitle(title: string): string {
    return title.split('-').pop();
  }

  /**
   * @description - Removes Appended title from html title for children data.
   * @returns Promise
   */

  removeChildrenTitle(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < data.children.length; i++) {
        data.children[i].html.title = this.getTitle(data.children[i].html.title);
        if (i < data.length - 1) {
          resolve(data);
        }
      }
    });
  }

  /**
   * @description -Removes extra link from EXCERPTED FORM
   * @param link Link in href of JSON
   */

  removeLinkExtra(link: string): string {
    return link.split('?').shift();
  }

  navigationAnimate(back = 'left') {
    // console.log('Navigate animate', back);
    // const options: NativeTransitionOptions = {
    //   direction: back,
    //   duration: 200,
    //   slowdownfactor: 3,
    //   slidePixels: 20,
    //   iosdelay: 50,
    //   androiddelay: 50,
    //   fixedPixelsTop: 0,
    //   fixedPixelsBottom: 60
    // };
    // this.nativePageTransitions.slide(options);
  }
}
