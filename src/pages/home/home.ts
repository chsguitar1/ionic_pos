import { VisualizarFotosPage } from './../visualizar-fotos/visualizar-fotos';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalProvider } from '../../providers/local/local';
import { ListaProvider } from "../../providers/lista/lista";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lista = [];
  listapromisse = [];

  constructor(public navCtrl: NavController, private listaProvider:ListaProvider, public navParams:NavParams) {
    // retorna uma promisse com os dados (nao real time)
   // this.localProvider.getAllPromisse().then(res=>this.listapromisse = res);
    // retorna um observable, que faz um socket com o firebase (real time)
    this.listaProvider.getAll().subscribe(res=>this.lista = res);
  }
  // abre a pagina passando parametro para proxima
  abreDetalhes(obj){
    this.navParams.data = obj;
    this.navCtrl.push(VisualizarFotosPage, this.navParams);
  }


}
