import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService, Product } from 'src/app/services/product.service';
import { ProductTypeService } from 'src/app/services/product-type.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form: FormGroup;
  product_types = [];
  data = [];

  product: Product = {
    product_name: '',
    product_type: '',
    description: '',
    price: 0,
    discount: 0,
  };

  constructor(private productService: ProductService, private toastr: ToastrService,
              private formBuilder: FormBuilder, private productTypeService: ProductTypeService) {

                this.form = this.formBuilder.group({
                  product_name: '',
                  description: '',
                  price: 0,
                  discount: 0,
                  product_type: ['']
                });

                this.productTypeService.getProductTypesList().subscribe(product_type => {
                  this.product_types = product_type;
                  console.log(product_type);
                  this.form.controls.product_type.patchValue(this.product_types[0].product_type);
                });

              }

  ngOnInit() {
  }

  addProduct() {
    this.product = this.form.value;
    this.productService.addProduct(this.product);
    this.toastr.success('Product Added Successfully!!!', 'Product');
  }

}
