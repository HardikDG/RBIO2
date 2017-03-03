import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AuthService } from './../../providers/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService:AuthService,private loadingCtrl: LoadingController, private alertCtrl:AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSignin(form:NgForm) {
    const loading = this.loadingCtrl.create({
      content:"Signing in..."
    });
    loading.present();
    this.authService.signin(form.value.email,form.value.password)
    .then(data => {
      loading.dismiss();
      console.log(data);
    }).catch( error => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Sign in error',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
      console.log("Error: " + error);
    })
    
  }

}
