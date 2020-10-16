import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router:Router,private AfAuth:AngularFireAuth,private afS:AngularFirestore) { }
  logout(){
    this.AfAuth.signOut()
    this.router.navigate([''])
  }
 
}
