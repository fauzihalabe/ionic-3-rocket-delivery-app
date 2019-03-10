import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  burgers: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
  ) {
    this.getBurgers();
  }

  getBurgers() {
    this.firebaseProvider.getBurgers()
      .then((r) => {
        this.burgers = r;
        console.log(this.burgers)
      })
  }

}
