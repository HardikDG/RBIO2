import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AuthService } from './../../providers/auth-service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing up'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Sign up failed',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
