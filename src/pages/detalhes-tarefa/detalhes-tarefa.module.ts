import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesTarefaPage } from './detalhes-tarefa';

@NgModule({
  declarations: [
    DetalhesTarefaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesTarefaPage),
  ],
})
export class DetalhesTarefaPageModule {}
