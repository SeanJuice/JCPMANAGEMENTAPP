import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateCredentialsPageRoutingModule } from './generate-credentials-routing.module';

import { GenerateCredentialsPage } from './generate-credentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateCredentialsPageRoutingModule
  ],
  declarations: [GenerateCredentialsPage]
})
export class GenerateCredentialsPageModule {}
