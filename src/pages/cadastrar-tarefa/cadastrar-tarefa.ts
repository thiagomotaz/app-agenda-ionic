import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TarefasPage } from '../tarefas/tarefas';
import { HomePage } from '../home/home';


/**
 * Generated class for the CadastrarTarefaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar-tarefa',
  templateUrl: 'cadastrar-tarefa.html',
})
export class CadastrarTarefaPage {
  public form: FormGroup;
  public descricao: any;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  public recordID: any = null;
  private baseURI: string = "http://ourtimez.tk/api/apiTarefas/";

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public http: Http,
    public fb: FormBuilder,
    public NP: NavParams,
    public toastCtrl: ToastController) {
    this.form = fb.group({
      "descricao": ["", Validators.required]
    });
  }

  ionViewWillEnter(): void {
    this.resetFields();

    if (this.NP.get("record")) {
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Editar tarefa';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Cadastrar tarefa';
    }
  }

  selectEntry(item: any): void {
    this.descricao = item.descricaoTarefa;
    this.recordID = item.idTarefa;
  }

  // createEntry(descricao: string): void {
  //   let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
  //     options: any = { "key": "create", "descricao": descricao },
  //     url: any = this.baseURI + "manage.php";

  //   this.http.post(url, JSON.stringify(options), headers)
  //     .subscribe((data: any) => {
  //       // If the request was successful notify the user
  //       this.hideForm = true;
  //       this.sendNotification(`A tarefa: foi adicionada com sucesso`);
  //     },
  //       (error: any) => {
  //         console.dir(error);
  //         this.sendNotification('Opss...Algo deu errado!');
  //       });
  // }

  createEntry(descricao) {
    let body: string = "key=create&descricao=" + descricao,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "manage.php";

    this.http.post(url, body, options)
      .subscribe((data) => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`A tarefa foi adicionada com sucesso.`);
          this.navCtrl.popTo(HomePage);

        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Algo deu errado ');
          this.navCtrl.push(TarefasPage);
        }
      });
  }

  updateEntry(descricao) {
    let body: string = "key=update&descricao=" + descricao+ "&recordID=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "manage.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`A tarefa foi editada com sucesso.`);
          this.navCtrl.popTo(HomePage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Algo deu errado ');
          this.navCtrl.push(TarefasPage);
        }
      });
  }

  deleteEntry() {
    let descricao: string = this.form.controls["descricao"].value,
      body: string = "key=delete&recordID=" + this.recordID,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "manage.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`A tarefa foi excluida com sucesso.`);
          this.navCtrl.popTo(HomePage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Algo deu errado ');
          this.navCtrl.push(TarefasPage);
        }
      });
  }





  saveEntry(): void {
    let descricao: string = this.form.controls["descricao"].value;

    if (this.isEdited) {
      this.updateEntry(descricao);
    }
    else {
      this.createEntry(descricao);
    }
  }


  resetFields(): void {
    this.descricao = "";
  }

  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }


}
