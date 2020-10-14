import { ProfileService } from './../profile.service';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.scss'],
})
export class EditmodalComponent implements OnInit {
  @Input() tripID: string;
  localId:string
  constructor(public EditServe:ProfileService,private firestore: AngularFirestore,
    private alertcontroler:AlertController,
    private modalCtrl: ModalController,private toastController:ToastController) { }

  ngOnInit() {
   
    this.firestore.doc(`Trips/${this.tripID}`).snapshotChanges().subscribe(items=>{
      let item:any = items.payload.data()
      console.log(item)
     this.EditServe.form.setValue(item)
    })
    //console.log(this.DriverID)
  }

  

  async  onSubmit() {
    const alert = await this.alertcontroler.create({
      cssClass: 'Confirmations',
      message:"Are you sure you want to change values?",
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
            let data= this.EditServe.form.value;
            console.log(data, " ", this.tripID)
            this.EditServe.update(data,this.tripID)
            this.Successs()
            this.dismiss()
          }
        }
      ]
    });

    await alert.present();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async Successs() {
    const toast = await this.toastController.create({
      message: ' successfully Updated.',
      position:"middle",
      cssClass: "MyToasts",
      duration: 2000
    });
    toast.present();
  }

}
