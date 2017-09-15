import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [];

    recipeListChanged = new Subject<Recipe[]>();

    constructor(private store: Store<any>) {

    }

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipeListChanged.next(this.recipes.slice());
    }

    getRecipes() {
      return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) { 
      this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    getRecipe(id: number) {
      return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipeListChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
      this.recipes[index] = recipe;
      this.recipeListChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipeListChanged.next(this.recipes.slice());
    }
}
