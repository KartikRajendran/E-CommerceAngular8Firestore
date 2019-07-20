import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService, Product } from 'src/app/services/product.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form: FormGroup;
  product_types = [];
  formType = 'Add';
  formButon = 'Save';
  data = [];

  product: any = {
      product_name: '',
      description: '',
      price: '',
      discount: '',
  };

  constructor(private productService: ProductService, private toastr: ToastrService,
              private formBuilder: FormBuilder, private productTypeService: ProductTypeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.reloadForm();
    const id = this.route.snapshot.params['id'];

    /* For Edit Product Type */
    if (id && id !== '') {
        this.productService.getProductById(id).subscribe(res => {
          this.product = res;
          this.formType = 'Edit';
          this.formButon = 'Update';
          this.form.controls.id.patchValue(id);
          this.form.controls.product_type.patchValue(this.product.product_type);
      });
    }
  }

  /* To Cancel Or Reload Form */
  reloadForm() {
    this.form = this.formBuilder.group({
      id: '',
      product_name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      product_type: ['']
    });
    this.productTypeService.getProductTypesList().subscribe(product_type => {
      this.product_types = product_type;
      console.log(product_type);
      this.form.controls.product_type.patchValue(this.product_types[0].product_type);
    });
  }

  addProduct() {
    const data = Object.assign({}, this.form.value);
    delete data.id;

    if (this.form.value.id == null || this.form.value.id === '') {
      this.productService.addProduct(data);
      this.toastr.success('Product Added Successfully!!!', 'Product');
    } else {
      this.productService.updateProduct(this.form.value.id, data);
      this.toastr.success('Product Updated Successfully!!!', 'Product');
    }

    setTimeout(function() {
      window.location.href = 'product-list';
    }, 3000 );
  }

}
