import { Component } from '@angular/core';

import { RecipesPage } from './../recipes/recipes';
import { ShoppingListPage } from './../shopping-list/shopping-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ShoppingListPage
  tab2Root: any = RecipesPage;

  constructor() {

  }
}
