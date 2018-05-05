import { IncluiFotoPage } from './../pages/inclui-foto/inclui-foto';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { LocalProvider } from '../providers/local/local';
import { CadastroLocalPage } from '../pages/cadastro-local/cadastro-local';
import { FotosProvider } from '../providers/fotos/fotos';
import { Camera } from '@ionic-native/camera';
import { VisualizarFotosPage } from '../pages/visualizar-fotos/visualizar-fotos';
import { Geolocation } from '@ionic-native/geolocation';
import { SignupPage } from "../pages/signup/signup";
import { ComentariofotoPage } from "../pages/comentariofoto/comentariofoto";
import { PessoaProvider } from '../providers/pessoa/pessoa';
import { NovalistaPage } from "../pages/novalista/novalista";
import { ListaProvider } from '../providers/lista/lista';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroLocalPage,
    IncluiFotoPage,
    VisualizarFotosPage,
    SignupPage,
    ComentariofotoPage,
    NovalistaPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), //criado arquivo deo configuracao e inicia o firebase
    AngularFireDatabaseModule, // modulo database
    AngularFireAuthModule // modulo de autenticacao
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroLocalPage,
    IncluiFotoPage,
    VisualizarFotosPage,
    SignupPage,
    ComentariofotoPage,
    NovalistaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    LocalProvider,
    FotosProvider,
    Camera,      //plugin camera
    Geolocation,
    PessoaProvider,
    ListaProvider //plugin de geolocalizacao
  ]
})
export class AppModule {}
