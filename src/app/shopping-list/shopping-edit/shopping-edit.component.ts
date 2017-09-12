import { Subscription } from 'rxjs/Subscription';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingListService: ShoppingListService) { }

  editSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') form: NgForm;

  ngOnInit() {
    this.editSubscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editedItemIndex = id;
        this.editedItem = this.shoppingListService.getIngredient(id);
      this.form.form.patchValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
       });
    });
  }

  onSubmit() {
    const value = this.form.value;
    const ingredient = new Ingredient(value.name, Number(value.amount));
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.resetForm();
  }

  onClear() {
    this.resetForm();
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.form.reset();
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }



}
