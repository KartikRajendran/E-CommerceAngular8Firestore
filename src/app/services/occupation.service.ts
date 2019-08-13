import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Service {
  name: string;
  product_type: string;
  description: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class OccupationService {

  private ServicesCollection: AngularFirestoreCollection<Service>;
  private Services: Observable<Service[]>;

  constructor(private db: AngularFirestore) {

    this.ServicesCollection = db.collection<Service>('TBL_SERVICE');

    this.Services = this.ServicesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getServicesList() {
    return this.Services;
  }

  getServiceById(id) {
    return this.ServicesCollection.doc<Service>(id).valueChanges();
  }

/*   getServiceByStatus(status: string) {

    return this.db.collection('TBL_Service_', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (status) { query = query.where('status', '==', status) };
      return query;
    }).snapshotChanges();

  } */

  updateService(id: string, service: Service) {
    return this.ServicesCollection.doc(id).update(service);
  }

  addService(service: Service) {
    return this.ServicesCollection.add(service);
  }

  deleteService(id: string) {
    return this.ServicesCollection.doc(id).delete();
  }
}
