import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'productList', pathMatch: 'full' },

  { path: 'add-products', loadChildren: () => import('./add-products/add-products.module').then(m => m.AddProductsModule) },
  { path: 'productList', loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule) },
  { path: 'add-products/:id', loadChildren: () => import('./add-products/add-products.module').then(m => m.AddProductsModule) },

  { path: 'layout', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
