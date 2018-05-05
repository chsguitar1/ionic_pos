webpackJsonp([7],{

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PessoaProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the PessoaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PessoaProvider = /** @class */ (function () {
    function PessoaProvider(db, auth) {
        this.db = db;
        this.auth = auth;
        this.itemsRef = db.list('pessoa');
    }
    PessoaProvider.prototype.insere = function (nome, id) {
        var obj = { nome: nome, id: id };
        this.itemsRef.push(obj);
    };
    PessoaProvider.prototype.retornaUm = function (id) {
        return this.db.object('pessoa/' + id).valueChanges();
    };
    PessoaProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2__auth_auth__["a" /* AuthProvider */]])
    ], PessoaProvider);
    return PessoaProvider;
}());

//# sourceMappingURL=pessoa.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IncluiFotoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_camera__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_fotos_fotos__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(320);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the IncluiFotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IncluiFotoPage = /** @class */ (function () {
    function IncluiFotoPage(navCtrl, navParams, fotosProvider, camera, geolocation) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fotosProvider = fotosProvider;
        this.camera = camera;
        this.geolocation = geolocation;
        this.local = {};
        this.listafotos = [];
        this.coordenadas = {};
        // recupera os dados da view anterior
        this.local = this.navParams.data;
        //busca as coordenadas do aparelho
        this.geolocation.getCurrentPosition().then(function (resp) {
            // salva em um json para colocar dentro do objeto da foto
            _this.coordenadas = { latitude: resp.coords.latitude, logitude: resp.coords.longitude };
        }).catch(function (error) {
            alert('Erro localizacao = ' + error);
        });
    }
    IncluiFotoPage.prototype.voltarPagina = function () {
        this.navCtrl.pop();
    };
    IncluiFotoPage.prototype.getFoto = function (tipo) {
        var _this = this;
        //configura a camera DATA_URL para funcionar em aparelhos mais antigos com menos memoria
        //o tipo que vem por parametro da view é para abrir a camera ou galeria
        var options = {
            quality: 10,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: tipo == "picture"
                ? this.camera.PictureSourceType.CAMERA
                : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            correctOrientation: true,
            saveToPhotoAlbum: false
        };
        // salvamos a imagem no array que mostra na view
        this.camera.getPicture(options).then(function (imageData) {
            _this.listafotos.push("data:image/jpeg;base64," + imageData);
        }, function (err) {
            // Handle error
            console.log(err);
        });
    };
    // apaga imagem do array
    IncluiFotoPage.prototype.apagaImagen = function (index) {
        this.listafotos.splice(index, 1);
    };
    IncluiFotoPage.prototype.salvarFotos = function () {
        //verifica se há fotos para upload para nao dar erro
        //chama o metodo do provider que faz upload e salva a os dados da foto na database
        if (this.listafotos.length > 0) {
            this.fotosProvider.uploadMulti(this.listafotos, this.local.payload.key, this.coordenadas);
        }
        this.navCtrl.pop();
    };
    IncluiFotoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-inclui-foto',template:/*ion-inline-start:"/home/cristiano/pos---aula2/src/pages/inclui-foto/inclui-foto.html"*/'<!--\n  Generated template for the IncluiFotoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar hideBackButton>\n    <ion-buttons start left>\n      <button ion-button (click)="voltarPagina()" style="color:black !important;">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Fotos</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <h3>{{ local.payload.val().pais}} - {{ local.payload.val().local}}</h3>\n\n  <ion-row>\n      <ion-col text-center col-6 no-margin no-padding>\n        <button ion-button full color="secondary" (click)="getFoto(\'picture\')">\n          <ion-icon ios="ios-camera" md="md-camera" style="font-size:34px;padding-right: 10px;"></ion-icon>\n          Foto\n        </button>\n\n      </ion-col>\n\n      <ion-col text-center col-6 no-margin no-padding>\n        <button ion-button full  (click)="getFoto(\'gallery\')">\n          <ion-icon ios="ios-images" md="md-images" style="font-size:34px; padding-right: 10px;"></ion-icon>\n          Galeria\n        </button>\n\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <button ion-button full color="danger" (click)="salvarFotos()">\n        <ion-icon ios="ios-document" md="md-document" style="font-size:34px;padding-right: 10px;"></ion-icon>\n        Salvar Foto(s)\n      </button>\n    </ion-row>\n    <ion-row>\n  <ion-list *ngFor="let foto of listafotos; let i = index" [attr.data-index]="i">\n    <ion-card>\n        <img src="{{ foto }}" (click)="apagaImagen(i)" />\n    </ion-card>\n  </ion-list>\n</ion-row>\n\n</ion-content>\n'/*ion-inline-end:"/home/cristiano/pos---aula2/src/pages/inclui-foto/inclui-foto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_fotos_fotos__["a" /* FotosProvider */], __WEBPACK_IMPORTED_MODULE_0__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */]])
    ], IncluiFotoPage);
    return IncluiFotoPage;
}());

