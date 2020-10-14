import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { BookTripService } from './book-trip.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-book-trip',
  templateUrl: './book-trip.page.html',
  styleUrls: ['./book-trip.page.scss'],
})
export class BookTripPage implements OnInit {
  TimeoutTime:Number = 0
  GroupNumber:Number = 0
  ProjectName:string = ''
  ShowButton:boolean
  BookedButton =  false;
  isBig:boolean

  constructor(public alertcontroler: AlertController,
    public toastController: ToastController,
     public BookServ:BookTripService,
     private firestore:AngularFirestore,
     private ngZone: NgZone) { 

       this.isBig=false; 

      }

      isShown: boolean = false ; // hidden by default

      privatesubscription:Subscription;

      

  ngOnInit() {
      this.GroupNumber = 0
      this.ProjectName = ''

      this.ShowButton=true
      const id = localStorage.getItem("UmuntuId")

      //getting group Number and project name 
    this.firestore.doc(`students2/${id}`).snapshotChanges().subscribe(stud=> {
      let st: any = stud.payload.data()
      this.GroupNumber = st.GroupNo
      console.log(st)
              //get the project
                this.firestore.collection("Projects",res=>res.where('ChosenByGroup','==',Number(this.GroupNumber))).snapshotChanges().subscribe(items => {
                  items.forEach(a => {
                    let itemm: any = a.payload.doc.data()
                    itemm.id = a.payload.doc.id;
                    this.ProjectName =  itemm.Name
                  })
                })
                this.firestore.collection("Trips",res=>res.where('GroupNo','==',Number(st.GroupNo))).snapshotChanges().subscribe(items => {
                  items.forEach(a => {
                    let itemm: any = a.payload.doc.data()
                    itemm.id = a.payload.doc.id;
                    this.ProjectName =  itemm.Name
                    this.BookedButton=true
                  })
                })
    })


  }

  Show()
  {
   this.ShowButton=false
   this.BookedButton=true
  }

  Shows()
  {
   this.ShowButton=true
   this.BookedButton=false
  }

  get f(){
    return this.BookServ.form.controls;
  }


    ///booked
    async BookTrip() {
      const alert = await this.alertcontroler.create({
        cssClass: 'Confirmations',
        message:"Are you sure you want to place a trip booking?",
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
              let data= this.BookServ.form.value;
              const id = localStorage.getItem("UmuntuId")
              let start = moment(this.TimeChange(data.StartTime)).format("HH:mm")
              let end = moment(this.TimeChange(data.EndTime)).format("HH:mm")
              if (end > start) {
                data.StartTime =  start
                data.EndTime =  end;
                console.log(id," ",data," ",this.GroupNumber)
              this.BookServ.BookTrip(id,data,this.GroupNumber);
              this.BookServ.form.reset();
              this.SuccesfullyBooked()
              this.Show()
              }
              else{
                  this.TimeError()
              }
              console.log(start, '  ', end, ' ', end > start )
              //this.submit(data)
             
  
              ///
  
            }
          }
        ]
      });
  
      await alert.present();
    }

    TimeChange(time )
    {
      let time2    = moment(time, 'HH:mm:ss');
      return moment('06-17-2015').set({
        hour:   time2.get('hour'),
        minute: time2.get('minute'),
        second: time2.get('second')
      }).format("YYYY-MM-DD HH:mm:ss")
    }
  
    async SuccesfullyBooked() {
      const toast = await this.toastController.create({
        message: 'Project trip successfully booked .',
        position:"middle",
        cssClass: "MyToasts",
        duration: 2000
      });
      toast.present();
    }
    async TimeError() {
      const toast = await this.toastController.create({
        message: 'Time end time cannot  less than. start time',
        position:"middle",
        color:'danger',
        duration: 2000
      });
      toast.present();
    }
    async CancelTRipConfirmation() {
      const alert = await this.alertcontroler.create({
        cssClass: 'Confirmations',
        message:"Are you sure you want to cancel this project trip?",
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
              const id = localStorage.getItem("UmuntuId")
              this.BookServ.CancelTrip(id)
              this.Shows()
            }
          }
        ]
      });
  
      await alert.present();
    }

////check user activity
async TimeOut(counter) {
  let   count = counter
   const alert = await this.alertcontroler.create({
     cssClass: 'Confirmations',
     message:`You have been inactive for 5 min (you will be logged out in ${count} min)?`,
     buttons: [
       {
         text: 'No',
         role: 'cancel',
         cssClass: 'secondary',
         handler: () => {
           console.log('Confirm Cancel');
         }
       }
     ]
     })
   }

   async LocationService() {
    this.isShown = ! this.isShown;
  }

  onSubmit()
  {
    
  }
}
