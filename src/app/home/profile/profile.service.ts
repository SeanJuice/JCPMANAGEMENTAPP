import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { AudittrailService } from 'src/app/Shared/audittrail.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(
    public fb: FormBuilder,
    ) { }
  NamePattern = "^([A-z0-9À-ž ]){2,}$";
  NumbePattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  

  form =  this.fb.group({
    Date: ['',[Validators.required]],
    Description: ['',[Validators.required,Validators.pattern(this.NamePattern)]],
    DriverID:  ['',[Validators.required,Validators.pattern(this.NamePattern)]],
    Location: ['',[Validators.required]],
    ProjectName:['',[Validators.required,Validators.pattern(this.NamePattern)]],
    Status:  ['',[Validators.required,Validators.pattern(this.NamePattern)]],
    Time: ['',[Validators.required,Validators.pattern(this.NumbePattern)]],
    GroupNo:['',[Validators.required]],
  })


   //Delete the record 
   Delete(id) {
    // this.firestore.doc(`Trips/${id}`).delete().then(res=>{
    //   let id= localStorage.getItem("UmuntuId")
    //   let action=`Deleted trip`
    // })
   
  }
  //Updating the admin
  update(data,id){
    
    // this.firestore.doc(`Trips/${id}`).update(data).then(res=>{
    //   let id= localStorage.getItem("UmuntuId")
    //   let action=` Updated trip details  `
    //   })
    
  }
}
