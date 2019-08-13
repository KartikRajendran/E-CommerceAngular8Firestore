import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { CategoryService, Category } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form: FormGroup;
  status = [];
  categoryID = '';
  formType = 'Add';
  formButon = 'Save';

  Category: any = {
    name: ''
  };

  constructor(private categoryService: CategoryService, private toastr: ToastrService,
              private formBuilder: FormBuilder, private route: ActivatedRoute) {

                const id = route.snapshot.params['id'];

                /* For Edit Category */
                if (id && id !== '') {
                    this.categoryID = id;
                    this.categoryService.getCategoryById(id).subscribe(res => {
                      this.Category = res;
                      this.formType = 'Edit';
                      this.formButon = 'Update';
                      this.form.controls.id.patchValue(this.categoryID);
                      this.form.controls.status.patchValue(this.Category.status);
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
      name: ['', Validators.required],
      status: ['']
    });

    of(this.getStatus()).subscribe(status => {
      this.status = status;
      this.form.controls.status.patchValue(this.status[0].id);
    });
  }

  /* To Add  */
  addCategory() {
    const data = Object.assign({}, this.form.value);
    delete data.id;

    if (this.form.value.id == null || this.form.value.id === '') {
      this.categoryService.addCategory(data);
      this.toastr.success('Category Added Successfully!!!', 'Category');
    } else {
      this.categoryService.updateCategory(this.form.value.id, data);
      this.toastr.success('Category Updated Successfully!!!', 'Category');
    }

    setTimeout(function() {
      window.location.href = 'category-list';
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
