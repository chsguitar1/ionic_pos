import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotosProvider } from "../../providers/fotos/fotos";
import { FormGroup,FormBuilder, Validators } from "@angular/forms";


/**
 * Generated class for the ComentariofotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentariofoto',
  templateUrl: 'comentariofoto.html',
})
export class ComentariofotoPage {
  
  foto: any = {};
  key: String;
  comentario = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fotosProvider:FotosProvider,public formBuilder: FormBuilder) {
     this.foto = this.navParams.data.foto;
     this.key = this.navParams.data.key;

     console.log(this.key);
  }
comment(){
  console.log(this.foto, this.key);
//   let dados = this.foto;
 if(!this.foto.comentario){
  this.foto.comentario = [];
 }
console.log(this.comentario)
   this.foto.comentario.push({comentario: this.comentario});
  
   this.fotosProvider.editar(this.key, this.foto);
}
 

}
