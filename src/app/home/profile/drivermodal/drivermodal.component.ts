import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Driver } from 'src/app/Shared/driver.model';

@Component({
  selector: 'app-drivermodal',
  templateUrl: './drivermodal.component.html',
  styleUrls: ['./drivermodal.component.scss'],
})
export class DrivermodalComponent implements OnInit {
  @Input() DriverID: string;
  Adriver: Driver = new Driver()
  constructor(private firestore: AngularFirestore, private modalCtrl:ModalController) { }
    ID:string;
    Show:boolean;

  ngOnInit() {
    //check if theres a driver assigned 
    this.ID= this.DriverID;
    console.log(this.ID)
    if(this.ID == 'None')
    {
        this.Show =false;
    }
    else{
      
      this.firestore.doc(`Drivers/${this.ID}`).snapshotChanges().subscribe(items=>{
        let item:any = items.payload.data()
        this.Adriver = item
        this.Show =true;
    })
    
  }
 }
 dismiss() {
  // using the injected ModalController this page
  // can "dismiss" itself and optionally pass back data
  this.modalCtrl.dismiss({
    'dismissed': true
  });
}
}
