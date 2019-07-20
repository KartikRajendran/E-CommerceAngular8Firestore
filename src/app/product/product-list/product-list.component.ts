import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService, private router: Router,
              private toastr: ToastrService) { }

  // sorting
  key = 'product_name'; // set default
  reverse = false;
  // initializing p to one
  p = 1;
  search = '';
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.loadProductTypeData();
    console.log(this.products);
  }

  loadProductTypeData() {
    this.productService.getProductsList().subscribe(res => {
      this.products = res;
    });
  }

  viewAddProduct() {
    window.location.href = 'add-product';
    // this.router.navigate(['add-product-type']);
  }

  editProduct(id: string) {
    window.location.href = 'edit-product/' + id;
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
    this.toastr.success('Product Deleted Successfully!!', 'Product');
  }

}
