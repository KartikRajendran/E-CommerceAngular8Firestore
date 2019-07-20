import { Component, OnInit } from '@angular/core';
import { RestaurantOrder, RestaurantOrderService } from 'src/app/services/restaurant/restaurant-order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  restaurantOrders: RestaurantOrder[];
  constructor(private restaurantOrderService: RestaurantOrderService, private router: Router,
              private toastr: ToastrService) { }

  // sorting
  key = 'orderNumber'; // set default
  reverse = false;
  // initializing p to one
  p = 1;
  search = '';
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.loadRestaurantOrderTypeData();
    console.log(this.restaurantOrders);
  }

  loadRestaurantOrderTypeData() {
    this.restaurantOrderService.getRestaurantOrdersList().subscribe(res => {
      this.restaurantOrders = res;
    });
  }

  viewAddOrder() {
    window.location.href = 'add-order';
    // this.router.navigate(['add-RestaurantOrder-type']);
  }

  editOrder(id: string) {
    window.location.href = 'edit-order/' + id;
  }

  deleteOrder(id: string) {
    this.restaurantOrderService.deleteRestaurantOrder(id);
    this.toastr.success('Order Deleted Successfully!!', 'Order');
  }

}
