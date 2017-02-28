import { ingredients } from './../models/ingredients';
import { Recipe } from './../models/recipe';
export class RecipesService {
    private recipes: Recipe[] = [];

    addRecipe(title:string, description:string, difficulty:string, ingredients:ingredients[]){
        this.recipes.push(new Recipe(title,description,difficulty,ingredients));
        console.log("Add:" + this.recipes);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    updateRecipe(index: number, title:string, description:string, difficulty:string,ingredient: ingredients[]){
        this.recipes[index] = new Recipe(title,description,difficulty,ingredient);
    }

    removeRecipe(index: number){
        this.recipes.splice(index,1);
    }
}