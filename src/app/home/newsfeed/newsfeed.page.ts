import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.page.html',
  styleUrls: ['./newsfeed.page.scss'],
})
export class NewsfeedPage implements OnInit {

 
  constructor( private firestore: AngularFirestore, public logoutService: AppComponent) { }
  Posts =[]
  ngOnInit() {
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
     
  filetypeChecker(file)
  {
    if(file=="video/mp4")
    {
      return true
    }
    else{
      return false
    }
  }
}
