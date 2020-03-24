import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TarefasPage } from '../tarefas/tarefas';
import { HorariosPage } from '../horarios/horarios';
import { HomePage } from '../home/home';


/**
 * Generated class for the CadastrarHorarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar-horario',
  templateUrl: 'cadastrar-horario.html',
})
export class CadastrarHorarioPage {
  date = new Date();

  public form: FormGroup;
  public titulo: string;
  public sigla: string;
  public horai: string;
  public horaf: string;
  public dias: number;
  public diatodo: number;
  public repete: number;
  public meses: number;
  public isEdited: boolean = false;
  public hideForm: boolean = false;
  public pageTitle: string;
  public recordID: any = null;
  private baseURI: string = "http://ourtimez.tk/api/apiHorarios/";

  dia = this.date.getDay();
  list: string[] = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  diax = this.list[this.dias];

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public http: Http,
    public fb: FormBuilder,
    public NP: NavParams,
    public toastCtrl: ToastController) {
    this.form = fb.group({
      "titulo": ["", Validators.required],
      "sigla": ["", Validators.required],
      "horai": ["", Validators.required],
      "horaf": ["", Validators.required],
      "dias": ["", Validators.required],
      "diatodo": ["", Validators.required],
      "repete": ["", Validators.required],
      "meses": [""]
    });
  }



  ionViewWillEnter(): void {
    this.resetFields();

    if (this.NP.get("record")) {
      this.isEdited = true;
      this.selectEntry(this.NP.get("record"));
      this.pageTitle = 'Editar horario';
    }
    else {
      this.isEdited = false;
      this.pageTitle = 'Cadastrar horario';
    }
  }

  selectEntry(item: any): void {
    this.titulo = item.tituloHorario;
    this.sigla = item.siglaHorario;
    this.horai = item.horaInicialHorario;
    this.horaf = item.horaFinalHorario;
    this.dias = item.diasHorario;
    this.diatodo = item.diaTodoHorario;
    this.repete = item.repeteHorario;
    this.meses = item.mesesHorario;
    this.recordID = item.idHorario;
  }

  createEntry(titulo, sigla, horai, horaf, dias, diatodo, repete, meses) {
    let body: string = "key=create&titulo=" + titulo + "&sigla=" + sigla + "&horai=" + horai + "&horaf=" + horaf + "&dias=" + dias + "&diatodo=" + diatodo + "&repete=" + repete + "&meses=" +  meses,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "manage.php";

    this.http.post(url, body, options)
      .subscribe((data) => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.hideForm = true;
          this.sendNotification(`O horario foi adicionado com sucesso.`);
          this.navCtrl.popTo(HorariosPage);
        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Algo deu errado ');
          this.navCtrl.popTo(HorariosPage);
        }
      });
  }

  // updateEntry(descricao) {
  //   let body: string = "key=update&descricao=" + descricao + "&recordID=" + this.recordID,
  //     type: string = "application/x-www-form-urlencoded; charset=UTF-8",
  //     headers: any = new Headers({ 'Content-Type': type }),
  //     options: any = new RequestOptions({ headers: headers }),
  //     url: any = this.baseURI + "manage.php";

  //   this.http.post(url, body, options)
  //     .subscribe(data => {
  //       // If the request was successful notify the user
  //       if (data.status === 200) {
  //         this.hideForm = true;
  //         this.sendNotification(`A tarefa foi editada com sucesso.`);
  //         this.navCtrl.push(TarefasPage);
  //       }
  //       // Otherwise let 'em know anyway
  //       else {
  //         this.sendNotification('Algo deu errado ');
  //         this.navCtrl.push(TarefasPage);
  //       }
  //     });
  // }

  // deleteEntry() {
  //   let descricao: string = this.form.controls["descricao"].value,
  //     body: string = "key=delete&recordID=" + this.recordID,
  //     type: string = "application/x-www-form-urlencoded; charset=UTF-8",
  //     headers: any = new Headers({ 'Content-Type': type }),
  //     options: any = new RequestOptions({ headers: headers }),
  //     url: any = this.baseURI + "manage.php";

  //   this.http.post(url, body, options)
  //     .subscribe(data => {
  //       // If the request was successful notify the user
  //       if (data.status === 200) {
  //         this.hideForm = true;
  //         this.sendNotification(`A tarefa foi excluida com sucesso.`);
  //         this.navCtrl.push(TarefasPage);
  //       }
  //       // Otherwise let 'em know anyway
  //       else {
  //         this.sendNotification('Algo deu errado ');
  //         this.navCtrl.push(TarefasPage);
  //       }
  //     });
  // }
  saveEntry(): void {
    let titulo: string = this.form.controls["titulo"].value;
    let sigla: string = this.form.controls["sigla"].value;
    let horai: string = this.form.controls["horai"].value;
    let horaf: string = this.form.controls["horaf"].value;
    let dias: string = this.form.controls["dias"].value;
    let diatodo: boolean = this.form.controls["diatodo"].value;
    let repete: boolean = this.form.controls["repete"].value;
    let meses: boolean = this.form.controls["meses"].value;




    if (this.isEdited) {
      //this.updateEntry(titulo, sigla, horai, horaf, datai, dataf, diatodo, repete);
    }
    else {
      this.createEntry(titulo, sigla, horai, horaf, dias, diatodo, repete, meses);
    }
  }


  resetFields(): void {
    this.titulo = "";
    this.sigla = "";
    this.horai = "";
    this.horaf = "";
    this.dias = 0;
    this.diatodo = 0;
    this.repete = 0;
    this.meses = undefined;

  }

  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }


}
