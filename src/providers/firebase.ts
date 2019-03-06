import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class FirebaseProvider {
  constructor(private afs: AngularFirestore) { }

  //Create user on firestore
  postUser = data =>
    this.afs
      .collection("Users")
      .doc(data.uid)
      .set(data);

  getUser(uid) {
    return this.afs.firestore.collection('Users').doc(uid)
      .get();
  }

  //Get burgers
  getBurgers(){
    return new Promise((resolve, reject) => {
      this.afs.firestore.collection('Burgers').get()
      .then((r) => {
        let array = [];
        r.forEach((d) =>{
          let item = d.data();
          item.id = d.id; 
          array.push(item);
        });

        resolve(array);
      })
    })
  }

  //Get drinks
  getDrinks(){
    return new Promise((resolve, reject) => {
      this.afs.firestore.collection('Drinks').get()
      .then((r) => {
        let array = [];
        r.forEach((d) =>{
          let item = d.data();
          item.id = d.id; 
          array.push(item);
        });

        resolve(array);
      })
    })
  }
}
