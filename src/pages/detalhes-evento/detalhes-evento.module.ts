import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesEventoPage } from './detalhes-evento';

@NgModule({
  declarations: [
    DetalhesEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesEventoPage),
  ],
})
export class DetalhesEventoPageModule {}
