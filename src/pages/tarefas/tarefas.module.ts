import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefasPage } from './tarefas';

@NgModule({
  declarations: [
    TarefasPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefasPage),
  ],
})
export class TarefasPageModule {}
