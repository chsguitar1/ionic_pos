import { HomePage } from './../home/home';
import { EmailValidator } from './../../validators/email';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { PessoaProvider } from "../../providers/pessoa/pessoa";
import { Pessoa } from "./pessoa";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  loginForm: FormGroup;
  pessoa : Pessoa

  constructor(public navCtrl: NavController, public authData: AuthProvider,
    public formBuilder: FormBuilder,public pessoaProvider: PessoaProvider) {
      /* usamos o formbuilder para validar os campos aqui pode criar validadores customizados
      como foi feito no email
      */
    this.loginForm = formBuilder.group({
      nome: ['', Validators.compose([Validators.required
       ])],
      email: ['', Validators.compose([Validators.required,
      EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6),
      Validators.required])],
      repassword: ['', Validators.compose([Validators.minLength(6),
        Validators.required])]
    });
  }


  voltarPagina() {
    this.navCtrl.pop();
  }

  signupUser() {
    // verifica se o form foi preenchido corretamente
    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      // faz login usando o provider auth
      this.authData.signupUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authData => {
          
          this.pessoaProvider.insere(this.loginForm.value.nome, this.authData.afAuth.auth.currentUser.uid)
          this.loginForm.reset() 
          this.navCtrl.setRoot(HomePage);
                   
          
        }, error => {
            alert('Login / senha incorretos');
        });

    }
  }

}
