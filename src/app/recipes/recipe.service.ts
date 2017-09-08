import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
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

    constructor(private shoppingListService: ShoppingListService) {

    }

    getRecipes() {
      return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
    }
}
