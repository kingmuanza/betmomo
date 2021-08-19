import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'betmomo';

  constructor() {
    const FIREBASE_CONFIG = {
      apiKey: "AIzaSyB70vI6sj49jUAcfEx7Ll0GDxYjNdggvX8",
      authDomain: "betmomo-muanza.firebaseapp.com",
      projectId: "betmomo-muanza",
      storageBucket: "betmomo-muanza.appspot.com",
      messagingSenderId: "623000778211",
      appId: "1:623000778211:web:cd0a9b19e0c788af99dcd6",
      measurementId: "G-SN84EVZRR4"
    };
    firebase.initializeApp(FIREBASE_CONFIG);
  }

}
