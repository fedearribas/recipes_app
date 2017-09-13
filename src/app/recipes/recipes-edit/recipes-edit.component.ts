import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id']);
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe.ingredients.length > 0) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            this.ingredientFormGroup(ingredient.name, ingredient.amount)
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    /* const recipeName = this.recipeForm.get('name').value;
    const recipeImagePath = this.recipeForm.get('imagePath').value;
    const recipeDescription = this.recipeForm.get('description').value;
    const recipe = new Recipe(recipeName, recipeDescription, recipeImagePath, null); */
    if (!this.editMode) {
      this.recipeService.addRecipe(this.recipeForm.value);
    } else {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.recipeForm.reset();
    this.router.navigate(['']);

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.ingredientFormGroup(null, null)
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private ingredientFormGroup(name: string, amount: number): FormGroup {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl( amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

}
