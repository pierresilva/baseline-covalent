import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared';
import { HomeComponent } from './home.component';
import { MaterialModule } from '@app/material.module';
import { CovalentModule } from '@app/covalent.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MaterialModule, CovalentModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
