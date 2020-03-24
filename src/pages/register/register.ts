// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ActionSheetController, Platform } from 'ionic-angular'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public form: FormGroup;
  public loginForm: any;
  public backgroundImage = '../../assets/imgs/logo.png';
  public nome: string;
  public email: string;
  public loginx: string;
  public senha: string;
  private baseURI: string = "http://ourtimez.tk/api/apiRegistro/";

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public http: Http,
    public fb: FormBuilder,
    public NP: NavParams,
    public toastCtrl: ToastController) {
    this.form = fb.group({
      "nome": ["", Validators.required],
      "email": ["", Validators.required],
      "loginx": ["", Validators.required],
      "senha": ["", Validators.required]
    });
  }
  saveEntry(): void {
    let nome: string = this.form.controls["nome"].value;
    let email: string = this.form.controls["email"].value;
    let loginx: string = this.form.controls["loginx"].value;
    let senha: string = this.form.controls["senha"].value;
    this.createEntry(nome, email, loginx, senha);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  createEntry(nome, email, loginx, senha) {
    let body: string = "key=create&nome=" + nome + "&email=" + email + "&loginx=" + loginx + "&senha=" + senha,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "manage.php";

    this.http.post(url, body, options)
      .subscribe((data) => {
        // If the request was successful notify the user
        if (data.status === 200) {
          this.sendNotification(`A conta foi criada com sucesso.`);
          this.navCtrl.popTo(LoginPage);

        }
        // Otherwise let 'em know anyway
        else {
          this.sendNotification('Algo deu errado ');
          this.navCtrl.push(LoginPage);
        }
      });
  }

  sendNotification(message: string): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    notification.present();
  }

}
