import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { RecipesPage } from './../pages/recipes/recipes';
import { RecipePage } from './../pages/recipe/recipe';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { LoginPage } from './../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
import { ShopingOptionsPage } from './../pages/shoping-options/shoping-options';

import { ShoppingListService } from './../services/shopping-list';
import { RecipesService } from './../services/recipes';
import { AuthService } from './../providers/auth-service';

@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SignupPage,
    LoginPage,
    ShopingOptionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SignupPage,
    LoginPage,
    ShopingOptionsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},ShoppingListService,RecipesService,AuthService]
})
export class AppModule {}
