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
  deleteItems: any = [];
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
    name: '',
    orderid: '',
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

          of(this.getPaymentMethods()).subscribe(paymentMethods => {
            this.paymentMethods = paymentMethods;
          });

          this.form.controls.paymentMethod.patchValue(this.order.paymentMethod);
      });

        this.itemService.getOrderedItemByOrderId(id).subscribe(res => {
          res.forEach(el => {

            let data: any = el.payload.doc.data();
            data.id = el.payload.doc.id;
            data.uid = this.orderedItems.length;
            this.orderedItems.push(data);
            console.log(this.orderItem);
          });

        //console.log(res);
        // this.orderedItems = res;
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
      name: [''],
      quantity: ['', Validators.required],
      total: ['', Validators.required],
      orderId: '',
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

        this.orderedItems.forEach(element => {
          element.orderId = this.orderId;
          console.log(element);
          this.addItem(element);
        });

        console.log(this.orderId);
      });
      // this.addItem();
      this.toastr.success('Order Added Successfully!!!', 'Order');
    } else {

      if (this.deleteItems.length > 0) {
        this.deleteItems.forEach(element => {
          this.itemService.deleteOrderedItem(element);
        });
      }
      this.restaurantOrderService.updateRestaurantOrder(this.form.value.id, data).then(res => {

        this.orderedItems.forEach(element => {
          element.orderId = this.form.value.id;
          console.log(element);
          this.addItem(element);
        });
      });
      this.toastr.success('Order Updated Successfully!!!', 'Order');
    }

    setTimeout(function() {
      window.location.href = 'order-list';
    }, 3000 );
  }

  addorderedItems() {

    let index = this.orderedItems.findIndex(x => x.uid === this.itemForm.controls.uid.value);
    console.log(this.itemForm.controls.uid.value);
    if (index === -1) {
      this.itemForm.controls.uid.patchValue(this.orderedItems.length);
      this.orderedItems.push(this.itemForm.value);
    } else {
      this.orderedItems[index] = this.itemForm.value;
    }
    this.reloadItemForm();
    this.calcGrandTotal();
    console.log(this.orderedItems);
  }

  calcGrandTotal() {
    let grandTotal = 0;
    this.orderedItems.forEach(el => {
      grandTotal = grandTotal + (+el.total);
    });
    this.form.controls.grandTotal.patchValue(grandTotal);
  }

  addItem(item) {
    /* const data = Object.assign({}, this.itemForm.value);*/
    const data = item;
    const itemId = data.id;
    delete data.id;
    delete data.uid;

    if (itemId == null || itemId === '') {
      this.itemService.addOrderedItem(data);
      this.toastr.success('Item Added Successfully!!!', 'Add Item');
    } else {
      this.itemService.updateOrderedItem(itemId, data);
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
    this.itemForm.controls.name.patchValue(selectedFood.name);
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
    const data = this.orderedItems.find(x => x.uid === uid);
    this.itemForm.setValue(data);
    $('#itemModal').modal('show');
  }

  deleteItem(uid: string) {
    const data = this.orderedItems.find(x => x.uid === uid);

    this.orderedItems = this.orderedItems.filter(x => x.uid !== uid);
    this.calcGrandTotal();

    if (data.id != null && data.id !== '') {
      this.deleteItems.push(data.id);
    }
  }
}
