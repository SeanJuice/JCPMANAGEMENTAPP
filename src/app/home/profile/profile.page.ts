import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Studentt } from 'src/app/Shared/student.model';
import { Trip } from 'src/app/Shared/Trip.model';
import { DrivermodalComponent } from './drivermodal/drivermodal.component';
import { EditmodalComponent } from './editmodal/editmodal.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  Studentid:any
  constructor( 
    private firestore: AngularFirestore,
       private ModalCtrl:ModalController,
       private alertcontroler:AlertController
) { 


}

Atrip: Trip = new Trip()
id:string
GroupNumber:Number
showMessage = true

 Student:Studentt =  new Studentt()
 HoursWorked = 0
  ngOnInit() {
    
    
        this.getStudent();
        this.getTripDetails();
  }


  getTripDetails()
  {
    if(this.Atrip==null)
    {
      let FalseTrip: Trip = new Trip()
      this.Atrip.Date =''
      this.Atrip.Description=''
      this.Atrip.Location=''
      this.Atrip.ProjectName=''
      this.Atrip.Status=''
      this.Atrip.StartTime=''
      this.Atrip.EndTime=''
      this.Atrip.DriverID=''
    }


   this.firestore.doc(`students2/${this.Studentid}`).snapshotChanges().subscribe(stud=> {
     let st: any = stud.payload.data()
     this.GroupNumber = st.GroupNo
     console.log(st)
             //get the project
               this.firestore.collection("Projects",res=>res.where('ChosenByGroup','==',Number(this.GroupNumber))).snapshotChanges().subscribe(items => {
                 items.forEach(a => {
                   let itemm: any = a.payload.doc.data()
                   itemm.id = a.payload.doc.id;
                   st.ProjectName =  itemm.Name
                 })
               })
   })

   this.firestore.collection("Trips",res=>res.where('GroupNo','==',Number(this.GroupNumber))).snapshotChanges().subscribe(items => {
     items.forEach(a => {
       let itemm: any = a.payload.doc.data()
       itemm.id = a.payload.doc.id;
       this.Atrip = itemm;

       this.Atrip.DriverID = itemm.DriverID;
     })
   })

  }
  getStudent()
  {


    this.firestore.doc(`students2/${this.Studentid}`).snapshotChanges().subscribe(items=>{
      let item:any = items.payload.data()
      console.log(item)
      this.Student = item

    })
  }


  ///Modals
  async open(Driverid) {
    const modal = await this.ModalCtrl.create({
      component:DrivermodalComponent,
      cssClass:"Profile",
      componentProps:{
        DriverID: Driverid
      }
    });
    await modal.present()
  }
  async openEdit(Driverid) {
    const modal = await this.ModalCtrl.create({
      component:EditmodalComponent,
      cssClass:"Profile",
      componentProps:{
        DriverID: this.id
      }
    });
    await modal.present()
  }
  //confirm remove
  async  RomoveBookConfirm() {
    const alert = await this.alertcontroler.create({
      cssClass: 'alertCustomCss',
      message:"Are you sure you want unbook the trip?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
           /// this.EditServe.Delete(this.id)
          }
        }
      ]
    });

    await alert.present();
  }

}
