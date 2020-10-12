import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookTripPageRoutingModule } from './book-trip-routing.module';

import { BookTripPage } from './book-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookTripPageRoutingModule
  ],
  declarations: [BookTripPage]
})
export class BookTripPageModule {}
