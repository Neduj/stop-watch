import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { DisplayComponent } from './display/display.component';

const STOPWACTH_COMPONENTS = [DisplayComponent];

@NgModule({
  declarations: [...STOPWACTH_COMPONENTS],
  imports: [CommonModule, MaterialModule],
  exports: [...STOPWACTH_COMPONENTS, CommonModule],
})
export class StopWatchModule {}
