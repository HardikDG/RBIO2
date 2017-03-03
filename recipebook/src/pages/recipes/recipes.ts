import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';

import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { RecipePage } from './../recipe/recipe';
import { RecipesService } from './../../services/recipes';
import { Recipe } from './../../models/recipe';
import { AuthService } from './../../providers/auth-service';
import { ShopingOptionsPage } from './../shoping-options/shoping-options';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  recipes:Recipe[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipeService:RecipesService,private popverCtrl: PopoverController, private authService: AuthService, private loadCtrl: LoadingController, private alertCtrl: AlertController) {}

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }

  onLoadRecipe(recipe, index) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index:index});
  }

  onShowOptions(event) {
    const loading = this.loadCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popverCtrl.create(ShopingOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if(data) {
        if (data.action == 'load') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.recipeService.getList(token)
              .subscribe((list: Recipe[]) => {
                loading.dismiss();
                if (list) {
                  this.recipes = list;
                } else {
                  this.recipes = [];
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
            this.recipeService.storeList(token)
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
