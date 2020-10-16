import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { CheckinService } from './checkin.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  constructor(private Service:CheckinService,private db:AngularFirestore,private toastController:ToastController,public logoutService: AppComponent) { }
  qrResultString: string;

  ngOnInit() {
  }

  clearResult(): void {
    this.qrResultString = null;
  }
  
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }
  
  ScanIn(ToolID)
  {
    this.db.collection("Tools",res=>res.where('ToolStatusID','==','CheckedOut')).snapshotChanges().subscribe(items => {

      items.forEach(a => {
        let item: any = a.payload.doc.data()
        item.id = a.payload.doc.id;
          console.log(item.id,' ',ToolID)
        if(item.id == ToolID )
        {
          this.Service.CheckInTool(ToolID)
          this.clearResult()
        }
        else{
          this.NotFound()
        }
        
      })
    })
   
  }
    
  ScanOut(ToolID)
  {
    this.db.collection("Tools",res=>res.where('ToolStatusID','==','Accepted')).snapshotChanges().subscribe(items => {

      items.forEach(a => {
        let item: any = a.payload.doc.data()
        item.id = a.payload.doc.id;

        if(item.id == ToolID )
        {
          this.Service.CheckOutTool(ToolID)
          this.clearResult()
        }
        else{
          this.NotFound()
        }
        
      })
    })
  }

  async NotFound() {
    const toast = await this.toastController.create({
      message: 'Tool does not exist or is already scanned out.',
      position:"middle",
      cssClass: "MyToasts",
      duration: 2000
    });
    toast.present();
  }

  
  
}
