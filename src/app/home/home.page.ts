import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private router: Router
  ) {

  }

  show = true;
  isAdmin = false;
  isStudent = false;

  ngOnInit() {
    
    if(localStorage.getItem("Admin")=='isAdmin')
    {
      this.isAdmin = true;
    }
    else if(localStorage.getItem("Admin")=='isStudent'){
      this.isStudent=true;
    }

  }

  HideHome()
  {
    this.show= false
  }
  ShowHome()
  {
    this.show= true
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


}
