import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CadastrarHorarioPage } from '../cadastrar-horario/cadastrar-horario';
import { ActionSheetController, Platform } from 'ionic-angular'
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';

/**
 * Generated class for the HorariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-horarios',
    templateUrl: 'horarios.html',
})
export class HorariosPage {

    eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'week',
        currentDate: new Date()
    }; // these are the variable used by the calendar.
    public items: Array<any> = [];
    toastCtrl: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public platform: Platform,
        public http: HttpClient

    ) {

    }

    ionViewDidLoad() {
        this.load(); //puxa da api os dados
    }
    ionViewDidEnter() {
        this.loadEvents();
    }
    ionViewCanEnter() {
        this.load();
        this.loadEvents();
    }
    // ionViewWillEnter() {
    //   this.loadEvents(); //coloca os dados puxados dentro do calendário
    // }



    load(): void {
        this.http
            .get('http://ourtimez.tk/api/apiHorarios/retrieve.php')
            .subscribe((data: any) => {
                //console.dir(data);
                this.items = data;
            },
                (error: any) => {
                    //console.dir(error);
                });
    }

    addEntry(): void {
        this.navCtrl.push(CadastrarHorarioPage);
    }

    viewEntry(param: any): void {
        this.navCtrl.push(CadastrarHorarioPage, param);
    }

    loadEvents() {
        this.eventSource = this.createDbEvents();
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }
    onEventSelected(event) {

        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);

        if (event.allDay == true) {
            this.presentAlert(event.title, "Dia todo");

        }
        else{
            let mensagem = "das " + event.startTime.getHours() + "h" + " e " + event.startTime.getMinutes() +  "min até ás " +  event.endTime.getHours() + "h e " +  event.endTime.getMinutes() + " min";
            this.presentAlert(event.title, mensagem);
        }
        console.log(event);

    }

    
    presentAlert(nomeHorario, mensagem?) {
        let alert = this.alertCtrl.create({
            title: nomeHorario,
            //if se for all day, mostrar a message como o dia todo
            message: mensagem,
            buttons: ['fechar']
        });
        alert.present();
    }
    changeMode(mode) {
        this.calendar.mode = mode;
    }
    today() {
        this.calendar.currentDate = new Date();
    }
    onTimeSelected(ev) {
        // console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        //   (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
        console.dir(ev);
    }
    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    // createRandomEvents() {
    //   var events = [];
    //   for (var i = 0; i < 50; i += 1) {
    //     var date = new Date();
    //     var eventType = Math.floor(Math.random() * 2);
    //     var startDay = Math.floor(Math.random() * 90) - 45;
    //     var endDay = Math.floor(Math.random() * 2) + startDay;
    //     var startTime;
    //     var endTime;
    //     if (eventType === 0) {
    //       startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
    //       if (endDay === startDay) {
    //         endDay += 1;
    //       }
    //       endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
    //       events.push({
    //         title: 'All Day - ' + i,
    //         startTime: startTime,
    //         endTime: endTime,
    //         allDay: true
    //       });
    //     } else {
    //       var startMinute = Math.floor(Math.random() * 24 * 60);
    //       var endMinute = Math.floor(Math.random() * 180) + startMinute;
    //       startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
    //       endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
    //       events.push({
    //         title: 'Event - ' + i,
    //         startTime: startTime,
    //         endTime: endTime,
    //         allDay: false
    //       });
    //     }
    //   }
    //   return events;
    // }
    acharProximoXDiaDaSemana(date, dayOfWeek) {
        var datex = new Date(date.getTime());
        datex.setDate(datex.getDate() + (dayOfWeek + 7 - datex.getDay()) % 7);
        return datex;
    }
    createDbEvents() {
        var events = [];
        for (var i = 0; i < this.items.length; i++) {
            var date = new Date();
            var eventType = this.items[i].diaTodoHorario; //a principio vão ser o dia todo
            var diaS = this.items[i].diasHorario;
            if (eventType === "true") {
                if (this.items[i].repeteHorario == "true") {

                    var d = new Date();

                    let datay = this.items[i].dataHorario;
                    let anoy = datay.slice(6, 10);
                    let mesy = datay.slice(0, 2);
                    let diay = datay.slice(3, 5);

                    var p = new Date(anoy, mesy - 1, diay);
                    for (var j = 0; j < (this.items[i].mesesHorario * 4); j++) {
                        d = this.acharProximoXDiaDaSemana(p, diaS);
                        console.log("fx: " + d);
                        let dia = d.getUTCDate();
                        let diaf = d.getUTCDate() + 1;
                        let mes = d.getUTCMonth();
                        let ano = d.getUTCFullYear();
                        let startTime = new Date(Date.UTC(ano, mes, dia));
                        let endTime = new Date(Date.UTC(ano, mes, diaf));
                        events.push({
                            title: this.items[i].siglaHorario,
                            startTime: startTime,
                            endTime: endTime,
                            allDay: true
                        });
                        //ITERAR A DATA COM MAIS 7 DIAS
                        p.setUTCDate(d.getUTCDate() + 7);
                    }
                }
                else {
                    let datay = this.items[i].dataHorario;
                    let anoy = datay.slice(6, 10);
                    let mesy = datay.slice(0, 2);
                    let diay = datay.slice(3, 5);
                    let f = new Date();
                    let d = new Date(anoy, mesy - 1, diay); //essa data na vdd tem que ser de qd ele cria o reg
                    f = this.acharProximoXDiaDaSemana(d, diaS);
                    let dia = d.getUTCDate();
                    let diaf = d.getUTCDate() + 1;
                    let mes = d.getUTCMonth();
                    let ano = d.getUTCFullYear();
                    let startTime = new Date(Date.UTC(ano, mes, dia));
                    let endTime = new Date(Date.UTC(ano, mes, diaf));
                    events.push({
                        title: this.items[i].siglaHorario,
                        startTime: startTime,
                        endTime: endTime,
                        allDay: true
                    });
                }



            }

            else {
                var hora = this.items[i].horaInicialHorario;
                var horai = hora.slice(0, -6);
                var mini = hora.slice(4, -3);

                var hora2 = this.items[i].horaFinalHorario;
                var horaf = hora2.slice(0, -6);
                var minf = hora2.slice(4, -3);

                if (this.items[i].repeteHorario == "true") {


                    var k = new Date(); //d equals k

                    let datay = this.items[i].dataHorario;
                    let anoy = datay.slice(6, 10);
                    let mesy = datay.slice(0, 2);
                    let diay = datay.slice(3, 5);
                    var z = new Date(anoy, mesy - 1, diay);
                    console.log("a porra do z" + z);
                    for (var q = 0; q < (this.items[i].mesesHorario * 4); q++) {
                        k = this.acharProximoXDiaDaSemana(z, diaS);
                        console.log("fx: " + d);
                        let dia = k.getUTCDate();
                        let diaf = k.getUTCDate();
                        let mes = k.getUTCMonth();
                        let ano = k.getUTCFullYear();
                        // let startTime = new Date(Date.UTC(ano, mes, dia));
                        // let endTime = new Date(Date.UTC(ano, mes, diaf));
                        let startTime = new Date(ano, mes, dia, horai, mini);
                        let endTime = new Date(ano, mes, diaf, horaf, minf);
                        events.push({
                            title: this.items[i].siglaHorario,
                            startTime: startTime,
                            endTime: endTime,
                            allDay: false
                        });
                        //ITERAR A DATA COM MAIS 7 DIAS
                        z.setUTCDate(k.getUTCDate() + 7);
                    }
                }
                else {
                    let datay = this.items[i].dataHorario;
                    let anoy = datay.slice(6, 10);
                    let mesy = datay.slice(0, 2);
                    let diay = datay.slice(3, 5);

                    let d = new Date();
                    let f = new Date(anoy, mesy - 1, diay); //essa data na vdd tem que ser de qd ele cria o reg
                    d = this.acharProximoXDiaDaSemana(f, diaS);
                    let dia = d.getUTCDate();
                    let diaf = d.getUTCDate();
                    let mes = d.getUTCMonth();
                    let ano = d.getUTCFullYear();
                    let startTime = new Date(ano, mes, dia, horai, mini);
                    let endTime = new Date(ano, mes, diaf, horaf, minf);
                    events.push({
                        title: this.items[i].siglaHorario,
                        startTime: startTime,
                        endTime: endTime,
                        allDay: false
                    });
                }

            }
        }

        return events;

    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime.getTime() + ', endTime: ' + ev.endTime.getTime());
    }
    markDisabled = (date: Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

}
