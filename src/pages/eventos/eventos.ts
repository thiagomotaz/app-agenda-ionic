import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastrarEventoPage } from '../cadastrar-evento/cadastrar-evento';
import { DetalhesEventoPage } from '../detalhes-evento/detalhes-evento';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  public items: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewWillEnter(): void {
    this.load();
  }

  load(): void {
    this.http
      .get('http://ourtimez.tk/api/apiEventos/retrieve.php')
      .subscribe((data: any) => {
        console.dir(data);
        this.items = data;
      },
        (error: any) => {
          console.dir(error);
        });
  }

  addEntry(): void {
    this.navCtrl.push(CadastrarEventoPage);
  }

  viewEntry(param: any): void {
    this.navCtrl.push(CadastrarEventoPage, param);
  }
}
