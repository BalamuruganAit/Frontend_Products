import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductsRoutingModule } from './add-products-routing.module';
import { AddProductsComponent } from './add-products.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProductsComponent,
  ],
  imports: [
    CommonModule,
    AddProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddProductsModule { }
