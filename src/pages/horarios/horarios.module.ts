import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HorariosPage } from './horarios';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    HorariosPage,
  ],
  imports: [
    IonicPageModule.forChild(HorariosPage),
    NgCalendarModule
  ],
})
export class HorariosPageModule {}
