import { Component, OnInit, Input } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { UtilService } from 'src/app/services';

@Component({
  selector: 'app-slide-content',
  templateUrl: './slide-content.component.html',
  styleUrls: ['./slide-content.component.scss'],
})
export class SlideContentComponent implements OnInit {
  @Input() data;

  constructor(private utilService: UtilService) {
    window['slideConComp'] = this;
  }

  ngOnInit() {
    // console.log(this.data);
  }

  /**
   * @description Use to set Excerpted from data
   * @param xml Json Data of Excerpted from
   */
  getExcerptedFrom(xml: string): string {
    let excerptedFrom = '';
    const parser = new DOMParser();
    const xmlDoc: any = parser.parseFromString(xml, 'text/html');
    const length = xmlDoc.querySelectorAll('prev').length;
    const header = '<h4 style="margin-left: 0px;">EXCERPTED FROM:</h4>';
    excerptedFrom += header;
    for (let i = 0; i < length; i++) {
      let link = xmlDoc.getElementsByTagName('a')[i].href;
      let derivedLink = this.utilService.removeLinkExtra(link);
      excerptedFrom += `<prev onclick="window.slideConComp.openLink('${derivedLink} ')"> ${
        xmlDoc.getElementsByTagName('prev')[i].childNodes[0].nodeValue
      }<a>${xmlDoc.getElementsByTagName('a')[0].childNodes[0].nodeValue}</a></prev>`;
      excerptedFrom += '<br/>';
    }
    return excerptedFrom;
  }

  /**
   * @description Opens link in browser
   * @param link
   */

  async openLink(link: string) {
    console.log(link);
    link = link.trim();
    // link = link + '/';
    const { Browser } = Plugins;
    console.log('openLink:', link);
    await Browser.open({ url: link });
  }

  /**
   * @description Use to set Related resources data
   * @param xml string from Json Related resources
   */

  getRelatedResources(xml: string): string {
    const parser = new DOMParser();
    const xmlDoc: any = parser.parseFromString(xml, 'text/xml');
    const length = xmlDoc.querySelectorAll('title').length;
    let string = '';
    for (let i = 0; i < length; i++) {
      let title = xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue;
      let link = xmlDoc.getElementsByTagName('link')[i].childNodes[0].nodeValue;
      string += `<ul style="  border-bottom: 1px solid #5c7684;
      list-style-type: none !important;
      padding-left: 15px;
      padding-bottom: 15px;" onclick="window.slideConComp.openLink('${link}')"><h7><b>${title}</b></h7><br><li><a>${link}</a></li></ul>`;
    }
    return string;
  }

  /**
   * @description Use to set Further Reading data
   * @param xml
   */
  getFurtherReading(xml: string): string {
    // console.log(xml);
    let parser = new DOMParser();
    let xmlDoc: any = parser.parseFromString(xml, 'text/xml');
    const length = xmlDoc.querySelectorAll('link').length;
    let string = '';
    for (let i = 0; i < length; i++) {
      let title = xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue;
      let link = xmlDoc.getElementsByTagName('link')[i].childNodes[0].nodeValue;
      string += `<ul style="  border-bottom: 1px solid #5c7684;
      list-style-type: none !important;
      padding-left: 15px;
      padding-bottom: 15px;" onclick="window.slideConComp.openLink('${link}')"><h7><b>${title}</b></h7><br><li><a>${link}</a></li></ul>`;
    }

    return string;
  }
}
