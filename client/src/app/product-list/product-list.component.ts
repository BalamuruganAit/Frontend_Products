import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: any[] = [];

  constructor(private http: HttpClient, private router: Router ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get('http://localhost:5000/api/products/getAllProduct').subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => console.error("Error fetching products:", error)
    );
  }

  editProduct(product: any) {    
    this.router.navigate(['/add-products'], { state: { product } });
  }
  
  deleteProduct(index: number) {
    const productId = this.products[index].id;
    if (!productId) {
      console.error("Invalid product ID");
      return;
    }

    this.http.delete(`http://localhost:5000/api/products/deleteProduct/${productId}`).subscribe(
      () => {
        this.products.splice(index, 1);
      },
      (error: any) => console.error("Error deleting product:", error)
    );
  }
}
