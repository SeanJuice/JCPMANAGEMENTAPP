import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AudittrailService {
  //not in local
 date = moment.utc().format('YYYY-MM-DD HH:mm:ss').toString()

  constructor(private firestore: AngularFirestore,
    private db: AngularFireDatabase) { }


    audit(id, action)
    {
      this.firestore.collection("AuditTrail").add({
        id: id,
        action: action,
        date: this.date
      })
    }
}
