// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  STORE_LISTING_URL: 'http://18.211.71.14/samhsa_rest.php',
  firebase:  {
    apiKey: "AIzaSyD9zuK34dRWRwiPGuCPrVeLZGGt0TrWhDg",
    authDomain: "disaster-app-ec8b5.firebaseapp.com",
    databaseURL: "https://disaster-app-ec8b5.firebaseio.com",
    projectId: "disaster-app-ec8b5",
    storageBucket: "disaster-app-ec8b5.appspot.com",
    messagingSenderId: "710489844893",
    appId: "1:710489844893:web:8ede0790b5a9948c05f874"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
