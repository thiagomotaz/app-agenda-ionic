import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TarefasPage } from '../pages/tarefas/tarefas';
import { EventosPage } from '../pages/eventos/eventos';
import { HorariosPage } from '../pages/horarios/horarios';
import { NgCalendarModule } from 'ionic2-calendar';
import { CadastrarHorarioPage } from '../pages/cadastrar-horario/cadastrar-horario';
import { CadastrarEventoPage } from '../pages/cadastrar-evento/cadastrar-evento';
import { CadastrarTarefaPage } from '../pages/cadastrar-tarefa/cadastrar-tarefa';
import { DetalhesEventoPage } from '../pages/detalhes-evento/detalhes-evento';
import { DetalhesTarefaPage } from '../pages/detalhes-tarefa/detalhes-tarefa';
import { HttpClientModule } from "@angular/common/http";
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    HorariosPage,
    TarefasPage,
    EventosPage,
    CadastrarHorarioPage,
    CadastrarEventoPage,
    CadastrarTarefaPage,
    DetalhesEventoPage,
    DetalhesTarefaPage,
    IntroPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    HttpModule,
    HttpClientModule,    
    IonicModule.forRoot(MyApp, {})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    HorariosPage,
    TarefasPage,
    EventosPage,
    CadastrarHorarioPage,
    CadastrarEventoPage,
    CadastrarTarefaPage,
    DetalhesEventoPage,
    DetalhesTarefaPage,
    IntroPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
