import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  slides = [
    {
      title: "Bem Vindo ao OUR TIME!",
      description: "Agora gerenciar sua agenda escolar ficou muito mais fácil.",
      image: "assets/imgs/logo.png",
    },
    {
      title: "Para que devo usar?",
      description: "<b>O OUR TIME</b> serve para você organizar seus horarios e assim não esquecer daquela aula super importante.",
      image: "assets/imgs/slide2.png",
    },
    {
      title: "Como usar?",
      description: "<b>Novo Horário</b> te permite salvar seu horario e visualizar no calendario , já a<b>Nova Tarefa</b> serve para lembrar das provas ou atividades restantes",
      image: "assets/imgs/slide3.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  goToLoginPage()
  {
    this.navCtrl.push(LoginPage)
    localStorage.setItem('primeiro', 'nao');
  }

}