//# sourceMappingURL=inclui-foto.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CadastroLocalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_local_local__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CadastroLocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CadastroLocalPage = /** @class */ (function () {
    function CadastroLocalPage(navCtrl, navParams, formBuilder, localProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.localProvider = localProvider;
        this.home = __WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */];
        /* usamos o formbuilder para validar os campos aqui pode criar validadores customizados
            */
        this.localForm = formBuilder.group({
            nome: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required],
            valor: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]
        });
    }
    //caso o formulario seja valido salva o local e volta pra pagina inicial
    CadastroLocalPage.prototype.salvarProduto = function () {
        if (!this.localForm.valid) {
            alert('preencha todos os campos');
        }
        else {
            this.localProvider.insere(this.localForm.value);
            alert('salvo');
            // this.voltarPagina();
        }
    };
    CadastroLocalPage.prototype.voltarPagina = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */]);
    };
    CadastroLocalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-cadastro-local',template:/*ion-inline-start:"/home/cristiano/pos---aula2/src/pages/cadastro-local/cadastro-local.html"*/'<!--\n  Generated template for the CadastroLocalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar hideBackButton>\n    <ion-buttons start left>\n      <button ion-button (click)="voltarPagina()" style="color:black !important;">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Cadastro de Produto</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <form [formGroup]="localForm" (submit)="salvarProduto()" novalidate>\n    <ion-row padding>\n      <ion-item>\n        <ion-label floating>Nome do Produto</ion-label>\n        <ion-input #nome formControlName="nome" type="text" [class.invalid]="!localForm.controls.nome.valid && localForm.controls.nome.dirty"></ion-input>\n      </ion-item>\n      <ion-item class="error-message" *ngIf="!localForm.controls.nome.valid  && localForm.controls.nome.dirty">\n        <p>Informe o nome do Produto</p>\n      </ion-item>\n    </ion-row>\n\n    <ion-row padding>\n      <ion-item>\n        <ion-label floating>Valor</ion-label>\n        <ion-input #valor formControlName="valor" type="text" [class.invalid]="!localForm.controls.valor.valid && localForm.controls.valor.dirty"></ion-input>\n      </ion-item>\n      <ion-item class="error-message" *ngIf="!localForm.controls.valor.valid  && localForm.controls.valor.dirty">\n        <p>Preencha o preço.</p>\n      </ion-item>\n    </ion-row>\n\n    \n    <ion-row padding>\n      <button block type="submit" ion-button large>\n        Cadastrar produto</button>\n    </ion-row>\n  </form>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/cristiano/pos---aula2/src/pages/cadastro-local/cadastro-local.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__providers_local_local__["a" /* LocalProvider */]])
    ], CadastroLocalPage);
    return CadastroLocalPage;
}());

