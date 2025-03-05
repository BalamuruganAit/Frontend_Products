import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  productForm: FormGroup;
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  isEditMode = false;
  editProductId: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productStock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    const product = history.state.product;
    if (product) {
      this.productForm.patchValue({
        productName: product.productName,
        productStock: product.productStock
      });

      this.imagePreviews = product.productImage.map(
        (img: string) => `http://localhost:5000/uploads/${img}`
      );

      this.isEditMode = true;
      this.editProductId = product._id; 
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
      this.imagePreviews = [];
      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  addProduct() {
    const formData = new FormData();
    formData.append("productName", this.productForm.value.productName);
    formData.append("productStock", this.productForm.value.productStock);
  
    this.selectedFiles.forEach(file => {
      formData.append("productImage", file);
    });
  
    if (this.isEditMode && this.editProductId) {
      this.http.put(`http://localhost:5000/api/products/updateProduct/${this.editProductId}`, formData)
        .subscribe(
          (response: any) => {
            console.log("Product Updated", response);
            this.router.navigate(['/productList']);
          },
          (error: any) => console.error("Error updating product:", error)
        );
    } else {
      this.http.post("http://localhost:5000/api/products/product", formData)
        .subscribe(
          (response: any) => {
            console.log("Product Added", response);
            this.router.navigate(['/productList']);
          },
          (error: any) => console.error("Error adding product:", error)
        );
    }
  }
  
}
