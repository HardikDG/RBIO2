
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { AuthService } from './../providers/auth-service';

import firebase from 'firebase'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  loginPage = LoginPage;
  signupPage = SignupPage;
  isAuthenticated = false;

  @ViewChild('nav') navCtrl: NavController

  constructor(platform: Platform, private menuCtrl: MenuController, private authService:AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyCHq2EYHWPGvImtJLkQjcO3WpS8HCWKyts",
      authDomain: "ionic2-recipebook-d1503.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = LoginPage;
      }
    });
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  onLoad(page: any) {
    this.navCtrl.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
     this.authService.logout();
     this.menuCtrl.close();
     this.navCtrl.setRoot(LoginPage);
  }
}
