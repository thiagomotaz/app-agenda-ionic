import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarTarefaPage } from './cadastrar-tarefa';

@NgModule({
  declarations: [
    CadastrarTarefaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarTarefaPage),
  ],
})
export class CadastrarTarefaPageModule {}
