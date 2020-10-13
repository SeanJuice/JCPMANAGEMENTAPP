import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AudittrailService {

  date = Date.now()

  constructor(private firestore: AngularFirestore,
) { }


    audit(id, action)
    {
      this.firestore.collection("AuditTrail").add({
        id: id,
        action: action,
        date: this.date
      })
    }
}
