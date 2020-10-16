import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, ToastController, IonContent } from '@ionic/angular';
import {AdminFeedService} from './adminfeed.service';
import {Post} from './newsfeed.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import {FileUpload} from './file.model';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-feed',
  templateUrl: './admin-feed.page.html',
  styleUrls: ['./admin-feed.page.scss'],
})
export class AdminFeedPage implements OnInit {

  constructor(private alertcontroler: AlertController,
    private toastController: ToastController, 
    public adminFeedService:AdminFeedService,  
    private firestore: AngularFirestore,
    private db:AngularFireDatabase,
    private logout:AppComponent,
    private router:Router,
    private angularFireAuth:AngularFireAuth) { }

    @ViewChild(IonContent, {static: true}) content: IonContent

    Showeditbutton:boolean;
    Showaddbutton:boolean;
    Description
    post:Post = new Post();
    Posts =[]
    currentFileUpload: FileUpload;
    selectedFiles: FileList; 
    progress: { percentage: number } = { percentage: 0 };
    SavedID:string

  //searching
  @ViewChild('searchbar',{static: true}) searchbar: ElementRef;
  searchText = '';
  toggleSearch: boolean = false;

  ngOnInit() {
    this.Showeditbutton=false;
    this.Showaddbutton=true;

    this.firestore.collection("Posts").snapshotChanges().subscribe(items=>{
      this.Posts =[];
      items.forEach(a=>{
        let item:any = a.payload.doc.data()
        item.id = a.payload.doc.id;
        this.Posts.push(item)
      })
      console.log(this.Posts)
    })
  }

  show(id)
  {
    this.firestore.doc(`Posts/${id}`).snapshotChanges().subscribe(items=>{
      let datetem:any = items.payload.data()
          this.post.Description= datetem.Description
         // datetem.Id = items.payload.id
          this.adminFeedService.form.setValue(datetem)
        })
 
          this.SavedID=id
          this.ScrollToTop()
          this.Showeditbutton=true;
          this.Showaddbutton=false;
    
  }

    ///
    async ConfirmationDelete(id:string,Url:string) {
    
      const alert = await this.alertcontroler.create({
        cssClass: 'Confirmations',
        message:"Are you sure you want to delete this post ?",
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
             //this.show()
             this.adminFeedService.DeletePost(id,Url)
             this.SuccesfullyDeleted()
             this.adminFeedService.form.reset()
            }
          }
        ]
      });
  
      await alert.present();
    }

    async SuccesfullyDeleted() {
      const toast = await this.toastController.create({
        message: 'Post successfully deleted .',
        position:"middle",
        color:"secondary",
        duration: 2000
      });
      toast.present();
    }

    async ConfirmationPost(id) {
      if (this.Showeditbutton == true )
      {
        const alert = await this.alertcontroler.create({
          cssClass: 'Confirmations',
          message:"Are you sure you want make changes ?",
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
                let data= this.adminFeedService.form.value;
                console.log(id)
                this.adminFeedService.UpdatePost(id,data)
                this.adminFeedService.form.reset
                this.Showeditbutton=false;
                this.Showaddbutton=true;
                this.SavedID=""
                this.adminFeedService.form.reset()
               //this.show()
               //this.SuccesfullyDeleted()
               
              }
            }
          ]
        });
    
        await alert.present();
      }
      else{
        const alert = await this.alertcontroler.create({
          cssClass: 'Confirmations',
          message:"Are you sure you want to  post ?",
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
                
                let data= this.adminFeedService.form.value;
                console.log(data)
                this.upload(data)
               
               //this.show()
               
               this.SuccesfullyDeleted()
               
              }
            }
          ]
        });
    
        await alert.present();
      }
  
    }

  //goes to the top when you click edit
  ScrollToTop() {
    this.content.scrollToTop(1500);
    }

    selectFile(event) {
      this.selectedFiles = event.target.files;
      }

      upload(data)
      {
        const file = this.selectedFiles.item(0);
        this.selectedFiles = undefined;
        this.currentFileUpload = new FileUpload(file);
        let fileT = this.currentFileUpload.file.type
        console.log( this.currentFileUpload.file.type)
        if(fileT=="video/mp4" || fileT=="image/jpeg" || fileT=="image/png")
        {
          this.adminFeedService.pushFileToStorage(this.currentFileUpload,"Posts",data,this.progress)
        }
        //
      }

      filetypeCheker(file)
      {
        if(file=="video/mp4")
        {
          return true
        }
        else{
          return false
        }
      }

      LogOut()
      {
        this.angularFireAuth.signOut()
        localStorage.clear()
        this.router.navigate([''])
      }


}
