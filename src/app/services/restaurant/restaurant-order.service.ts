import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RestaurantOrder {
  orderNumber: number;
  customerName: string;
  paymentMethod: string;
  grandTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantOrderService {

  private RestaurantOrdersCollection: AngularFirestoreCollection<RestaurantOrder>;
  private RestaurantOrders: Observable<RestaurantOrder[]>;

  constructor(private db: AngularFirestore) {

    this.RestaurantOrdersCollection = db.collection<RestaurantOrder>('TBL_RESTAURANT_ORDER');

    this.RestaurantOrders = this.RestaurantOrdersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getRestaurantOrdersList() {
    return this.RestaurantOrders;
  }

  getRestaurantOrderById(id) {
    return this.RestaurantOrdersCollection.doc<RestaurantOrder>(id).valueChanges();
  }

  updateRestaurantOrder(id: string, restaurantOrder: RestaurantOrder) {
    return this.RestaurantOrdersCollection.doc(id).update(restaurantOrder);
  }

  addRestaurantOrder(restaurantOrder: RestaurantOrder) {
    return this.RestaurantOrdersCollection.add(restaurantOrder);
  }

  deleteRestaurantOrder(id: string) {
    return this.RestaurantOrdersCollection.doc(id).delete();
  }
}
