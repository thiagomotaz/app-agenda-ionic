// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ActionSheetController, Platform } from 'ionic-angular'
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;
  public backgroundImage = '../../assets/imgs/logo.png';
  public usuario: string;
  public senha: string;

  public items: Array<any> = []; //login

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public events: Events
  ) { }

  createUser() {
    this.events.publish('dados', localStorage.getItem('nome'), localStorage.getItem('email'), localStorage.getItem('id'), Date.now(), localStorage.getItem('foto'), Date.now());
  }

  ionViewDidLoad() {
    this.load(); //puxa da api os dados
  }
  ionViewDidEnter() {
    this.load();
  }
  ionViewCanEnter() {
    this.load();
  }
  // ionViewCanEnter() {
  //   if (localStorage.getItem('id')) {
  //     this.navCtrl.setRoot(HomePage);
  //   }
  // }

  load(): void {
    this.http
      .get('http://ourtimez.tk/api/apiLogin/retrieve.php')
      .subscribe((data: any) => {
        //console.dir(data);
        this.items = data;
      },
        (error: any) => {
          //console.dir(error);
        });
  }

  login() {
    var achou = 0;
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].loginUsuario == this.usuario && this.items[i].senhaUsuario == this.senha) {
        //Atribui o objeto usuário a referencia usuarioLogado no sessionStorage
        localStorage.setItem('id', this.items[i].idUsuario);
        localStorage.setItem('email', this.items[i].emailUsuario);
        localStorage.setItem('nome', this.items[i].nomeUsuario);
        localStorage.setItem('foto', this.items[i].caminhoFotoUsuario);

        this.createUser();
        this.sendNotification(`Login efetuado com sucesso`);
        this.navCtrl.setRoot(HomePage);
        achou = 1;
        break;

      }
      else if (achou != 1 && i == (this.items.length - 1)) {
        this.sendNotification(`Usuário ou senha inválidos`);
        this.senha = "";
        this.usuario = "";
      }
    }

  }

  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

  goToSignup() {
    this.navCtrl.push(RegisterPage);
  }

  // Gradient logic from https://codepen.io/quasimondo/pen/lDdrF
  // NOTE: I'm not using this logic anymore, but if you want to use somehow, somewhere,
  // A programmatically way to make a nice rainbow effect, there you go.
  // NOTE: It probably won't work because it will crash your phone as this method is heavy \o/
  colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]);

  step = 0;
  // color table indices for:
  // [current color left,next color left,current color right,next color right]
  colorIndices = [0, 1, 2, 3];

  // transition speed
  gradientSpeed = 0.00005;
  gradient = '';

  updateGradient() {

    const c00 = this.colors[this.colorIndices[0]];
    const c01 = this.colors[this.colorIndices[1]];
    const c10 = this.colors[this.colorIndices[2]];
    const c11 = this.colors[this.colorIndices[3]];

    const istep = 1 - this.step;
    const r1 = Math.round(istep * c00[0] + this.step * c01[0]);
    const g1 = Math.round(istep * c00[1] + this.step * c01[1]);
    const b1 = Math.round(istep * c00[2] + this.step * c01[2]);
    const color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

    const r2 = Math.round(istep * c10[0] + this.step * c11[0]);
    const g2 = Math.round(istep * c10[1] + this.step * c11[1]);
    const b2 = Math.round(istep * c10[2] + this.step * c11[2]);
    const color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

    this.gradient = `-webkit-gradient(linear, left top, right bottom, from(${color1}), to(${color2}))`;
    this.step += this.gradientSpeed;
    if (this.step >= 1) {
      this.step %= 1;
      this.colorIndices[0] = this.colorIndices[1];
      this.colorIndices[2] = this.colorIndices[3];

      // pick two new target color indices
      // do not pick the same as the current one
      this.colorIndices[1] =
        (this.colorIndices[1] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
        % this.colors.length;

      this.colorIndices[3] =
        (this.colorIndices[3] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
        % this.colors.length;

    }

    setInterval(() => { this.updateGradient(); }, 40);
  }
}