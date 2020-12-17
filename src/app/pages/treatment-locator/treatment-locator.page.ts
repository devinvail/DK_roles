import { Component, OnInit, NgZone, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, ModalController, IonContent, AlertController, IonInfiniteScroll } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Plugins } from '@capacitor/core';
import { Router, ActivatedRoute } from '@angular/router';
import { google } from 'google-maps';
declare let google: google;
const { Geolocation } = Plugins;
import { GetDataService } from '../../services/getdata';
import { LoaderService } from '../../services/loader.service';
import { LocationService } from '../../services/location.service';
import { MoreInfoComponent } from './more-info/more-info.component';
import { FacilityFilterComponent } from './facility-filter/facility-filter.component';
import { timer } from 'rxjs';
import { MysearchComponent } from 'src/app/components/mysearch/mysearch.component';
import { LocalStorageService, SocialShareService } from 'src/app/services';
import { CONFIG } from 'src/config/config';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
const { Network } = Plugins;

@Component({
  selector: 'app-treatment-locator',
  templateUrl: './treatment-locator.page.html',
  styleUrls: ['./treatment-locator.page.scss'],
})
export class TreatmentLocatorPage implements AfterViewInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('legend', { static: false }) legendElement: ElementRef;
  @ViewChild('content', { static: false }) content: IonContent;
  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;

  @Input() showBackButton: boolean = true;
  map: any;
  address: string;
  legendFlag: boolean = false;
  legendData: string = '';
  autocomplete: { input: string };
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocompleteItems: any[];
  location: any;
  cityName: string = 'No city searched yet'; //variable is use for localstorage of mysearches
  // placeid: any;
  mapFlag: boolean = true;
  facilityFlag: boolean = false;
  mySearchFlag: boolean = false;
  facilities = [];
  settingsPageTimer = null;
  public markers: any[] = [];
  userLocationMarker = null;
  offlineLoad = false;
  icons = {
    parking: {
      name: 'Substance Use',
      icon:
        // tslint:disable-next-line: max-line-length
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAi0lEQVR42mNgQIAoIF4NxGegdCCSHAMzEC+NMov6vzp99f8zVWfAdKBh4H+g+EyYorQ027T//2f+x8CxFrEghbEgRQcOFB/Aqmhv4V6Qor0gRQ8ftj/Equh2822QottEmxQLshubohCjEJCiEJjj54N8tzFrI9h36zLWwXw3jQENgMJpIzSc1iGHEwBt95qDejjnKAAAAABJRU5ErkJggg==',
    },
    library: {
      name: 'Mental Health',
      icon:
        // tslint:disable-next-line: max-line-length
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAi0lEQVR42mNgQIAoIF4NxGegdCCSHAMzEC+NijL7v3p1+v8zZ6rAdGCg4X+g+EyYorS0NNv////PxMCxsRYghbEgRQcOHCjGqmjv3kKQor0gRQ8fPmzHquj27WaQottEmxQLshubopAQI5CiEJjj54N8t3FjFth369ZlwHw3jQENgMJpIzSc1iGHEwB8p5qDBbsHtAAAAABJRU5ErkJggg==',
    },
    info: {
      name: 'Health Care Centers',
      icon:
        // tslint:disable-next-line: max-line-length
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAiElEQVR42mNgQIAoIF4NxGegdCCSHAMzEC81izL7n746/X/VmSowbRho+B8oPhOmKM02zfb/TCzQItYCpDAWpOhA8YFirIoK9xaCFO0FKXrY/rAdq6Lm280gRbeJNikWZDc2RUYhRiBFITDHzwf5LmtjFth3GesyYL6bxoAGQOG0ERpO65DDCQDX7ovT++K9KQAAAABJRU5ErkJggg==',
    },
    HRSA: {
      name: 'Buprenorphine Practitioners',
      icon:
        // tslint:disable-next-line: max-line-length
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAiklEQVR42mNgQIAoIF4NxGegdCCSHAMzEC81M4v6n56++n9V1RkwbWgY+B8oPhOmKM3WNu3/zJn/MbCFRSxIYSxI0YHi4gNYFRUW7gUp2gtS9LC9/SFWRc3Nt0GKbhNtUizIbmyKjIxCQIpCYI6fD/JdVtZGsO8yMtbBfDeNAQ2AwmkjNJzWIYcTAMk+i9OhipcQAAAAAElFTkSuQmCC',
    },
  };

  selectedSegment = 'map';
  geoCoder: google.maps.Geocoder;
  infoWindow: google.maps.InfoWindow;
  selectedCard: number;
  selectedLocation = {
    longitude: 0,
    latitude: 0,
  };
  searchLocation = {
    longitude: 0,
    latitude: 0,
  };
  selectedCircle;
  filter: any;
  page = {
    currentPage: 0,
    totalPages: 0,
    pageLimit: 100,
  };
  mySearchPageData = [];
  locationRequestCounter = 0;
  settingsPageOpened = false;
  infiniteScrollLoadingData = false;
  isConnection: boolean = true;
  constructor(
    public zone: NgZone,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private nativeGeocoder: NativeGeocoder,
    private getdataService: GetDataService,
    private loader: LoaderService,
    private locationService: LocationService,
    private alertController: AlertController,
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private router: Router,
    private socialShareService: SocialShareService,
    private actionSheet: ActionSheet
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geoCoder = new google.maps.Geocoder();
    this.infoWindow = new google.maps.InfoWindow();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    Window['myComponent'] = this;
    this.locationRequestCounter = 0;
    this.settingsPageOpened = false;

    this.locationService.locationStateChange.subscribe((state) => {
      console.log('state: treatment locator ', state);
      if (state) {
        this.initPage();
        this.settingsPageOpened = false;
      }
    });
    this.route.paramMap.subscribe(async (result: any) => {
      console.log('TreatmentLocatorPage -> result', result.params.data);
      if (result.params && result.params.data) {
        this.mySearchPageData = await this.localStorageService.getObject(result.params.data);
      }
    });
  }

  /**
   * Load Map and legend
   */
  initPage() {
    this.loadMap();
    this.legend();
  }

  async checkDeviceAndInitPage() {
    if (await this.locationService.isDevice()) {
      this.checkGeoLocationCurrentState();
    } else {
      this.initPage();
    }
  }

  async promptToLoadSavedSearchPage() {
    const alert = await this.alertController.create({
      header: 'SAMHSA',
      message: 'No internet connection. Do you want to load your saved searches?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            window.history.back();
          },
        },
        {
          text: 'Open',
          handler: () => {
            this.router.navigate(['/tabs/mysearches']);
          },
        },
      ],
    });

    await alert.present();
  }

  ngAfterViewInit() {
    this.connectionListener();
    setTimeout(async () => {
      console.log('this.mySearchPageData====.', this.mySearchPageData);
      if (this.mySearchPageData) {
        const length = Object.keys(this.mySearchPageData).length;
        if (length > 0) {
          this.loadSavedSearch(this.mySearchPageData);
        } else {
          if (await this.checkInternet()) {
            this.checkDeviceAndInitPage();
            this.offlineLoad = false;
          } else {
            this.offlineLoad = true;
            await this.promptToLoadSavedSearchPage();
          }
        }
      } else {
        if (await this.checkInternet()) {
          this.offlineLoad = false;
          this.checkDeviceAndInitPage();
        } else {
          this.offlineLoad = true;
          await this.promptToLoadSavedSearchPage();
        }
      }
    }, 600);
  }

  /**
   * Get geolocation and create map.
   */
  loadMap(): void {
    // FIRST GET THE LOCATION FROM THE DEVICE.
    // Geolocation.getCurrentPosition()
    this.locationService
      .getCurrentLocation()
      .then((resp) => {
        console.log(resp);
        this.createMap(resp.coords.latitude, resp.coords.longitude);
        // console.log(this.map.controls, this.map);
      })
      .catch((error) => {
        console.log('Error getting location', error);
        // load map with default latitude and longitude.
        this.createMap(39.1189051, -77.5524477);
      });
  }

  /**
   * Create Map with given latitude and longitude
   * @param latitude Latitude Number
   * @param longitude Longitude Number
   */
  createMap(latitude, longitude, searchPageData = null) {
    console.log('latitude====', latitude, longitude);
    const latLng = new google.maps.LatLng(latitude, longitude);
    console.log('latLng==>', latLng);
    // latlng for map position somewere in US
    const mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      zoomControl: true,
    };
    this.searchLocation.latitude = latitude;
    this.searchLocation.longitude = longitude;
    // console.log('====>', resp);
    // Get address from lat and long
    if (!this.map) {
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }

    // this.map.addListener('tilesloaded', () => {
    //   // console.log('accuracy', this.map, this.map.center.lat());
    //   this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());
    //   // this.lat = this.map.center.lat();
    //   // this.long = this.map.center.lng();
    // });
    console.log('getAddressFromCoords ' + latitude + ' ' + longitude);
    this.getAddressFromCoords(latitude, longitude, searchPageData);
    this.setCurrentLocation(latitude, longitude);
  }

  /**
   * @description Function use to obtain address from given Lat Long
   * @param lattitude
   * @param longitude
   */

  async getAddressFromCoords(lattitude, longitude, searchPageData = null) {
    console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
    this.loader.present();
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    if (searchPageData) {
      this.address = searchPageData.address;
      this.autocomplete.input = searchPageData.address;
      this.setData(searchPageData.lat, searchPageData.long, searchPageData.filter);
    } else {
      this.nativeGeocoder
        .reverseGeocode(lattitude, longitude, options)
        .then((result: NativeGeocoderResult[]) => {
          console.log('result===>', result);
          this.address = '';
          const responseAddress = [];
          for (const [key, value] of Object.entries(result[0])) {
            if (value.length > 0) {
              responseAddress.push(value);
            }
          }
          responseAddress.reverse();
          for (const value of responseAddress) {
            this.address += value + ', ';
          }
          this.address = this.address.slice(0, -2);
          console.log('this.address===>', this.address);
          this.autocomplete.input = this.address;
          if (searchPageData) {
            this.setData(lattitude, longitude, searchPageData.filter);
          } else {
            this.setData(lattitude, longitude);
          }
        })
        .catch((error: any) => {
          this.address = 'Address Not Available!';
          if (searchPageData) {
            this.autocomplete.input = searchPageData.cityName;
          }
          this.loader.dismiss();
        });
    }
  }

  /**
   * @description Function predicts the places.
   */

  updateSearchResults(): void {
    console.log(this.autocomplete.input);
    setTimeout(() => {
      if (this.autocomplete.input === '') {
        this.autocompleteItems = [];
        return;
      }
      this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input }, (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });

          console.log(this.autocompleteItems);
        });
      });
    }, 400);
  }

  navigateBack() {
    this.navCtrl.back();
  }

  /**
   * @description Function is use to get current cordinates and display data on map
   */
  getCords() {
    this.locationService.getCurrentLocation().then((data) => {
      this.setCurrentLocation(data.coords.latitude, data.coords.longitude);
      this.getAddressFromCoords(data.coords.latitude, data.coords.longitude);
    });
  }

  /**
   * @description Function is use to Search selected result
   * @param item
   */

  selectSearchResult(item) {
    console.log('item selectSearchResult: ', item);
    this.autocomplete.input = item.description;
    this.location = item;
    this.autocompleteItems = [];
    this.cityName = item.structured_formatting.secondary_text;
    this.address = item.description;
    this.geoCoder.geocode({ placeId: item.place_id }, (result, status) => {
      console.log(result, status);
      if (status === 'OK') {
        const location = result[0].geometry.location;
        this.searchLocation.latitude = location.lat();
        this.searchLocation.longitude = location.lng();
        this.setCurrentLocation(location.lat(), location.lng());
        this.setData(location.lat(), location.lng());
      }
    });
  }

  checkAddressWithZipCode() {
    const zipCodeTest = /^\d{4,5}/.test(this.autocomplete.input);
    this.autocompleteItems.forEach((item, index) => {
      if (zipCodeTest) {
        let addressData = item.types.indexOf('postal_code') !== -1 ? item : false;
        console.log('TCL -> : checkAddressWithZipCode -> addressData', addressData, index, !addressData);
        if (!addressData && index === 4) {
          addressData = this.autocompleteItems[0];
          console.log('TCL -> : checkAddressWithZipCode -> addressData', addressData);
          this.selectSearchResult(addressData);
          return;
        } else if (addressData) {
          this.selectSearchResult(addressData);
          return;
        }
      } else {
        this.selectSearchResult(this.autocompleteItems[0]);
      }
    });
  }

  setData(lat, lng, filter?: any, pageNumber?: number, infiniteScrollEvent = null) {
    this.map.setZoom(10);
    console.log('setData -> filter', filter);
    this.autocompleteItems = [];

    // tslint:disable-next-line: no-console
    console.trace('setData -> lat, lng', lat, lng);
    if (!infiniteScrollEvent) {
      this.loader.present();
    }

    this.getdataService.getLocatorData(lat, lng, filter, pageNumber).subscribe(
      (data: any) => {
        console.log('setData -> data', data);
        this.page.currentPage = data.page;
        this.page.totalPages = data.totalPages;
        if (data.rows.length !== 0) {
          this.loadData(data.rows, infiniteScrollEvent);
        } else {
          this.loader.dismiss();
        }
      },
      (error) => {
        console.log('Error while getting data', error);
        this.loader.dismiss();
      }
    );
  }

  loadData(data, infiniteScrollEvent = null) {
    this.zone.run(() => {
      // this.facilities = data;
      if (this.page.currentPage === 1) {
        this.facilities = data;
        this.content.scrollToTop();
      }
      console.log('this.page.currentPage', this.page.currentPage);
      for (let i = 0, len = data.length; i < len; i++) {
        this.addMarker(data[i].latitude, data[i].longitude, i, data[i]);
        if (this.page.currentPage !== 1) {
          this.facilities.push(data[i]);
        }
        if (i === len - 1) {
          if (infiniteScrollEvent) {
            this.infiniteScrollDataLoaded(infiniteScrollEvent);
          } else {
            this.loader.dismiss();
          }
        }
      }
    });
  }

  setCurrentLocation(lat, lng) {
    console.log('Set current location');
    console.log(lat, lng, this.map);
    this.selectedLocation.latitude = lat;
    this.selectedLocation.longitude = lng;
    const pos = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
    if (this.userLocationMarker) {
      this.userLocationMarker.setMap(null);
    }

    this.userLocationMarker = new google.maps.Marker({
      position: pos,
      map: this.map,
      title: 'Your position',
      icon: 'https://findtreatment.samhsa.gov/assets/images/green_start_arrow.png',
    });
    this.map.setCenter(pos);
  }

  /**
   * @description Function is use to open Link
   * @param link
   */

  async openLink(link: string) {
    link = link.trim();
    link = link + '/';
    const { Browser } = Plugins;
    await Browser.open({ url: link });
  }

  /**
   * @description Function is use to toggle legends
   */

  toggleLegend(): void {
    this.legendFlag = !this.legendFlag;
  }

  /**
   * @description This function is use to clear Autocomplete input
   */

  ClearAutocomplete(): void {
    this.autocompleteItems = [];
    this.autocomplete.input = '';
  }

  /**
   * @description Initialize the legend on map
   * @returns void
   */
  legend(): void {
    console.log('this.icons', this.icons);
    for (const key in this.icons) {
      if (key) {
        const type = this.icons[key];
        this.legendData += '<div><img src="' + type.icon + '"> ' + type.name + '</div>';
      }
    }
  }

  async connectionListener() {
    this.isConnection = await this.checkInternet();
    Network.addListener('networkStatusChange', (status) => {
      this.zone.run(() => {
        this.isConnection = status.connected;
      });
    });
  }

  async checkInternet() {
    const { Network } = Plugins;
    const status = await Network.getStatus();
    this.offlineLoad = !status.connected;
    console.log('TCL -> : checkInternet ->  this.offlineLoad', this.offlineLoad);
    return status.connected;
  }

  async loadSavedSearch(searchPageData: any) {
    console.log('loadSavedSearch -> searchPageData', searchPageData);
    this.loader.present();
    this.filter = searchPageData.filter;
    if (await this.checkInternet()) {
      this.createMap(parseFloat(searchPageData.lat), parseFloat(searchPageData.long), searchPageData);
      this.toggleTab('map');
      this.offlineLoad = false;
    } else {
      this.toggleTab('facility');

      this.loadData(searchPageData.data);
      this.offlineLoad = true;
    }
    this.legend();
  }

  /**
   * @description Function use to toggle segments
   * @param data
   */
  async toggleTab(data) {
    this.selectedSegment = data;
    console.log('TCL -> : toggleTab -> data', data);
    await this.checkInternet();
    if (data === 'map') {
      this.mapFlag = true;
      this.facilityFlag = false;
      this.mySearchFlag = false;
    } else if (data === 'facility') {
      this.mapFlag = false;
      this.facilityFlag = true;
      this.mySearchFlag = false;
    } else {
      this.mapFlag = false;
      this.facilityFlag = false;
      this.mySearchFlag = true;
    }
  }

  /**
   * @description Returns icon based on the facility type
   * @param facilityType Facility type
   * @returns string
   */
  getIcon(facilityType: string): string {
    switch (facilityType) {
      case 'SA':
        return this.icons.parking.icon;
      case 'MH':
        return this.icons.library.icon;
      case 'HRSA':
        return this.icons.info.icon;
      case 'BUPREN':
        return this.icons.HRSA.icon;
      default:
        break;
    }
  }

  /**
   * @description Opens links in Map
   * @param placeDetails Details of item.
   * @returns Promise<void>
   */
  async openDirection(placeDetails: any): Promise<void> {
    const direction = new google.maps.LatLng(placeDetails.latitude, placeDetails.longitude);

    this.locationService.getCurrentLocation().then(async (data) => {
      const latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      const link = 'https://www.google.com/maps/dir/?api=1&origin=' + latLng + '&destination=' + direction + '&travelmode=DRIVING';
      link.replace(/\ /g, '');
      window.open(link, '_system');
    });
  }

  /**
   * @description This function is use to Add Markers with info window
   * @param lat Marker latitude
   * @param lng Marker longitude
   * @param placeName Marker place name
   * @returns void
   */

  public addMarker(lat: number, lng: number, index: number, placeName?: any): void {
    // LatLang Instance for placing marker
    const latLng = new google.maps.LatLng(lat, lng);

    // Marker instance
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: this.getIcon(placeName.typeFacility),
      title: placeName.name1,
    });

    // Adding listener on marker to show info window
    google.maps.event.addListener(marker, 'click', () => {
      this.infoWindow.setContent(
        // tslint:disable-next-line: max-line-length
        `<h6 style="margin: 0px"> ${placeName.name1}</h6><div>${placeName.street1}</div><div>${placeName.city}, ${placeName.state}, ${placeName.zip}</div><div style="margin-bottom: 3px;">${placeName.phone}</div><a onclick="Window.myComponent.scrollToIndex(${index})">Show in list</a>`
      );
      this.infoWindow.open(this.map, marker);
    });

    this.markers.push(marker);
  }

  scrollToIndex(index) {
    console.log('scrollToIndex', index);
    this.scrollTo(index);
  }

  scrollTo(element: string) {
    this.toggleTab('facility');
    this.selectedCard = parseInt(element, 10);
    setTimeout(() => {
      const yOffset = document.getElementById(element).offsetTop;
      console.log('scrollTo -> yOffset', yOffset);
      this.content.scrollToPoint(0, yOffset, 500);
    }, 500);
  }

  // ngAfterViewInit() {
  //   this.content.getScrollElement().then((div) => {
  //     div.style.overflowY = 'scroll';
  //   });
  // }

  /**
   * @description Presents the show info modal
   * @param data Services data
   * @returns Promise<void>
   */
  async showMoreInfo(data: any[]): Promise<void> {
    const modal = await this.modalController.create({
      component: MoreInfoComponent,
      componentProps: {
        data,
      },
      animated: true,
      mode: 'ios',
    });
    return await modal.present();
  }

  /**
   * @description Presents the show faciltiy filter modal
   * @param data Services data
   * @returns Promise<void>
   */
  async showFacilityFilter(): Promise<void> {
    const modal = await this.modalController.create({
      component: FacilityFilterComponent,
      componentProps: {
        selectedFilter: this.filter,
        searchLatLong: this.searchLocation,
        data: this.facilities,
        cityname: this.cityName,
        address: this.address,
      },
      animated: true,
      mode: 'ios',
    });
    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        this.filter = result.data;
        if (this.filter.serviceFilter.length > 0) {
          this.filter.servicesCodes = await this.getServicesCodes(this.filter.serviceFilter);
          this.setData(this.selectedLocation.latitude, this.selectedLocation.longitude, this.filter);
        } else {
          this.setData(this.selectedLocation.latitude, this.selectedLocation.longitude, this.filter);
        }

        // if distance is present create circle otherwise remove it
        if (this.filter.selectedDistance !== '0') {
          this.setCircle(this.filter);
        } else {
          if (this.selectedCircle) {
            this.selectedCircle.setMap(null);
          }
        }
      }
    });
    return await modal.present();
  }

  getServicesCodes(servicesData: any[]) {
    return new Promise((resolve, reject) => {
      const items = servicesData.filter((item) => item.id !== 12 || item.id !== 13 || item.id !== 14).map((item) => item.data);

      let services = [];
      items.forEach((i, index) => {
        const d = i.map((item) => item.value);
        services = [...services, ...d];
        index + 1 === servicesData.length ? resolve(services.toString()) : null;
      });
    });
  }

  setCircle(filter) {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    if (this.selectedCircle) {
      this.selectedCircle.setMap(null);
    }

    console.log('Draw');
    const radius =
      filter.selectedDistance === 'Custom' ? parseInt(filter.customDistance) * 1609.34 : parseInt(filter.selectedDistance) * 1609.34;

    const marker = new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(this.selectedLocation.latitude, this.selectedLocation.longitude),
      icon: 'https://findtreatment.samhsa.gov/assets/images/green_start_arrow.png',
    });

    // Add circle overlay and bind to marker
    const circle = new google.maps.Circle({
      map: this.map,
      radius, // 10 miles in metres
      strokeColor: '#FF0000',
      strokeWeight: 2,
      fillColor: '0x220000FF',
      fillOpacity: 0,
    });
    circle.bindTo('center', marker, 'position');
    this.selectedCircle = circle;
  }

  /**
   * View place on the Maps.
   * @param index
   * @param item
   */
  async viewOnMap(index, item) {
    console.log('viewOnMap -> name', name, this.markers[index], item);
    this.toggleTab('map');
    const pos = {
      // tslint:disable-next-line: radix
      lat: parseFloat(item.latitude),
      // tslint:disable-next-line: radix
      lng: parseFloat(item.longitude),
    };
    console.log(pos, this.map);
    if (await this.checkInternet()) {
      google.maps.event.trigger(this.markers[index], 'click', pos);
      this.map.setCenter(pos);
      this.map.setZoom(12);
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${pos.lat},${pos.lng}`;
      const { Browser } = Plugins;
      await Browser.open({ url });
    }
  }

  /**
   * Loading the data on infinite scroll
   * @param infiniteScrollEvent
   */
  infiniteScrollDataLoaded(infiniteScrollEvent) {
    infiniteScrollEvent.target.complete();

    setTimeout(() => {
      this.infiniteScrollLoadingData = false;
      this.loader.dismiss();
    }, 1000);
  }

  /**
   * Loading more data on the infinite scroll
   * @param event
   */
  loadMoreData(event) {
    console.log('totalPages', this.page.totalPages);
    console.log('currentPage', this.page.currentPage);
    if (!this.infiniteScrollLoadingData) {
      if (this.page.totalPages === this.page.currentPage) {
        event.target.disabled = true;
      } else {
        this.page.currentPage += 1;
        this.infiniteScrollLoadingData = true;
        this.setData(this.selectedLocation.latitude, this.selectedLocation.longitude, this.filter, this.page.currentPage, event);
      }
    }
  }

  /**
   * Make function for pagination
   * @param type -
   */
  changePage(type: string) {
    switch (type) {
      case 'inc':
        this.setData(this.selectedLocation.latitude, this.selectedLocation.longitude, this.filter, this.page.currentPage + 1);
        break;
      case 'dec':
        this.setData(this.selectedLocation.latitude, this.selectedLocation.longitude, this.filter, this.page.currentPage - 1);
        break;
      case 'init':
        this.setData(this.selectedLocation.latitude, this.selectedLocation.longitude, this.filter, 1);
      case 'last':
        this.setData(this.selectedLocation.latitude, this.selectedLocation.longitude, this.filter, this.page.totalPages);
        break;
    }
  }

  // Geolocation Permission Request

  /**
   * Check and Ask for location permission, if not given twice.
   */

  async checklocationAuthorizationState() {
    this.locationRequestCounter += 1;
    // get current auth state, if it is allowed, check location services is on and load the map
    const newLocationAuthorizedState = await this.requestLocationAuth();
    console.log('newLocationAuthorizedState: ', newLocationAuthorizedState);
    if (newLocationAuthorizedState === 'allowed') {
      const locationEnabled = await this.locationService.isLocationAvailable();
      if (!locationEnabled) {
        this.showEnableLocationAlert();
      } else {
        this.initPage();
      }
    } else if (newLocationAuthorizedState === 'not-allowed') {
      // if permission is only asked once, then ask one more time.
      if (this.locationRequestCounter === 1) {
        this.checklocationAuthorizationState();
      } else {
        this.initPage();
      }
    } else {
      this.initPage();
    }
  }

  /**
   * Check the status of geolocation on page load. If not enabled ask for required permission.
   */
  async checkGeoLocationCurrentState() {
    const locationEnabled = await this.locationService.isLocationAvailable();
    const locationAuthorized = await this.locationService.isLocationAuthorized();
    // If location is not authorized, then ask for permission.
    if (!locationAuthorized) {
      this.checklocationAuthorizationState();
    } else {
      // if location is not enabled, then show alert to enable it. Otherwise load the map page.
      if (!locationEnabled) {
        this.showEnableLocationAlert();
      } else {
        this.initPage();
      }
    }
  }

  /**
   * If settings page wass opened, and user didn't toggle the location, the map should be
   * loaded with default values;
   */
  loadDefaultMapAfterTime() {
    if (this.settingsPageOpened) {
      this.initPage();
    }
  }

  /**
   * Show alert for enabling geolocation from settings.
   */
  async showEnableLocationAlert() {
    const alert = await this.alertController.create({
      header: 'Location Required',
      message: 'Location not Enabled. Open Settings',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.settingsPageOpened = true;
            this.locationService.openLocationSettingsPage();
            // load default value if location is not enabled in five seconds
            setTimeout(() => {
              this.loadDefaultMapAfterTime();
            }, 5000);
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Request permission for geolocation
   */
  async requestLocationAuth() {
    const currentAuthState = await this.locationService.getCurrentAuthorizationStatus();
    if (currentAuthState !== 'denied') {
      let newAuthState = await this.locationService.requestLocationAuth();
      if (newAuthState === 'once') {
        newAuthState = await this.locationService.requestLocationAuth();
      }
      return newAuthState;
    }
  }

  navigateToMap() {
    this.mapFlag = true;
    this.mySearchFlag = false;
    this.facilityFlag = false;
  }

  /**
   * Share search results via email/sms
   * @param shareType Share type 1 is for email and 2 is for sms
   */
  shareSearchResults(shareType: number) {
    const shareRecords = this.facilities.slice(0, 25);

    if (shareType === 1) {
      const emailBody = shareRecords.map((item) => {
        const website = item.website || item.website === 'http://' || item.website === 'https://' ? item.website : '';
        return `<br><b>${item._irow}. \t\t ${item.name1} - ${item.miles} miles <b><br>
          \t\t\t\t ${item.street1}, ${item.city}, ${item.state} ${item.zip} <br>
          \t\t\t\t ${item.phone} <br>
          \t\t\t\t ${website} <br>`;
      });

      console.log('shareSearchResults -> emailBody', emailBody.join(''));
      this.socialShareService.shareViaEmail(emailBody.join(''), 'Share Facilities Records', '');
    } else if (shareType === 2) {
      const emailBody = shareRecords
        .map((item) => {
          const website = item.website || item.website === 'http://' || item.website === 'https://' ? item.website : '';
          // tslint:disable-next-line: max-line-length
          return `\n${item._irow}. ${item.name1} - ${item.miles} miles \n  ${item.street1}, ${item.city}, ${item.state} ${item.zip} \n ${item.phone} \n ${website}`;
        })
        .join('');
      console.log('shareSearchResults -> emailBody', emailBody);
      this.socialShareService.shareViaSMS(emailBody);
    }
  }

  /**
   * Open action sheet for sharing via email and sms
   */
  openShareActionSheet() {
    const buttonLabels = ['Share via Email', 'Share via SMS'];

    const options: ActionSheetOptions = {
      title: 'Share search records',
      subtitle: 'Choose an action',
      buttonLabels,
      addCancelButtonWithLabel: 'Cancel',
      androidTheme: 5,
      destructiveButtonLast: true,
    };

    this.actionSheet.show(options).then((buttonIndex: number) => {
      console.log('Button pressed: ' + buttonIndex);
      this.shareSearchResults(buttonIndex);
    });
  }
}
