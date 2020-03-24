import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarHorarioPage } from './cadastrar-horario';

@NgModule({
  declarations: [
    CadastrarHorarioPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarHorarioPage),
  ],
})
export class CadastrarHorarioPageModule {}
