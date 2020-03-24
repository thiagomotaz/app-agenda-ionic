import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { EventosPage } from '../pages/eventos/eventos';
import { TarefasPage } from '../pages/tarefas/tarefas';
import { HorariosPage } from '../pages/horarios/horarios';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { Events } from 'ionic-angular';


var rootPagex: any;
if ((localStorage.getItem('primeiro') == 'nao')) {
  rootPagex = LoginPage;
  if (localStorage.getItem('id')) {
    rootPagex = HomePage;
  }
}
else {
  rootPagex = IntroPage;
}



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: any = rootPagex;

  public nome;
  public id;
  public email;
  public foto;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, private events: Events
  ) {
    events.subscribe('dados', (nomex, emailx, idx, fotox) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.nome = nomex;
      this.id = idx;
      this.email = emailx;
      this.foto = fotox;
      // console.log('Welcome', user, 'at', time);
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Painel', component: HomePage, icon: 'home' },
      { title: 'Horários', component: HorariosPage, icon: 'calendar' },
      { title: 'Eventos', component: EventosPage, icon: 'wine' },
      { title: 'Tarefas', component: TarefasPage, icon: 'construct' }
    ];

  }

  atualizarDados() {
    this.nome = localStorage.getItem('nome');
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
    this.foto = localStorage.getItem('foto');
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == HomePage) {
      this.nav.setRoot(HomePage);
    }
    else {
      this.nav.push(page.component);
    }


  }

  logout() {
    // sessionStorage.removeItem("email");
    // sessionStorage.removeItem("foto");
    // sessionStorage.removeItem("nome");
    // sessionStorage.removeItem("id");
    // this.nav.setRoot(HomePage);
    // this.nav.popAll();
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('nome');
    localStorage.removeItem('foto');
    this.menuCtrl.enable(false, 'menu-material');
    this.nav.setRoot(LoginPage);
  }
}
