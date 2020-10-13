import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { DrivermodalComponent } from './drivermodal/drivermodal.component';
import { EditmodalComponent } from './editmodal/editmodal.component';

@NgModule({
  entryComponents:[DrivermodalComponent,EditmodalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,ReactiveFormsModule
  ],
  declarations: [ProfilePage,DrivermodalComponent,EditmodalComponent]
})
export class ProfilePageModule {}
