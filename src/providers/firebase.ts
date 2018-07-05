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
}
