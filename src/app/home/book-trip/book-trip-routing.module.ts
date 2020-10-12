import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookTripPage } from './book-trip.page';

const routes: Routes = [
  {
    path: '',
    component: BookTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookTripPageRoutingModule {}
