import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { RestaurantOrderService } from 'src/app/services/restaurant/restaurant-order.service';
import { of } from 'rxjs';
import { OrderedItemService } from 'src/app/services/restaurant/ordered-item.service';
import { FoodService } from 'src/app/services/restaurant/food.service';

declare var $;

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  form: FormGroup;
  itemForm: FormGroup;
  paymentMethods = []; foods = [];
  orderedItems: any = [];
  formType = 'Add';
  formButon = 'Save';
  orderId = '';

  order: any = {
    orderNumber: Date.now(),
    customerName: '',
    grandTotal: '',
  };

  orderItem: any = {
    item: '',
    price: 0,
    quantity: 0,
    total: 0,
  };

  constructor(private restaurantOrderService: RestaurantOrderService, private toastr: ToastrService,
              private formBuilder: FormBuilder, private route: ActivatedRoute,
              private itemService: OrderedItemService, private foodService: FoodService) { }

    // sorting
  key = 'item'; // set default
  reverse = false;
  // initializing p to one
  p = 1;
  search = '';
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ngOnInit() {
    this.reloadForm();
    this.reloadItemForm();
    const id = this.route.snapshot.params['id'];

    /* For Edit order */
    if (id && id !== '') {
        this.restaurantOrderService.getRestaurantOrderById(id).subscribe(res => {
          this.order = res;
          console.log(this.order);
          this.formType = 'Edit';
          this.formButon = 'Update';
          this.form.controls.id.patchValue(id);
          this.form.controls.paymentMethod.patchValue(this.order.paymentMethod);
      });
    } else {
      of(this.getPaymentMethods()).subscribe(paymentMethods => {
        this.paymentMethods = paymentMethods;
        console.log(this.paymentMethods);
        this.form.controls.paymentMethod.patchValue(this.paymentMethods[0]);
      });
    }
  }

  /* To Cancel Or Reload Form */
  reloadForm() {
    this.form = this.formBuilder.group({
      id: '',
      orderNumber: [Date.now(), Validators.required],
      customerName: ['', Validators.required],
      grandTotal: ['', Validators.required],
      paymentMethod: ['']
    });
  }

  /* To Cancel Or Reload Item Form */
  reloadItemForm() {
    this.itemForm = this.formBuilder.group({
      id: '',
      item: [''],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      total: ['', Validators.required],
      uid: ''
    });
    this.foodService.getFoodsList().subscribe(res => {
      this.foods = res;
      console.log(this.foods[0].id);
      this.itemForm.controls.item.patchValue(this.foods[0].id);
    });
  }

  addorder() {
    const data = Object.assign({}, this.form.value);
    delete data.id;

    if (this.form.value.id == null || this.form.value.id === '') {
      this.restaurantOrderService.addRestaurantOrder(data).then(res => {
        this.orderId = res.id;
        console.log(this.orderId);
      });
      // this.addItem();
      this.toastr.success('Order Added Successfully!!!', 'Order');
    } else {
      this.restaurantOrderService.updateRestaurantOrder(this.form.value.id, data);
      this.toastr.success('Order Updated Successfully!!!', 'Order');
    }

    /* setTimeout(function() {
      window.location.href = 'order-list';
    }, 3000 ); */
  }

  addorderedItems() {
    this.itemForm.controls.uid.patchValue(this.orderedItems.length);
    this.orderedItems.push(this.itemForm.value);
    this.reloadItemForm();
    // console.log(this.orderedItems);
  }

  addItem() {
    const data = Object.assign({}, this.itemForm.value);
    delete data.id;

    if (this.itemForm.value.id == null || this.itemForm.value.id === '') {
      this.itemService.addOrderedItem(data);
      this.toastr.success('Item Added Successfully!!!', 'Add Item');
    } else {
      this.itemService.updateOrderedItem(this.itemForm.value.id, data);
      this.toastr.success('Item Updated Successfully!!!', 'Edit Item');
    }

  }

  /* To Get Dynamic Array For Select Options */
  getPaymentMethods(): any {
    return ['Cash', 'Card'];
  }

  selectedItem() {
    const selectedFood = this.foods.find(x => x.id === this.itemForm.value.item);
    console.log(selectedFood);
    this.itemForm.controls.price.patchValue(selectedFood.price);
    this.itemForm.controls.quantity.patchValue(1);
    this.itemForm.controls.total.patchValue(selectedFood.price);
    console.log(this.itemForm.value);
  }

  calculateTotal(event: Event) {
    let total = (+this.orderItem.price) * (+this.orderItem.quantity);
    console.log(total);
    this.itemForm.controls.total.patchValue(total);
  }

  editItem(uid: string) {
    $('#itemModal').modal('show');
    const data = this.orderedItems.find(x => x.uid === uid);
    this.itemForm.setValue(data);
    console.log(this.orderedItems.find(x => x.uid === uid));
  }

  deleteItem(id) {

  }
}
