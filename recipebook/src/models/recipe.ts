import { ingredients } from './ingredients';
export class Recipe {
    constructor(public title:string, public description:string, public difficulty:string, public ingredients: ingredients[] ){

    }
}