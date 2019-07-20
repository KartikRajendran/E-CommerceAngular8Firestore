import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Food {
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private FoodsCollection: AngularFirestoreCollection<Food>;
  private Foods: Observable<Food[]>;

  constructor(private db: AngularFirestore) {

    this.FoodsCollection = db.collection<Food>('TBL_FOOD');

    this.Foods = this.FoodsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getFoodsList() {
    return this.Foods;
  }

  getFoodById(id) {
    return this.FoodsCollection.doc<Food>(id).valueChanges();
  }

  updateFood(id: string, food: Food) {
    return this.FoodsCollection.doc(id).update(food);
  }

  addFood(food: Food) {
    return this.FoodsCollection.add(food);
  }

  deleteFood(id: string) {
    return this.FoodsCollection.doc(id).delete();
  }
}
