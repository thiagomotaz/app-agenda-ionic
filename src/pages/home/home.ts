import { Component } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';
import { CadastrarHorarioPage } from '../cadastrar-horario/cadastrar-horario';
import { CadastrarTarefaPage } from '../cadastrar-tarefa/cadastrar-tarefa';
import { CadastrarEventoPage } from '../cadastrar-evento/cadastrar-evento';
import { HttpClient } from '@angular/common/http';
import { TarefasPage } from '../tarefas/tarefas';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // public x: string = sessionStorage.getItem('usuario');
  // public y: string = sessionStorage.getItem('senha');
  public id;
  public items: Array<any> = [];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public menuCtrl: MenuController, public http: HttpClient) {
  }
  /**Pega o objeto armazenado no sessionStorage, 
  observe que a referencia é a mesma('usuarioLogado')*/
  ionViewWillEnter() {
    // this.sendNotification("usuario: " + this.x + "---" + "senha: " + this.y + "---" + "id: " + this.z);
    this.menuCtrl.enable(true, 'menu-material');
  }

  ionViewDidLoad() {
    this.load(); //puxa da api os dados
  }

  goToTarefasPage() {
    this.navCtrl.push(TarefasPage);
  }
  load(): void {
    this.http
      .get('http://ourtimez.tk/api/apiTarefas/retrieve2.php')
      .subscribe((data: any) => {
        //console.dir(data);
        this.items = data;
      },
        (error: any) => {
          //console.dir(error);
        });
  }
  goToCadastrarHorariosPage() {
    this.navCtrl.push(CadastrarHorarioPage);
  }

  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 5000
    });
    notification.present();
  }


  goToCadastrarTarefaPage() {
    this.navCtrl.push(CadastrarTarefaPage);
  }

  goToCadastrarEventoPage() {
    this.navCtrl.push(CadastrarEventoPage);
  }

}
