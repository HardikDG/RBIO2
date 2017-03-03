import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShopingOptionsPage } from './../shoping-options/shoping-options';
import { AuthService } from './../../providers/auth-service';

import { ShoppingListService } from './../../services/shopping-list';

import { ingredients } from './../../models/ingredients';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  listItems: ingredients[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingService: ShoppingListService, private popverCtrl: PopoverController, private authService: AuthService, private loadCtrl: LoadingController, private alertCtrl: AlertController) { }

  onAddItem(form: NgForm) {
    this.shoppingService.addItem(form.value.ingredients, form.value.amount);
    form.reset();
    this.loadItems();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.shoppingService.getItems();
  }

  onCheckItem(index: number) {
    this.shoppingService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event) {
    const loading = this.loadCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popverCtrl.create(ShopingOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (data) {
        if (data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then((token: string) => {
              this.shoppingService.getList(token)
                .subscribe((list: ingredients[]) => {
                  loading.dismiss();
                  if (list) {
                    this.listItems = list;
                  } else {
                    this.listItems = [];
                  }
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                })
            })
            .catch(error => {
              loading.dismiss();
              console.log("Error in getting current user token" + error);
            })
        } else if (data.action == 'store') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then((token: string) => {
              this.shoppingService.storeList(token)
                .subscribe(data => {
                  loading.dismiss();
                  console.log("Success: " + JSON.stringify(data));
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                })
            })
            .catch(error => {
              loading.dismiss();
              console.log("Error in getting current user token" + error);
            })
        }
      }
    })
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Error occured',
      message: errorMessage,
      buttons: ['Ok']
    })
    alert.present();
  }

}
