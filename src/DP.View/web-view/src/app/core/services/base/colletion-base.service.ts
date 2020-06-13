import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColletionBaseService<T> {

  constructor(private db: AngularFirestore) { }

  getAll(url: string): Observable<T []> {
    return this.db.collection<T>(url).valueChanges();
  }

}
