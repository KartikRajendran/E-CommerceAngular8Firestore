import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ProductTypeService, ProductType } from 'src/app/services/product-type.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  form: FormGroup;
  status = [];
  productId = '';
  formType = 'Add';
  formButon = 'Save';

  productType: any = {
    product_type: ''
  };

  constructor(private productTypeService: ProductTypeService, private toastr: ToastrService,
              private formBuilder: FormBuilder, private route: ActivatedRoute) {

                const id = route.snapshot.params['id'];

                /* For Edit Product Type */
                if (id && id !== '') {
                    this.productId = id;
                    this.productTypeService.getProductTypeById(id).subscribe(res => {
                      this.productType = res;
                      this.formType = 'Edit';
                      this.formButon = 'Update';
                      this.form.controls.id.patchValue(this.productId);
                      this.form.controls.status.patchValue(this.productType.status);
                  });
                }
              }

  ngOnInit() {
    this.reloadForm();
  }

  /* To Cancel Or Reload Form */
  reloadForm() {
    this.form = this.formBuilder.group({
      id: '',
      product_type: ['', Validators.required],
      status: ['']
    });

    of(this.getStatus()).subscribe(status => {
      this.status = status;
      this.form.controls.status.patchValue(this.status[0].id);
    });
  }

  /* To Add  */
  addProductType() {
    const data = Object.assign({}, this.form.value);
    delete data.id;

    if (this.form.value.id == null || this.form.value.id === '') {
      this.productTypeService.addProductType(data);
      this.toastr.success('Product Type Added Successfully!!!', 'Product Type');
    } else {
      this.productTypeService.updateProductType(this.form.value.id, data);
      this.toastr.success('Product Type Updated Successfully!!!', 'Product Type');
    }

    setTimeout(function() {
      window.location.href = 'product-type-list';
    }, 3000 );
  }

  /* To Get Dynamic Array For Select Options */
  getStatus(): any {
    return [
      { id: '1', name: 'Active' },
      { id: '2', name: 'In-Active' },
    ];
  }


}
