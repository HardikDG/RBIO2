import { Http, Response } from '@angular/http';
import { AuthService } from './../providers/auth-service';
import { Injectable } from '@angular/core';
import { ingredients } from './../models/ingredients';
import 'rxjs/add/operator/do';
import { Recipe } from './../models/recipe';

@Injectable()
export class RecipesService {
    private recipes: Recipe[] = [];

    constructor(private authService: AuthService, private http: Http) {

    }
    addRecipe(title: string, description: string, difficulty: string, ingredients: ingredients[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
        console.log("Add:" + this.recipes);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    updateRecipe(index: number, title: string, description: string, difficulty: string, ingredient: ingredients[]) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredient);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.put('https://ionic2-recipebook-d1503.firebaseio.com/' + userId + '/recipe.json?auth=' + token, this.recipes)
            .map((response: Response) => {
                return response.json();
            })
    }

    getList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get('https://ionic2-recipebook-d1503.firebaseio.com/' + userId + '/recipe.json?auth=' + token)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json() ? response.json() : [];
                for (let item of recipes) {
                    if (!item.hasOwnProperty('ingredients')) {
                        item.ingredients = [];
                    }
                }
                return recipes;
            })
            .do((data: Recipe[]) => {
                if (data) {
                    this.recipes = data
                } else {
                    this.recipes = []
                }
            })
    }
}