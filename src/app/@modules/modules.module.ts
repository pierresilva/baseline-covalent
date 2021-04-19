import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, ModulesRoutingModule],
})
export class ModulesModule {}
