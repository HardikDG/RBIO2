import { ingredients } from './../models/ingredients';
export class ShoppingListService {
    private Ingredients: ingredients[] = [];

    addItem(name:string, amount:number){
        this.Ingredients.push(new ingredients(name,amount));
    }

    addItems(items: ingredients[]){
        this.Ingredients.push(...items);
    }

    getItems() {
        return this.Ingredients.slice();
    }

    removeItem(index: number){
        this.Ingredients.slice(index,1);
    }
}