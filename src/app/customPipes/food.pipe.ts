
import { Pipe, PipeTransform } from '@angular/core';
import { FoodService } from './../services/restaurant/food.service';

@Pipe({
  name: 'foodName'
})
export class FoodName implements PipeTransform {
  constructor(private foodService: FoodService) { }
  transform(value: string): string {
    let data = '';
    this.foodService.getFoodById(value).subscribe(res => {
      data = res.name;
    });
    console.log(data);
    return data;
  }
}
