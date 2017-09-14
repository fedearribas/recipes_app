import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBhcUdePzbQUTSCe_Iv9lGgnLLLNwSIn-s',
      authDomain: 'ng-recipe-app-c222d.firebaseapp.com'
    });
  }
}
