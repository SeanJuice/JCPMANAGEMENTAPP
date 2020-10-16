import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

import { Studentt } from 'src/app/Shared/student.model';
import { Trip } from 'src/app/Shared/Trip.model';
import { DrivermodalComponent } from './drivermodal/drivermodal.component';
import { EditmodalComponent } from './editmodal/editmodal.component';
import { ProfileService } from './profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  Studentid=localStorage.getItem("UmuntuId")
  progressPercent = 0 
  constructor( 
    private firestore: AngularFirestore,
       private ModalCtrl:ModalController,
       private alertcontroler:AlertController,
       public EditServe:ProfileService,
       public logoutService: AppComponent
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
      this.Atrip.id=''
    }


   this.firestore.doc(`students2/${this.Studentid}`).snapshotChanges().subscribe(stud=> {
     let st: any = stud.payload.data()
     this.GroupNumber = st.GroupNo
     console.log('here hre',this.GroupNumber)
     this.progressPercent = (st.HoursWorked/40)
    
     console.log(this.progressPercent)
             //get the project
               this.firestore.collection("Projects",res=>res.where('ChosenByGroup','==',Number(this.GroupNumber))).snapshotChanges().subscribe(items => {
                 items.forEach(a => {
                   let itemm: any = a.payload.doc.data()
                   itemm.id = a.payload.doc.id;
                   st.ProjectName =  itemm.Name
                 })
               })
               this.firestore.collection("Trips",res=>res.where('GroupNo','==',Number(st.GroupNo))).snapshotChanges().subscribe(items => {
                items.forEach(a => {
                  this.showMessage =false
                  let itemm: any = a.payload.doc.data()
                  itemm.id = a.payload.doc.id;
                  this.Atrip = itemm;
                   console.log(this.Atrip)
                  this.Atrip.DriverID = itemm.DriverID;
                })
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
        tripID: Driverid
      }
    });
    await modal.present()
  }
  //confirm remove
  async  RemoveBookConfirm(id) {
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
           this.EditServe.Delete(id)
          }
        }
      ]
    });

    await alert.present();
  }

}