//# sourceMappingURL=cadastro-local.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizarFotosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inclui_foto_inclui_foto__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__comentariofoto_comentariofoto__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_local_local__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the VisualizarFotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VisualizarFotosPage = /** @class */ (function () {
    function VisualizarFotosPage(navCtrl, navParams, fotosProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fotosProvider = fotosProvider;
        this.local = {};
        this.fotosmostrar = [];
        // recupera os dados da view anterior
        this.local = this.navParams.data;
        /* aqui fazemos a query para mostrar somente as fotos do local
        podemos usar esse metodo para qualquer tipo de filtro, passando o campo que quer buscar
        e o valor do campo no segundo atributo.
        como usaremos o recurso real time database do firebase, ele retorna um observable, usando
        subscribe inserimos os dados na nossa lista e alterando no banco de dados automaticamente
        irá mudar a lista de todos os usuarios online
        */
        this.fotosProvider.getByQuery('nome', this.local.payload.key).subscribe(function (resp) { return _this.fotosmostrar = resp; });
    }
    VisualizarFotosPage.prototype.incluirFoto = function () {
        // passamos o parametro do local para o proxima view e abrimos a pagina de incluir fotos
        this.navParams.data = this.local;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__inclui_foto_inclui_foto__["a" /* IncluiFotoPage */], this.navParams);
    };
    VisualizarFotosPage.prototype.irComentario = function (foto) {
        console.log(foto);
        this.navParams.data = { key: foto.key, foto: foto.payload.val() };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__comentariofoto_comentariofoto__["a" /* ComentariofotoPage */], this.navParams);
    };
    VisualizarFotosPage.prototype.voltarPagina = function () {
        this.navCtrl.pop();
    };
    VisualizarFotosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visualizar-fotos',template:/*ion-inline-start:"/home/cristiano/pos---aula2/src/pages/visualizar-fotos/visualizar-fotos.html"*/'<!--\n  Generated template for the IncluiFotoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar hideBackButton>\n    <ion-buttons start left>\n      <button ion-button (click)="voltarPagina()" style="color:black !important;">\n        <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Fotos</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card text-center>{{ local.payload.val().pais}} - {{ local.payload.val().local}}</ion-card>\n\n  <ion-row>\n    <button ion-button full (click)="incluirFoto()">\n      <ion-icon ios="ios-document" md="md-document"></ion-icon>\n      Enviar nova foto\n    </button>\n  </ion-row>\n  <ion-row>\n    <ion-list *ngFor="let foto of fotosmostrar">\n        {{foto.payload.val().comentario}}    \n        <ion-col (click)="irComentario(foto)" >\n      <img src="{{ foto.payload.val().downloadurl }}" />  \n      </ion-col>\n    </ion-list>\n  </ion-row>\n\n</ion-content>\n'/*ion-inline-end:"/home/cristiano/pos---aula2/src/pages/visualizar-fotos/visualizar-fotos.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_local_local__["a" /* LocalProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_local_local__["a" /* LocalProvider */]) === "function" && _c || Object])
    ], VisualizarFotosPage);
    return VisualizarFotosPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=visualizar-fotos.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComentariofotoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_fotos_fotos__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ComentariofotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ComentariofotoPage = /** @class */ (function () {
    function ComentariofotoPage(navCtrl, navParams, fotosProvider, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fotosProvider = fotosProvider;
        this.formBuilder = formBuilder;
        this.foto = {};
        this.comentario = "";
        this.foto = this.navParams.data.foto;
        this.key = this.navParams.data.key;
        console.log(this.key);
    }
    ComentariofotoPage.prototype.comment = function () {
        console.log(this.foto, this.key);
        //   let dados = this.foto;
        if (!this.foto.comentario) {
            this.foto.comentario = [];
        }
        console.log(this.comentario);
        this.foto.comentario.push({ comentario: this.comentario });
        this.fotosProvider.editar(this.key, this.foto);
    };
    ComentariofotoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-comentariofoto',template:/*ion-inline-start:"/home/cristiano/pos---aula2/src/pages/comentariofoto/comentariofoto.html"*/'<!--\n  Generated template for the ComentariofotoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>comentariofoto</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  \n    <ion-row padding>\n      <ion-col text-center col-12> Comente esta Foto </ion-col>\n\n      <ion-col text-center col-12>\n        <ion-item>\n          <ion-label floating>Deixe seu comentário</ion-label>\n          <ion-input [(ngModel)]="comentario" errorMessage="Campo obrigatório"></ion-input>\n        </ion-item>\n        \n      </ion-col>\n      \n      <ion-col text-center col-12>\n        <button block (click)="comment()" ion-button large>\n          <ion-icon ios="ios-log-in" md="md-log-in" style="font-size:34px;padding-right:10px;"></ion-icon> Enviar</button>\n      </ion-col>\n\n    </ion-row>\n\n</ion-content>\n'/*ion-inline-end:"/home/cristiano/pos---aula2/src/pages/comentariofoto/comentariofoto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_fotos_fotos__["a" /* FotosProvider */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
    ], ComentariofotoPage);
    return ComentariofotoPage;
}());

