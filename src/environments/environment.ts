// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFuQHBgbZjXp5xbFEuOUkAy-oW5xWYiAY",
  authDomain: "oyanedel-sotomayor.firebaseapp.com",
  projectId: "oyanedel-sotomayor",
  storageBucket: "oyanedel-sotomayor.appspot.com",
  messagingSenderId: "215322682992",
  appId: "1:215322682992:web:920c40c2bf44906efa36b5",
  measurementId: "G-TY9FWVPBN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

apiUrl:"https://uber-nodejs-server-git-d61f89-guillermovillacuratorres-projects.vercel.app/api/"
