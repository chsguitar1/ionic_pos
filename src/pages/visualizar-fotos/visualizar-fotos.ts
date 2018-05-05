import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IncluiFotoPage } from '../inclui-foto/inclui-foto';
import { ComentariofotoPage } from "../comentariofoto/comentariofoto";
import { FotosProvider } from "../../providers/fotos/fotos";
import { LocalProvider } from "../../providers/local/local";



/**
 * Generated class for the VisualizarFotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visualizar-fotos',
  templateUrl: 'visualizar-fotos.html',
})
export class VisualizarFotosPage {

  local: any = {};
  fotosmostrar = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fotosProvider:LocalProvider) {
      // recupera os dados da view anterior
    this.local = this.navParams.data;
    /* aqui fazemos a query para mostrar somente as fotos do local
    podemos usar esse metodo para qualquer tipo de filtro, passando o campo que quer buscar
    e o valor do campo no segundo atributo.
    como usaremos o recurso real time database do firebase, ele retorna um observable, usando
    subscribe inserimos os dados na nossa lista e alterando no banco de dados automaticamente
    irá mudar a lista de todos os usuarios online
    */
   // this.fotosProvider.getByQuery('nome', this.local.payload.key).subscribe(resp => this.fotosmostrar = resp);
   

  }


  incluirFoto(){
    // passamos o parametro do local para o proxima view e abrimos a pagina de incluir fotos
    this.navParams.data = this.local;
    this.navCtrl.push(IncluiFotoPage, this.navParams);
  }
  irComentario(foto){
    console.log(foto)
this.navParams.data = { key: foto.key, foto: foto.payload.val() }
this.navCtrl.push(ComentariofotoPage,this.navParams)
  }

  voltarPagina(){
    this.navCtrl.pop();
  }

}
