import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private datStorageService: DataStorageService, private recipeService: RecipeService) {}

  onSaveData() {
    this.datStorageService.storeRecipes().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  onFetchData() {
    this.datStorageService.fetchRecipes();
  }
}
