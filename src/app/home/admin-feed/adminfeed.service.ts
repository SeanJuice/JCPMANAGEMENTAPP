import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase} from '@angular/fire/database';
import {Post } from './newsfeed.model';
import { FileUpload } from './file.model';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireStorage} from '@angular/fire/storage'
@Injectable({
  providedIn: 'root'
})
export class AdminFeedService {
  
  DescriptionPattern = "^([A-z0-9À-ž ]){2,}$";

  form =  this.fb.group({
   Description: ['',[Validators.required,Validators.pattern(this.DescriptionPattern)]],
   Date: ['',[Validators.required,Validators.pattern(this.DescriptionPattern)]],
   Url: ['',[Validators.required,Validators.pattern(this.DescriptionPattern)]],
  })

 constructor(private firestore: AngularFirestore,public fb: FormBuilder
  ,private db: AngularFireDatabase,private storage: AngularFireStorage) { }
  id:string
 //Add 
 AddPost(data,fileType){

 
     data.Date=Date.now(); 
    data.fileType =  fileType

      return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("Posts")
            .add(data)
            ;
    })
}
//Remove 
DeletePost(id,downloadUrl) {
  this.firestore.doc(`Posts/${id}`).delete();
  
  this.storage.storage.refFromURL(downloadUrl).delete();
  
  }
 
 //Update
 UpdatePost(id:any,data:any) {
  this.firestore.doc(`Posts/${id}`).update({
    Description: data.Description
  });
  }

  pushFileToStorage(fileUpload: FileUpload,basePath:string,data:Post,progress: { percentage: number }) {
    //this declares the path per user  userId/TypeOfdocument/TheDocument /${TypeOFDoc}
    let alreadyRan = true;
   let basePath1 = `/${basePath}`;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${basePath1}/${fileUpload.file.name}`).put(fileUpload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
        (error) =>{
          console.log(error)
        },
      ()=>{
        //success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          console.log(downloadURL)
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.id=fileUpload.url
          data.Url = this.id
          console.log("here", data)
          if(alreadyRan == true)
          {
            this.AddPost(data,fileUpload.file.type)
            alreadyRan =false;
          }
         
          console.log("successful") 
        });
      }

    )
  }
  //saved the data in the database called in the previous function

}
