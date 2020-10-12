import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from 'src/app/Shared/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router,private AfAuth:AngularFireAuth, private authServ: AuthService,private firestore:AngularFirestore) { }
  user: User = new User();
  ngOnInit() {
  }
  onSubmit(form)
  {
      console.log(form.value)
      // this.AfAuth.signInWithEmailAndPassword(form.email,form.password).then(res=>{
      //   const uid =res.user.uid;

      //         this.firestore.collection("Users").snapshotChanges().subscribe(items=>{
      //           items.forEach(a=>{
      //             let item:any = a.payload.doc.data()
      //             item.id = a.payload.doc.id;
      //            if(item.id === uid && item.UserTypeID == "Admin")
      //             {
      //               localStorage.setItem('UmuntuId', uid);
      //               this.checkVerified(res)
      //              // this.router.navigate(['./administrator']) 
      //             }
      //             else if(item.id === uid && item.UserTypeID == "Student")
      //             {
      //               localStorage.setItem('UmuntuId', uid);
      //               this.checkVerified(res)
      //               //this.router.navigate(['./students']) 
      //             }

      //           })
      //         })
      // })
  }
  checkVerified(res)
  {
    if(res.user.emailVerified ==false)
    {
      window.alert('Please validate your email address. Kindly check your inbox.');
    }
  }
}
export class User {

  Email: string;
  Password: string;

}

