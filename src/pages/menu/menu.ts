import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  burgers: any;
  drinks: any;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private loadingController: LoadingController
    ) {
      this.getBurgers();
      this.getDrinks();
      this.loading = this.loadingController.create();
      this.loading.present();
  }

  getBurgers(){
    this.firebaseProvider.getBurgers()
    .then((r) => {
      this.burgers = r;
    })
  }

  getDrinks(){
    this.firebaseProvider.getDrinks()
    .then((r) => {
      this.drinks = r;
      this.loading.dismiss();
    })
  }

}
