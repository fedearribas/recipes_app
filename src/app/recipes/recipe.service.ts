import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [];

    recipeListChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService) {

    }

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes;
      this.recipeListChanged.next(this.recipes.slice());
    }

    getRecipes() {
      return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
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
