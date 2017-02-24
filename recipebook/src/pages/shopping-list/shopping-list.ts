import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from '@angular/forms';

import { ShoppingListService } from './../../services/shopping-list';

import { ingredients } from './../../models/ingredients';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  listItems: ingredients[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private shoppingService:ShoppingListService) {}

  onAddItem(form: NgForm){
    this.shoppingService.addItem(form.value.ingredients,form.value.amount);
    form.reset();
    this.loadItems();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.shoppingService.getItems();
  }

  onCheckItem(index: number){
    this.shoppingService.removeItem(index);
    this.loadItems();
  }

}
