import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OccupationService } from 'src/app/services/occupation.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  form: FormGroup;
  product_types = [];
  categorys = [];
  formType = 'Add';
  formButon = 'Save';
  data = [];

  service: any = {
      name: '',
      description: '',
      price: '',
  };

  constructor(private occupationService: OccupationService, private categoryService: CategoryService, private toastr: ToastrService,
              private formBuilder: FormBuilder, private productTypeService: ProductTypeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.reloadForm();
    const id = this.route.snapshot.params['id'];

    /* For Edit service Type */
    if (id && id !== '') {
        this.occupationService.getServiceById(id).subscribe(res => {
          this.service = res;
          this.formType = 'Edit';
          this.formButon = 'Update';
          this.form.controls.id.patchValue(id);
          this.form.controls.category.patchValue(this.service.category);
          this.form.controls.product_type.patchValue(this.service.product_type);
      });
    }
  }

  /* To Cancel Or Reload Form */
  reloadForm() {
    this.form = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      category: [''],
      product_type: ['']
    });
    this.productTypeService.getProductTypesList().subscribe(product_type => {
      this.product_types = product_type;
      console.log(product_type);
      this.form.controls.product_types.patchValue(this.product_types[0].product_type);
    });
    this.categoryService.getCategorysList().subscribe(category => {
      this.categorys = category;
      console.log(category);
      this.form.controls.categorys.patchValue(this.categorys[0].category);
    });
  }

  addService() {
    const data = Object.assign({}, this.form.value);
    delete data.id;

    if (this.form.value.id == null || this.form.value.id === '') {
      this.occupationService.addService(data);
      this.toastr.success('Service Added Successfully!!!', 'Service');
    } else {
      this.occupationService.updateService(this.form.value.id, data);
      this.toastr.success('Service Updated Successfully!!!', 'Service');
    }

    setTimeout(function() {
      window.location.href = 'service-list';
    }, 3000 );
  }


}
