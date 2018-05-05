import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { AuthProvider } from "../auth/auth";

/*
  Generated class for the ListaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListaProvider {

  itemsRef: AngularFireList<any>;
  
    constructor(protected db: AngularFireDatabase, private auth: AuthProvider) {
      this.itemsRef = db.list('lista');
     
    }
    insere(nome,produtos){
      let obj = {nome:nome, produtos:produtos,id:this.auth.afAuth.auth.currentUser.uid}
      this.itemsRef.push(obj);
    }
    getAll() {
      return this.itemsRef.snapshotChanges();
    }

}
