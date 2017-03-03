import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { ingredients } from './../models/ingredients';
import 'rxjs/add/operator/do';
import { AuthService } from './../providers/auth-service';
@Injectable()
export class ShoppingListService {

    constructor(private http: Http, private authService: AuthService) {

    }

    private Ingredients: ingredients[] = [];

    addItem(name: string, amount: number) {
        this.Ingredients.push(new ingredients(name, amount));
    }

    addItems(items: ingredients[]) {
        this.Ingredients.push(...items);
    }

    getItems() {
        return this.Ingredients.slice();
    }

    removeItem(index: number) {
        this.Ingredients.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic2-recipebook-d1503.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.Ingredients)
            .map((response: Response) => {
                return response.json();
            })
    }

    getList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic2-recipebook-d1503.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
            .map((response: Response) => {
                return response.json();
            })
            .do((data: ingredients[]) => {
                if(data){
                    this.Ingredients = data
                } else {
                    this.Ingredients = data
                }
                
            })
    }
}