import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  product_name: string;
  product_type: string;
  description: string;
  price: number;
  discount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;

  constructor(private db: AngularFirestore) {

    this.productsCollection = db.collection<Product>('TBL_PRODUCT');

    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getProductsList() {
    return this.products;
  }

  getProductById(id) {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

/*   getProductByStatus(status: string) {

    return this.db.collection('TBL_PRODUCT_', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (status) { query = query.where('status', '==', status) };
      return query;
    }).snapshotChanges();

  } */

  updateProduct(id: string, product: Product) {
    return this.productsCollection.doc(id).update(product);
  }

  addProduct(product: Product) {
    return this.productsCollection.add(product);
  }

  deleteProduct(id: string) {
    return this.productsCollection.doc(id).delete();
  }

}
