import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ActionSheet } from '@ionic-native/action-sheet/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { SharedComponentsModule } from './components/shared-components/shared-components.module';
// import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { IonicSelectableModule } from 'ionic-selectable';

import { LocationService } from './services/location.service';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment.prod';
import { UserPromptService } from './services/user-prompt.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, LearnMoreComponent],
  entryComponents: [LearnMoreComponent],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    IonicModule.forRoot({}),
    AppRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    IonicSelectableModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Diagnostic,
    NativeGeocoder,
    FileTransfer,
    FilePath,
    FileTransferObject,
    File,
    FileOpener,
    DocumentViewer,
    SocialSharing,
    EmailComposer,
    ActionSheet,
    UserPromptService,
    // NativePageTransitions,
    LocationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
