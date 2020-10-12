import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateCredentialsPage } from './generate-credentials.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateCredentialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateCredentialsPageRoutingModule {}
