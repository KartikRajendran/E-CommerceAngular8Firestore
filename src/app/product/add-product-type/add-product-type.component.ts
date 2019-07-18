import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ProductTypeService, ProductType } from 'src/app/services/product-type.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  form: FormGroup;
  status = [];

  productType: ProductType = {
    product_type: '',
    status: ''
  };

  constructor(private productTypeService: ProductTypeService, private toastr: ToastrService,
              private formBuilder: FormBuilder) {

                this.form = this.formBuilder.group({
                  product_type: '',
                  status: ['']
                });

                of(this.getStatus()).subscribe(status => {
                  this.status = status;
                  this.form.controls.status.patchValue(this.status[0].id);
                });

              }

  ngOnInit() {
  }

  addProductType() {
    this.productType = this.form.value;
    this.productTypeService.addProductType(this.productType);
    this.toastr.success('Product Type Added Successfully!!!', 'Product Type');
  }

  getStatus(): any {
    return [
      { id: '1', name: 'Active' },
      { id: '2', name: 'In-Active' },
    ];
  }


}
