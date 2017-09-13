import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Milanesa con dubstep', 'Deliciosa milanesa con un poco de dubstep',
    'http://vignette2.wikia.nocookie.net/july3p/images/d/dc/Milanesa_Dubstep.jpg/revision/latest?cb=20170310092035&path-prefix=es',
    [
      new Ingredient('Queso', 1),
      new Ingredient('Carne', 1),
      new Ingredient('Dubstep', 1)
    ]),

    new Recipe('Hamburguesa', 'Te deja un sabor de boca exquisito',
    'http://static.vix.com/es/sites/default/files/styles/large/public/imj/elgranchef/h/hamburguesa-con-queso-feta-y-rucula-1.jpg',
    [
      new Ingredient('Pan', 2),
      new Ingredient('Carne', 1)
    ])
    ];

    recipeListChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService) {

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
