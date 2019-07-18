import { Injectable, Query } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  name: string;
  email: string;
  password: string;
  created_at: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(private db: AngularFirestore) {

    this.usersCollection = db.collection<User>('TBL_USER');

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getUsersList() {
    return this.users;
  }

  getUserById(id) {
    return this.usersCollection.doc<User>(id).valueChanges();
  }

  getUserByEmail(email: string) {

    return this.db.collection('TBL_USER', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (email) { query = query.where('email', '==', email) };
      return query;
    }).snapshotChanges();

    // const ref = await this.db.collection('TBL_USER').where('email', '==', email).get();
    // return ref.docs[0].data();
  }

  updateUser(id: string, user: User) {
    return this.usersCollection.doc(id).update(user);
  }

  addUser(user: User) {
    return this.usersCollection.add(user);
  }

  deleteUser(id: string) {
    return this.usersCollection.doc(id).delete();
  }

}
