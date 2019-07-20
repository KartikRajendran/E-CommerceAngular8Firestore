import { Component, OnInit } from '@angular/core';
import { Food, FoodService } from 'src/app/services/restaurant/food.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  foods: Food[];
  constructor(private foodService: FoodService, private router: Router,
              private toastr: ToastrService) { }

  // sorting
  key = 'name'; // set default
  reverse = false;
  // initializing p to one
  p = 1;
  search = '';
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.loadFoodData();
    console.log(this.foods);
  }

  loadFoodData() {
    this.foodService.getFoodsList().subscribe(res => {
      this.foods = res;
    });
  }

  viewAddFood() {
    window.location.href = 'add-food';
    // this.router.navigate(['add-product-type']);
  }

  editFood(id: string) {
    window.location.href = 'edit-food/' + id;
  }

  deleteFood(id: string) {
    this.foodService.deleteFood(id);
    this.toastr.success('Food Deleted Successfully!!', 'Food List');
  }

}