//# sourceMappingURL=comentariofoto.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validators_email__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signup_signup__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, authData, formBuilder, navParams) {
        this.navCtrl = navCtrl;
        this.authData = authData;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        /* usamos o formbuilder para validar os campos aqui pode criar validadores customizados
        como foi feito no email
        */
        this.loginForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(6),
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])]
        });
    }
    LoginPage.prototype.voltarPagina = function () {
        this.navCtrl.pop();
    };
    LoginPage.prototype.irSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__signup_signup__["a" /* SignupPage */], this.navParams);
    };
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        // verifica se o form foi preenchido corretamente
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            // faz login usando o provider auth
            this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
                .then(function (authData) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */]);
            }, function (error) {
                alert('Login / senha incorretos');
            });
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/cristiano/pos---aula2/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Acesse o Sistema</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="loginForm" (submit)="loginUser()" novalidate>\n    <ion-row padding>\n     \n\n      <ion-col text-center col-12>\n        <ion-item>\n          <ion-label floating>E-mail</ion-label>\n          <ion-input #email formControlName="email" type="email" [class.invalid]="!loginForm.controls.email.valid && loginForm.controls.email.dirty"></ion-input>\n        </ion-item>\n        <ion-item class="error-message" *ngIf="!loginForm.controls.email.valid  && loginForm.controls.email.dirty">\n          <p>Informe um e-mail válido.</p>\n        </ion-item>\n      </ion-col>\n\n      <ion-col text-center col-12>\n        <ion-item>\n          <ion-label floating>Senha</ion-label>\n          <ion-input #password formControlName="password" type="password" [class.invalid]="!loginForm.controls.password.valid && loginForm.controls.password.dirty"></ion-input>\n        </ion-item>\n        <ion-item class="error-message" *ngIf="!loginForm.controls.password.valid  && loginForm.controls.password.dirty">\n          <p>A senha deve ter mais de 6 caracteres.</p>\n        </ion-item>\n      </ion-col>\n\n      <ion-col text-center col-12>\n        <button block type="submit" ion-button large>\n          Acessar Lista</button>  \n          \n      </ion-col>\n      \n\n          \n     \n\n    </ion-row>\n\n  </form>\n  <ion-col text-center col-12>\n    <button (click)="irSignup()" ion-button large>\n     Registrar</button>  \n      \n  </ion-col>\n</ion-content>\n'/*ion-inline-end:"/home/cristiano/pos---aula2/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validators_email__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_pessoa_pessoa__ = __webpack_require__(133);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, authData, formBuilder, pessoaProvider) {
        this.navCtrl = navCtrl;
        this.authData = authData;
        this.formBuilder = formBuilder;
        this.pessoaProvider = pessoaProvider;
        /* usamos o formbuilder para validar os campos aqui pode criar validadores customizados
        como foi feito no email
        */
        this.loginForm = formBuilder.group({
            nome: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required
                ])],
            email: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(6),
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])],
            repassword: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].minLength(6),
                    __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])]
        });
    }
    SignupPage.prototype.voltarPagina = function () {
        this.navCtrl.pop();
    };
    SignupPage.prototype.signupUser = function () {
        var _this = this;
        // verifica se o form foi preenchido corretamente
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            // faz login usando o provider auth
            this.authData.signupUser(this.loginForm.value.email, this.loginForm.value.password)
                .then(function (authData) {
                _this.pessoaProvider.insere(_this.loginForm.value.nome, _this.authData.afAuth.auth.currentUser.uid);
                _this.loginForm.reset();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */]);
            }, function (error) {
                alert('Login / senha incorretos');
            });
        }
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/cristiano/pos---aula2/src/pages/signup/signup.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    \n      <ion-navbar>\n        <ion-title>Cadastro de Usuário</ion-title>\n      </ion-navbar>\n    \n    </ion-header>\n    \n    \n    <ion-content padding>\n      <form [formGroup]="loginForm" (submit)="signupUser()" novalidate>\n        <ion-row padding>\n          <ion-col text-center col-12> Cadastre-se no Sistema </ion-col>\n    \n          <ion-col text-center col-12>\n            <ion-item>\n              <ion-label floating>Nome do Usuario</ion-label>\n              <ion-input #nome formControlName="nome" type="nome" [class.invalid]="!loginForm.controls.nome.valid && loginForm.controls.nome.dirty"></ion-input>\n            </ion-item>\n            <ion-item class="error-message" *ngIf="!loginForm.controls.nome.valid  && loginForm.controls.nome.dirty">\n              <p>Informe um nome.</p>\n            </ion-item>\n            \n          </ion-col>\n          <ion-col text-center col-12>\n            <ion-item>\n              <ion-label floating>E-mail</ion-label>\n              <ion-input #email formControlName="email" type="email" [class.invalid]="!loginForm.controls.email.valid && loginForm.controls.email.dirty"></ion-input>\n            </ion-item>\n            <ion-item class="error-message" *ngIf="!loginForm.controls.email.valid  && loginForm.controls.email.dirty">\n              <p>Informe um e-mail válido.</p>\n            </ion-item>\n          </ion-col>\n    \n          <ion-col text-center col-12>\n            <ion-item>\n              <ion-label floating>Senha</ion-label>\n              <ion-input #password formControlName="password" type="password" [class.invalid]="!loginForm.controls.password.valid && loginForm.controls.password.dirty"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Confirme a Senha</ion-label>\n                <ion-input #password formControlName="repassword" type="password" [class.invalid]="loginForm.controls.password.valid == loginForm.controls.repassword"></ion-input>\n              </ion-item>\n            <ion-item class="error-message" *ngIf="!loginForm.controls.password.valid  && loginForm.controls.password.dirty">\n              <p>A senha deve ter mais de 6 caracteres.</p>\n            </ion-item>\n          </ion-col>\n          \n    \n          <ion-col text-center col-12>\n            <button block type="submit" ion-button large>\n              <ion-icon ios="ios-log-in" md="md-log-in" style="font-size:34px;padding-right:10px;"></ion-icon> Registrar</button>\n          </ion-col>\n    \n        </ion-row>\n    \n      </form>\n    \n    </ion-content>\n    '/*ion-inline-end:"/home/cristiano/pos---aula2/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_6__providers_pessoa_pessoa__["a" /* PessoaProvider */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NovalistaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_local_local__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_lista_lista__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_pessoa_pessoa__ = __webpack_require__(133);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the NovalistaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NovalistaPage = /** @class */ (function () {
    function NovalistaPage(navCtrl, navParams, produtoProvider, listaProvider, authData, pessoaProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.produtoProvider = produtoProvider;
        this.listaProvider = listaProvider;
        this.authData = authData;
        this.pessoaProvider = pessoaProvider;
        this.lista = [];
        this.produtos = [];
        this.nomelista = "";
        this.produtoProvider.getAll().subscribe(function (res) { return _this.lista = res; });
    }
    NovalistaPage.prototype.saveItem = function (item) {
        this.produtos.push(item);
    };
    NovalistaPage.prototype.saveLista = function () {
        this.listaProvider.insere(this.nomelista, this.produtos);
    };
    NovalistaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-novalista',template:/*ion-inline-start:"/home/cristiano/pos---aula2/src/pages/novalista/novalista.html"*/'<!--\n  Generated template for the NovalistaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Nova lista</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-col text-center col-12>\n        <ion-item>\n          <ion-label floating>Nome da lista</ion-label>\n          <ion-input [(ngModel)]="nomelista" errorMessage="Campo obrigatório"></ion-input>\n        </ion-item>\n        <h4>Escolha os produtos na lista abaixo</h4>\n        <ion-list *ngFor="let item of lista" >\n            <button ion-item padding-left style="border-bottom: 1px grey solid" (click)="saveItem(item.payload.val())" >\n                {{item.payload.val().nome}} - {{item.payload.val().valor}}\n            </button>\n        </ion-list>\n      </ion-col>\n      <ion-col text-center col-12>\n          <button block (click)="saveLista()" ion-button large>\n            <ion-icon ios="ios-log-in" md="md-log-in" style="font-size:34px;padding-right:10px;"></ion-icon> Enviar</button>\n        </ion-col>\n\n</ion-content>\n'/*ion-inline-end:"/home/cristiano/pos---aula2/src/pages/novalista/novalista.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_local_local__["a" /* LocalProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_local_local__["a" /* LocalProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__providers_lista_lista__["a" /* ListaProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_lista_lista__["a" /* ListaProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__providers_pessoa_pessoa__["a" /* PessoaProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_pessoa_pessoa__["a" /* PessoaProvider */]) === "function" && _f || Object])
    ], NovalistaPage);
    return NovalistaPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=novalista.js.map

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 172;

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/cadastro-local/cadastro-local.module": [
		515,
		6
	],
	"../pages/comentariofoto/comentariofoto.module": [
		516,
		5
	],
	"../pages/inclui-foto/inclui-foto.module": [
		517,
		4
	],
	"../pages/login/login.module": [
		518,
		3
	],
	"../pages/novalista/novalista.module": [
		519,
		2
	],
	"../pages/signup/signup.module": [
		520,
		1
	],
	"../pages/visualizar-fotos/visualizar-fotos.module": [
		521,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 278;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidator; });
