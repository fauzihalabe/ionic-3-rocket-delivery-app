import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthProvider } from '../../providers/auth';
import { FirebaseProvider } from '../../providers/firebase';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
    trigger(
      'login', [
        transition(':enter', [
          style({
            opacity: 0
          }),
          animate("1s ease-in-out", style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            opacity: 0
          })
        ])
      ],
    ),
    trigger(
      'registro', [
        transition(':enter', [
          style({
            opacity: 0
          }),
          animate("1s ease-in-out", style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            opacity: 0
          })
        ])
      ],
    ),
  ]

})
export class LoginPage {

  login = true;
  register = false;
  loginForm = {
    email: '',
    password: ''
  };
  registerForm = {
    email: '',
    password: '',
    name: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private firebaseProvider: FirebaseProvider,
    private loadingCtrl: LoadingController,
    private storage: Storage
  ) {

  }


  //Exibir form de registro
  exibirRegistrar() {
    this.login = false;
    this.register = true;
  }

  //Exibir form de login
  exibirLogin() {
    this.login = true;
    this.register = false;
  }

  //Login
  fazerLogin() {
    let load = this.loadingCtrl.create();
    load.present();

    this.authProvider.login(this.loginForm)
      .then((res) => {
        let uid = res.user.uid;
        this.firebaseProvider.getUser(uid)
          .then((res) => {
            console.log(res.data())
            let data = res.data();
            this.storage.set('usuario', data)
              .then(() => {
                load.dismiss();
                this.navCtrl.setRoot('HomePage');
              })
          })
      })
      .catch((err) => {
        load.dismiss();
      })
  }

  //Registro
  criarNovaConta() {
    let load = this.loadingCtrl.create();
    load.present();

    this.authProvider.register(this.registerForm)
      .then((res) => {
        let uid = res.user.uid;

        //Organizar dados
        let data = {
          uid: uid,
          name: this.registerForm.name,
          email: this.registerForm.email
        };

        //Gravar user no firestore
        this.firebaseProvider.postUser(data)
          .then(() => {
            this.storage.set('usuario', data)
              .then(() => {
                load.dismiss();
                this.navCtrl.setRoot('HomePage');
              })
          })
          .catch((err) => {
            load.dismiss();
          })
      })
      .catch((err) => {
        load.dismiss();
      })
  }

  ionViewDidLoad() {
  }

}
