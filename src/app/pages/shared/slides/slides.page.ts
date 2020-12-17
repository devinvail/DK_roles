import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UtilService } from 'src/app/services/util.service';
import { SocialShareService } from 'src/app/services/socialshare.service';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit, OnDestroy {
  /**
   * Property decorator for slides
   */
  @ViewChild('slides', { static: true }) slides: IonSlides;

  @Input() showBackButton: boolean = true;

  // Variable to stor the active slide number
  activeSlide: number = 0;

  // Array to store the page menu data
  contents: any[] = [];

  // Variable to store the slide change subscription
  slideSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private utilService: UtilService,
    private navCtrl: NavController,
    private socialShare: SocialShareService
  ) {}

  ngOnInit() {
    /**
     * Subscribing the slide change to detect the slide change and change the pagination bullets
     */
    this.slideSubscription = this.slides.ionSlideDidChange.subscribe(async (data) => {
      this.activeSlide = await this.slides.getActiveIndex();
    });
    this.route.paramMap.subscribe(async (result: any) => {
      if (this.utilService.slideData.length > 0) {
        this.contents = await this.formatData(this.utilService.slideData);
        this.setActiveSlide(result.params.active);
      }
    });
  }

  formatData(content: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let data = [];
      content.forEach((item, index) => {
        item.children ? (data = [...data, ...item.children]) : data.push(item);
        content.length === index + 1 ? resolve(data) : null;
      });
    });
  }

  navigateBack() {
    this.navCtrl.back();
  }

  /**
   * @description Sets the active slide
   * @param slideNumber Active slide number
   * @returns void
   */
  setActiveSlide(slideNumber) {
    this.activeSlide = slideNumber - 1;
    this.slides.slideTo(slideNumber - 1);
  }

  /**
   * @description Unsubscribe the event on component destroy
   * @returns void
   */
  ngOnDestroy() {
    this.slideSubscription.unsubscribe();
  }

  async share() {
    const content = this.contents[this.activeSlide];
    let text = '';
    text += this.utilService.socialShareSubject + '<br>';
    text += content.html.title + '<br>';
    text += content.html.content + '<br>';
    text += content.html.excerpted_from + '<br>';
    text += 'RELATED RESOURCES' + '&nbsp;' + content.html.related_resources + '<br>';
    text = await this.utilService.htmlToText(text);
    // console.log("text==>", text);
    this.socialShare.share(text, this.utilService.socialShareSubject);
    // this.utilService.share(this.utilService.htmlToText(text));
  }

  ionViewWillLeave() {
    console.log('View will leave');
    this.utilService.navigationAnimate();
  }
}
