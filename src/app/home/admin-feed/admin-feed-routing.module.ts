import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminFeedPage } from './admin-feed.page';

const routes: Routes = [
  {
    path: '',
    component: AdminFeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminFeedPageRoutingModule {}
