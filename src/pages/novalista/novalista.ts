import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalProvider } from "../../providers/local/local";
import { ListaProvider } from "../../providers/lista/lista";
import { AuthProvider } from "../../providers/auth/auth";
import { PessoaProvider } from "../../providers/pessoa/pessoa";

/**
 * Generated class for the NovalistaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-novalista',
  templateUrl: 'novalista.html',
})
export class NovalistaPage {
  lista = [];
  produtos = [];
  nomelista = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,private produtoProvider: LocalProvider,
    private listaProvider:ListaProvider,public authData: AuthProvider,public pessoaProvider: PessoaProvider) {
      this.produtoProvider.getAll().subscribe(res=>this.lista = res)
  
  }

  saveItem(item){
   this.produtos.push(item)
  }
  saveLista(){
    this.listaProvider.insere(this.nomelista,this.produtos)
     
  }
 
}
