import { Trip } from './Trip.model';
import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import {AudittrailService} from './audittrail.service';
@Injectable({
  providedIn: 'root'
})
export class BookTripService {

  constructor(private firestore: AngularFirestore,
    public fb: FormBuilder,
    public auditService:AudittrailService) { }
  NamePattern = "^([A-z0-9À-ž ]){2,}$";
  NumbePattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  

  form =  this.fb.group({
    Description: ['',[Validators.required,Validators.pattern(this.NamePattern)]],
    Date: ['',[Validators.required]],
    Location: ['',[Validators.required]],
    StartTime: ['',[Validators.required]],
    EndTime: ['',[Validators.required]],
    Status:  ['',[Validators.required,Validators.pattern(this.NamePattern)]],
    DriverID:  ['',[Validators.required,Validators.pattern(this.NamePattern)]],
    ProjectName:['',[Validators.required,Validators.pattern(this.NamePattern)]],
    GroupNo: ['',[Validators.required]],
  })

  BookTrip(id:string,data,GroupNumber)
  {
    var format = 'HH:mm:ss'
    let GroupNo = "30"
    data.DriverID =""
    data.Status = 'Available'
   
    this.firestore.collection('Trips').doc(id).set(
      {
        GroupNo:GroupNumber,
        Description: data.Description,
        Date: data.Date,
        StartTime: data.StartTime,
        EndTime: data.EndTime,
        Location: data.Location,
        DriverID: data.DriverID,
        ProjectName: data.ProjectName,
        Status:data.Status
      }
    ).then(res=>{
      let id= localStorage.getItem("UmuntuId")
      let action=` Student booked trip`
      this.auditService.audit(id, action)
    });
    console.log("done")
  }
 TransformTime(Time)
 {
   let time2
  return moment(Time, 'HH:mm:ss');

 }
 
  CancelTrip(id){
    this.firestore.doc(`Trips/${id}`).delete()
  }
}
