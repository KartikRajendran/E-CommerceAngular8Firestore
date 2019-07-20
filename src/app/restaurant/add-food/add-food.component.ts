import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from 'src/app/services/restaurant/food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  form: FormGroup;
  formType = 'Add';
  formButon = 'Save';

  food: any = {
    name: '',
    price: ''
  };

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder,
              private foodService: FoodService, private route: ActivatedRoute) {
                const id = route.snapshot.params['id'];

                /* For Edit Product Type */
                if (id && id !== '') {
                    this.foodService.getFoodById(id).subscribe(res => {
                      this.food = res;
                      this.formType = 'Edit';
                      this.formButon = 'Update';
                      this.form.controls.id.patchValue(id);
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
      price: ['', Validators.required]
    });
  }

  /* To Add  */
  addFood() {
    const data = Object.assign({}, this.form.value);
    delete data.id;

    if (this.form.value.id == null || this.form.value.id === '') {
      this.foodService.addFood(data);
      this.toastr.success('Food Added Successfully!!!', 'Food');
    } else {
      this.foodService.updateFood(this.form.value.id, data);
      this.toastr.success('Food Updated Successfully!!!', 'Food');
    }
    this.reloadForm();

    setTimeout(function() {
      window.location.href = 'food-list';
    }, 3000 );
  }
}
