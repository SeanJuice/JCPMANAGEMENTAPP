import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { AudittrailService } from 'src/app/Shared/audittrail.service';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private firestore:AngularFirestore,private toastController:ToastController,
    public auditService:AudittrailService) { }

  CheckInTool(TooldId:string)
  {
    this.firestore.collection("Tools").doc(TooldId).update({
      ToolStatusID: "Available",
      Message: "Tool Not Available!"
    }).then(rr=>{
      let id= localStorage.getItem("UmuntuId")
      let action=` Checked in tool`
      this.auditService.audit(id, action)
      this.SuccessfullyCheckIn()
    })
  }
  CheckOutTool(TooldId:string)
  {
    this.firestore.collection("Tools").doc(TooldId).update({
     
      ToolStatusID: "CheckedOut",
      Message: "Tool Cannot be borrow at the moment!"
    }).then(eer=>{
      let id= localStorage.getItem("UmuntuId")
      let action=` Checked out tool`
      this.auditService.audit(id, action)
      this.SuccessfullyCheckout()
    })
  }

  async SuccessfullyCheckout() {
    const toast = await this.toastController.create({
      message: 'Tool Successfully checked Out.',
      position:"middle",
      cssClass: "MyToasts",
      duration: 2000
    });
    toast.present();
  }
  async SuccessfullyCheckIn() {
    const toast = await this.toastController.create({
      message: 'Tool Successfully checked In.',
      position:"middle",
      cssClass: "MyToasts",
      duration: 2000
    });
    toast.present();
  }
}