var EmailValidator = /** @class */ (function () {
    function EmailValidator() {
    }
    EmailValidator.isValid = function (control) {
        var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(control.value);
        if (re) {
            return null;
        }
        return {
            "invalidEmail": true
        };
    };
    return EmailValidator;
}());

//# sourceMappingURL=email.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ListaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ListaProvider = /** @class */ (function () {
    function ListaProvider(db, auth) {
        this.db = db;
        this.auth = auth;
        this.itemsRef = db.list('lista');
    }
    ListaProvider.prototype.insere = function (nome, produtos) {
        var obj = { nome: nome, produtos: produtos, id: this.auth.afAuth.auth.currentUser.uid };
        this.itemsRef.push(obj);
    };
    ListaProvider.prototype.getAll = function () {
        return this.itemsRef.snapshotChanges();
    };
    ListaProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_auth__["a" /* AuthProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_auth__["a" /* AuthProvider */]) === "function" && _b || Object])
    ], ListaProvider);
    return ListaProvider;
    var _a, _b;
}());

//# sourceMappingURL=lista.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(95);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = /** @class */ (function () {
    function AuthProvider(afAuth) {
        this.afAuth = afAuth;
    }
    // faz login usando email e password, usando a autenticacao do firebase
    // NECESSARIO ATIVAR O RECURSO NO BANCO
    AuthProvider.prototype.loginUser = function (newEmail, newPassword) {
        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
    };
    // aqui faz logout pois podemos ter varios tipos de autenticacao, facebook, google
    // cada uma tem seu metodo de logout, se tiver mais tipos, validar um a um aqui para logout
    AuthProvider.prototype.logoutUser = function () {
        if (this.afAuth.auth.currentUser.providerData.length) {
            for (var i = 0; i < this.afAuth.auth.currentUser.providerData.length; i++) {
                var provider = this.afAuth.auth.currentUser.providerData[i];
                if (provider.providerId == "password") {
                    return this.afAuth.auth.signOut();
                }
            }
        }
    };
    // cria um usuario no firebase com email e senha
    AuthProvider.prototype.signupUser = function (newEmail, newPassword) {
        return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(343);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_inclui_foto_inclui_foto__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__environments_environment__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_local_local__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_cadastro_local_cadastro_local__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_fotos_fotos__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_camera__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_visualizar_fotos_visualizar_fotos__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_geolocation__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_signup_signup__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_comentariofoto_comentariofoto__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_pessoa_pessoa__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_novalista_novalista__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_lista_lista__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_cadastro_local_cadastro_local__["a" /* CadastroLocalPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_inclui_foto_inclui_foto__["a" /* IncluiFotoPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_visualizar_fotos_visualizar_fotos__["a" /* VisualizarFotosPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_comentariofoto_comentariofoto__["a" /* ComentariofotoPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_novalista_novalista__["a" /* NovalistaPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/cadastro-local/cadastro-local.module#CadastroLocalPageModule', name: 'CadastroLocalPage', segment: 'cadastro-local', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/comentariofoto/comentariofoto.module#ComentariofotoPageModule', name: 'ComentariofotoPage', segment: 'comentariofoto', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/inclui-foto/inclui-foto.module#IncluiFotoPageModule', name: 'IncluiFotoPage', segment: 'inclui-foto', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/novalista/novalista.module#NovalistaPageModule', name: 'NovalistaPage', segment: 'novalista', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignuPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/visualizar-fotos/visualizar-fotos.module#VisualizarFotosPageModule', name: 'VisualizarFotosPage', segment: 'visualizar-fotos', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_10__environments_environment__["a" /* firebaseConfig */]),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_auth__["b" /* AngularFireAuthModule */] // modulo de autenticacao
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_cadastro_local_cadastro_local__["a" /* CadastroLocalPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_inclui_foto_inclui_foto__["a" /* IncluiFotoPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_visualizar_fotos_visualizar_fotos__["a" /* VisualizarFotosPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_comentariofoto_comentariofoto__["a" /* ComentariofotoPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_novalista_novalista__["a" /* NovalistaPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_local_local__["a" /* LocalProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_fotos_fotos__["a" /* FotosProvider */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_22__providers_pessoa_pessoa__["a" /* PessoaProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_lista_lista__["a" /* ListaProvider */] //plugin de geolocalizacao
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_cadastro_local_cadastro_local__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_login_login__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_novalista_novalista__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, authProvider) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.afAuth = afAuth;
        this.authProvider = authProvider;
        /*aqui verificamos se há um usuário já logado na memoria do angularfireauth
        caso haja não é necessário um novo login, envia o usuario direto pro home*/
        var authObserver = this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
                authObserver.unsubscribe();
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_1__pages_login_login__["a" /* LoginPage */];
                authObserver.unsubscribe();
            }
        });
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Cadastro de Produto', component: __WEBPACK_IMPORTED_MODULE_0__pages_cadastro_local_cadastro_local__["a" /* CadastroLocalPage */] },
            { title: 'Nova Lista', component: __WEBPACK_IMPORTED_MODULE_9__pages_novalista_novalista__["a" /* NovalistaPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component);
    };
    // faz logou do usuario usando o metodo do authprovider
    MyApp.prototype.logout = function () {
        this.authProvider.logoutUser();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_1__pages_login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/cristiano/pos---aula2/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n      <!-- botao sair fixo -->\n      <button menuClose ion-item (click)="logout()">\n        Sair\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/cristiano/pos---aula2/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_8__providers_auth_auth__["a" /* AuthProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
// aqui contem as configuracoes do firebase
var firebaseConfig = {
    // apiKey: "AIzaSyDgijGITEIlATn68JMq_8Oc9adUmSWa0aI",
    // authDomain: "aula2-aed16.firebaseapp.com",
    // databaseURL: "https://aula2-aed16.firebaseio.com",
    // projectId: "aula2-aed16",
    // storageBucket: "aula2-aed16.appspot.com",
    // messagingSenderId: "14419926999"
    apiKey: "AIzaSyAIKalqvxNBpvEnQyOK2nXpaGC-aoVyd44",
    authDomain: "javaprojeto-60762.firebaseapp.com",
    databaseURL: "https://javaprojeto-60762.firebaseio.com",
    projectId: "javaprojeto-60762",
    storageBucket: "javaprojeto-60762.appspot.com",
    messagingSenderId: "77768402384"
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__visualizar_fotos_visualizar_fotos__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_lista_lista__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, listaProvider, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.listaProvider = listaProvider;
        this.navParams = navParams;
        this.lista = [];
        this.listapromisse = [];
        // retorna uma promisse com os dados (nao real time)
        // this.localProvider.getAllPromisse().then(res=>this.listapromisse = res);
        // retorna um observable, que faz um socket com o firebase (real time)
        this.listaProvider.getAll().subscribe(function (res) { return _this.lista = res; });
    }
    // abre a pagina passando parametro para proxima
    HomePage.prototype.abreDetalhes = function (obj) {
        this.navParams.data = obj;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__visualizar_fotos_visualizar_fotos__["a" /* VisualizarFotosPage */], this.navParams);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/cristiano/pos---aula2/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Minhas Listas</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Listas cadastradas</h3>\n \n \n  <ion-list *ngFor="let item of lista" >\n      <button ion-item padding-left style="border-bottom: 1px grey solid" (click)="abreDetalhes(item.payload.val().produtos)" >\n          {{item.payload.val().nome}} \n      </button>\n  </ion-list>\n \n\n\n</ion-content>\n'/*ion-inline-end:"/home/cristiano/pos---aula2/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_lista_lista__["a" /* ListaProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_lista_lista__["a" /* ListaProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */]) === "function" && _c || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FotosProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_auth__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the FotosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FotosProvider = /** @class */ (function () {
    function FotosProvider(db, authProvider) {
        this.db = db;
        this.authProvider = authProvider;
        this.itemsRef = db.list('foto'); //seleciona qual tabela será conectado
    }
    /* buscas com query no firebase só aceitam um atributo para filtro e uma ordenaçao
    /nesse metodo está mais generico onde order by é o campo que quer buscar e
    equalTo é o valor que vc quer que o campo order by tenha */
    FotosProvider.prototype.getByQuery = function (orderby, equal) {
        return this.db.list('foto', function (ref) { return ref.orderByChild(orderby).equalTo(equal); }).snapshotChanges();
    };
    //passamos a chave do local e as coordenadas por parametro para salvar junto com a foto
    FotosProvider.prototype.uploadMulti = function (arquivos, key, coordenadas) {
        // percorre todas as imagens do upload
        for (var _i = 0, arquivos_1 = arquivos; _i < arquivos_1.length; _i++) {
            var arquivo = arquivos_1[_i];
            this.pushUpload(arquivo, key, coordenadas);
        }
    };
    FotosProvider.prototype.pushUpload = function (upload, key, coordenadas) {
        var _this = this;
        // cria um ID unico para a foto no storage, é o usuario que faz o upload e o time
        var idimagem = this.authProvider.afAuth.auth.currentUser.uid + '-' + new Date().getTime();
        //cria uma referencia ao storage do nosso banco firebase
        var storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase__["storage"]().ref();
        /* cria o registro no firebase..nota-se que passei a KEY do local, dessa maneira será
        criada uma pasta no storage com o KEY do local e a imagem em JPG com o nome que criamos */
        var imageRef = storageRef.child('/' + key + '/' + idimagem + '.jpg');
        // insere a imagem no arquivo criado no storage, como usamos data_url usamos o metodo putString
        imageRef.putString(upload, 'data_url').then(function (res) {
            /*ao final do upload pegamos os dados da imagem no caso salvamos o nome do arquivo
            a url de download, facilitando mostrar na view novamente, o dono da imagem e as coordenadas
            */
            var obj = { idlocal: key, downloadurl: res.downloadURL, nomearquivo: res.ref.name, uid: _this.authProvider.afAuth.auth.currentUser.uid, coordenadas: coordenadas };
            _this.insere(obj);
        });
    };
    // salva o obj foto depois do upload feito
    FotosProvider.prototype.insere = function (obj) {
        this.itemsRef.push(obj);
    };
    FotosProvider.prototype.editar = function (chave, foto) {
        this.itemsRef.update(chave, foto);
    };
    FotosProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_0__auth_auth__["a" /* AuthProvider */]])
    ], FotosProvider);
    return FotosProvider;
}());

//# sourceMappingURL=fotos.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the LocalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var LocalProvider = /** @class */ (function () {
    function LocalProvider(db) {
        this.db = db;
        this.itemsRef = db.list('produto');
    }
    // retorna uma promisse de local, nao é real time
    LocalProvider.prototype.getAllPromisse = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.itemsRef.snapshotChanges().subscribe(function (items) { return resolve(items); });
        });
    };
    // retorna um observable real time da lista de local
    LocalProvider.prototype.getAll = function () {
        return this.itemsRef.snapshotChanges();
    };
    // exemplo como retornar apenas um registro passando o ID
    LocalProvider.prototype.retornaUm = function (id) {
        return this.db.object('produto/' + id).valueChanges();
    };
    //insere um local
    LocalProvider.prototype.insere = function (obj) {
        this.itemsRef.push(obj);
    };
    LocalProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], LocalProvider);
    return LocalProvider;
}());

//# sourceMappingURL=local.js.map

/***/ })

},[323]);
//# sourceMappingURL=main.js.map