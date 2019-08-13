import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Category {
  name: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private CategorysCollection: AngularFirestoreCollection<Category>;
  private Categorys: Observable<Category[]>;

  constructor(private db: AngularFirestore) {

    this.CategorysCollection = db.collection<Category>('TBL_CATEGORY');

    this.Categorys = this.CategorysCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getCategorysList() {
    return this.Categorys;
  }

  getCategoryById(id) {
    return this.CategorysCollection.doc<Category>(id).valueChanges();
  }

  getCategoryByStatus(status: string) {

    return this.db.collection('TBL_CATEGORY', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (status) { query = query.where('status', '==', status) };
      return query;
    }).snapshotChanges();

  }

  updateCategory(id: string, category: Category) {
    return this.CategorysCollection.doc(id).update(category);
  }

  addCategory(category: Category) {
    return this.CategorysCollection.add(category);
  }

  deleteCategory(id: string) {
    return this.CategorysCollection.doc(id).delete();
  }
}
