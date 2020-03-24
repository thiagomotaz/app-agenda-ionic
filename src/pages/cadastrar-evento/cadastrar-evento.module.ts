import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarEventoPage } from './cadastrar-evento';

@NgModule({
  declarations: [
    CadastrarEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarEventoPage),
  ],
})
export class CadastrarEventoPageModule {}
