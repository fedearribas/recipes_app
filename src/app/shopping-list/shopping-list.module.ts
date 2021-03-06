import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule
  ]
})

export class ShoppingListModule {}