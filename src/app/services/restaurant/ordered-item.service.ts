import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface OrderedItem {
  item: string;
  price: number;
  quantity: number;
  total: number;
  name: string;
  orderid: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderedItemService {

  private OrderedItemsCollection: AngularFirestoreCollection<OrderedItem>;
  private OrderedItems: Observable<OrderedItem[]>;

  constructor(private db: AngularFirestore) {

    this.OrderedItemsCollection = db.collection<OrderedItem>('TBL_ORDERED_ITEM');

    this.OrderedItems = this.OrderedItemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getOrderedItemsList() {
    return this.OrderedItems;
  }

  getOrderedItemById(id) {
    return this.OrderedItemsCollection.doc<OrderedItem>(id).valueChanges();
  }

  getOrderedItemByOrderId(id) {
    return this.db.collection('TBL_ORDERED_ITEM', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (id) { query = query.where('orderId', '==', id) };
      return query;
    }).snapshotChanges();
  }

  updateOrderedItem(id: string, orderedItem: OrderedItem) {
    return this.OrderedItemsCollection.doc(id).update(orderedItem);
  }

  addOrderedItem(orderedItem: OrderedItem) {
    return this.OrderedItemsCollection.add(orderedItem);
  }

  deleteOrderedItem(id: string) {
    return this.OrderedItemsCollection.doc(id).delete();
  }
}
