import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put('https://ng-recipe-app-c222d.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  fetchRecipes() {
    return this.http.get('https://ng-recipe-app-c222d.firebaseio.com/recipes.json').map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ).subscribe(
       (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
       }
    );
  }
}
