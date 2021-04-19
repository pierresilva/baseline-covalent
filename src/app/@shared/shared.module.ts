import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { LayoutPageComponent } from './layouts/layout-page/layout-page.component';
import { RouterModule } from '@angular/router';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { PushNotificationPWAService } from '@shared/services/push-notification-pwa.service';
import { PwaService } from '@shared/services/pwa.service';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule, RouterModule, CovalentLayoutModule],
  declarations: [LoaderComponent, LayoutPageComponent],
  exports: [LoaderComponent],
  providers: [PwaService, PushNotificationPWAService],
})
export class SharedModule {}
