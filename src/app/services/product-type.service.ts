import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ProductType {
  product_type: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  private productTypesCollection: AngularFirestoreCollection<ProductType>;
  private productTypes: Observable<ProductType[]>;

  constructor(private db: AngularFirestore) {

    this.productTypesCollection = db.collection<ProductType>('TBL_PRODUCT_TYPE');

    this.productTypes = this.productTypesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getProductTypesList() {
    return this.productTypes;
  }

  getProductTypeById(id) {
    return this.productTypesCollection.doc<ProductType>(id).valueChanges();
  }

  getProductTypeByStatus(status: string) {

    return this.db.collection('TBL_PRODUCT_TYPE', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (status) { query = query.where('status', '==', status) };
      return query;
    }).snapshotChanges();

  }

  updateProductType(id: string, productType: ProductType) {
    return this.productTypesCollection.doc(id).update(productType);
  }

  addProductType(productType: ProductType) {
    return this.productTypesCollection.add(productType);
  }

  deleteProductType(id: string) {
    return this.productTypesCollection.doc(id).delete();
  }
}
