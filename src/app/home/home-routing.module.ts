
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'book-trip',
        loadChildren: () => import('./book-trip/book-trip.module').then( m => m.BookTripPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'newsfeed',
        loadChildren: () => import('./newsfeed/newsfeed.module').then( m => m.NewsfeedPageModule)
      },
      {
        path: 'scanner',
        loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
      },
      {

        path: 'landing-page',
        loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
      },
      {
        path: 'admin-feed',
        loadChildren: () => import('./admin-feed/admin-feed.module').then( m => m.AdminFeedPageModule)
      }
    ]
  },
  
    ]
  },
 


  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
