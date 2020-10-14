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
      try{
        this.AfAuth.signInWithEmailAndPassword(form.email,form.password).then(res=>{
          const uid =res.user.uid;
  
                this.firestore.collection("Users").snapshotChanges().subscribe(items=>{
                  items.forEach(a=>{
                    let item:any = a.payload.doc.data()
                    item.id = a.payload.doc.id;
                   if(item.id === uid && item.UserTypeID == "Admin")
                    {
                      this.checkVerified(res)
                      localStorage.setItem("UmuntuId",uid);
                      localStorage.setItem("Admin","isAdmin");
                       this.router.navigate(['home/scanner']) 
                    }
                    else if(item.id === uid && item.UserTypeID == "Student")
                    {
  
                      this.checkVerified(res)
                      localStorage.setItem("UmuntuId",uid);
                      localStorage.setItem("Admin","isStudent");
                      this.router.navigate(['home/newsfeed']) 
                    }
  
                  })
                })
        })
      }
      catch(e)
      {
        console.log(e)
      }
  
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

