import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastrarTarefaPage } from '../cadastrar-tarefa/cadastrar-tarefa';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the TarefasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {

  public items: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }


  ionViewWillEnter(): void {
    this.load();
  }

  load(): void {
    this.http
      .get('http://ourtimez.tk/api/apiTarefas/retrieve.php')
      .subscribe((data: any) => {
        console.dir(data);
        this.items = data;
      },
      (error: any) => {
        console.dir(error);
      });
  }

  addEntry(): void {
    this.navCtrl.push(CadastrarTarefaPage);
  }

  viewEntry(param : any) : void
  {
     this.navCtrl.push(CadastrarTarefaPage, param);
  }

}
