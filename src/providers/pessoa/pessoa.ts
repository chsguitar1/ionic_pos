import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { AuthProvider } from "../auth/auth";
import { Pessoa } from "../../pages/signup/pessoa";

/*
  Generated class for the PessoaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PessoaProvider {

  itemsRef: AngularFireList<any>;
  
    constructor(protected db: AngularFireDatabase, private auth: AuthProvider) {
      this.itemsRef = db.list('pessoa');
     
    }
    insere(nome,id){
      let obj = {nome:nome, id:id}
      this.itemsRef.push(obj);
    }
    retornaUm(id):any {
      return this.db.object( 'pessoa/'+ id).valueChanges();
    }
}
