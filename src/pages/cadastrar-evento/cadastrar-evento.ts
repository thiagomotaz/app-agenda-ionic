import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EventosPage } from '../eventos/eventos';
import { HomePage } from '../home/home';

/**
 * Generated class for the CadastrarEventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar-evento',
  templateUrl: 'cadastrar-evento.html',
})
export class CadastrarEventoPage {
  public event = {
    month: '2018-01-01',
    timeStarts: '00:00',
    timeEnds: '2018-01-01'
  }

  public form: FormGroup;
  public titulo: any;
  public descricao: any;
  public localizacao: any;
  public data: any;
  public hora: any;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  public recordID: any = null;
  private baseURI: string = "http://ourtimez.tk/api/apiEventos/";

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public http: Http,
    public fb: FormBuilder,
    public NP: NavParams,
    public toastCtrl: ToastController) {
    this.form = fb.group({
      "titulo": ["", Validators.required],
      "descricao": ["", Validators.required],
      "localizacao": ["", Validators.required],
      "data": ["", Validators.required],
      "hora": ["", Validators.required],
    });
  }

  ionViewWillEnter(): void {
    this.resetFields();

    if (this.NP.get("record")) {
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Editar evento';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Cadastrar evento';
    }
  }

  selectEntry(item: any): void {
    this.titulo = item.tituloEvento;
    this.descricao = item.descricaoEvento;
    this.localizacao = item.localizacaoEvento;
    this.data = item.dataEvento;
    this.hora = item.horaEvento;
    this.recordID = item.idEvento;
  }

  createEntry(titulo, descricao, localizacao, data, hora) {
    let body: string = "key=create&titulo=" + titulo + "&descricao=" + descricao + "&localizacao=" + localizacao + "&data=" + data + "&hora=" + hora,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "manage.php";

    this.http.post(url, body, options)
      .subscribe((data) => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`O evento foi adicionada com sucesso.`);
          this.navCtrl.popTo(HomePage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Algo deu errado ');
          this.navCtrl.popTo(HomePage);
        }
      });
  }

  updateEntry(titulo, descricao, localizacao, data, hora) {
    let body: string = "key=update&descricao=" + descricao + "&recordID=" + this.recordID + "&titulo=" + titulo + "&descricao=" + descricao + "&localizacao=" + localizacao + "&data=" + data + "&hora=" + hora,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "manage.php";

    this.http.post(url, body, options)
      .subscribe(data => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`O evento foi editado com sucesso.`);
          this.navCtrl.popTo(HomePage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Algo deu errado ');
          this.navCtrl.popTo(HomePage);
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
          this.sendNotification(`O evento foi excluida com sucesso.`);
          this.navCtrl.popTo(HomePage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Algo deu errado');
          this.navCtrl.popTo(HomePage);
        }
      });
  }





  saveEntry(): void {
    let titulo: string = this.form.controls["titulo"].value;
    let descricao: string = this.form.controls["descricao"].value;
    let localizacao: string = this.form.controls["localizacao"].value;
    let data: string = this.form.controls["data"].value;
    let hora: string = this.form.controls["hora"].value;


    if (this.isEdited) {
      this.updateEntry(titulo, descricao, localizacao, data, hora);
    }
    else {
      this.createEntry(titulo, descricao, localizacao, data, hora);
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
