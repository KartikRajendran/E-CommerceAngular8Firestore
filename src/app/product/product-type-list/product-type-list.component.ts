import { Component, OnInit } from '@angular/core';
import { ProductTypeService, ProductType } from 'src/app/services/product-type.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-type-list',
  templateUrl: './product-type-list.component.html',
  styleUrls: ['./product-type-list.component.css']
})
export class ProductTypeListComponent implements OnInit {

  productTypes: ProductType[];
  constructor(private productTypeService: ProductTypeService, private router: Router,
              private toastr: ToastrService) { }

  // sorting
  key = 'product_type'; // set default
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
    console.log(this.productTypes);
  }

  loadProductTypeData() {
    this.productTypeService.getProductTypesList().subscribe(res => {
      this.productTypes = res;
    });
  }

  viewAddProductType() {
    window.location.href = 'add-product-type';
    // this.router.navigate(['add-product-type']);
  }

}
