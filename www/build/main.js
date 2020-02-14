webpackJsonp([1],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_create__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_database_data_todolist__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
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
    function HomePage(navCtrl, databaseP) {
        this.navCtrl = navCtrl;
        this.databaseP = databaseP;
        this.creationPage = __WEBPACK_IMPORTED_MODULE_2__create_create__["a" /* CreatePage */];
        this.todoList = [];
        this.todoList;
    }
    HomePage.prototype.ionViewDidEnter = function () {
        this.loadToDolist();
    };
    HomePage.prototype.nextPage = function () {
        this.navCtrl.push(this.creationPage);
    };
    HomePage.prototype.loadToDolist = function () {
        var _this = this;
        return this.loadList()
            .then(function (data) {
            _this.todoList = data;
            console.log(_this.todoList);
        }).catch(function (e) {
            console.log(e);
        });
    };
    HomePage.prototype.loadList = function () {
        var todoList = [];
        return this.getToDoList().then(function (data) {
            if (data == null || data.rows.length == 0) {
                return Promise.resolve(null);
            }
            else {
                // if got to do - map to page model
                for (var i = 0; i < data.rows.length; i++) {
                    var item = data.rows.item(i);
                    var currentTime = new Date();
                    var endTime = new Date(item.end);
                    var diff = __WEBPACK_IMPORTED_MODULE_5_moment__(endTime, 'H:m').diff(__WEBPACK_IMPORTED_MODULE_5_moment__(currentTime, 'H:m'));
                    var remaining = '';
                    if (diff < 0) {
                        remaining = '0 minutes';
                    }
                    else {
                        var d = __WEBPACK_IMPORTED_MODULE_5_moment__["duration"](diff);
                        remaining = Math.floor(d.asHours()) + " hours " + __WEBPACK_IMPORTED_MODULE_5_moment__["utc"](diff).format("mm") + " minutes";
                    }
                    var todo = new __WEBPACK_IMPORTED_MODULE_4__providers_database_data_todolist__["a" /* ToDoModel */](item.title, item.start, item.end, remaining);
                    todoList.push(todo);
                }
                return Promise.resolve(todoList);
            }
        });
    };
    HomePage.prototype.getToDoList = function () {
        var query = 'SELECT * from tbDemo';
        return this.databaseP.getSQLiteObject().executeSql(query, [])
            .then(function (leaves) {
            return Promise.resolve(leaves);
        }).catch(function (e) {
            return e;
        });
    };
    HomePage.prototype.refreshPage = function () {
        var _this = this;
        return this.loadList()
            .then(function (data) {
            _this.todoList = data;
            console.log(_this.todoList);
            _this.refresher.complete();
        }).catch(function (e) {
            console.log(e);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Refresher */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Refresher */])
    ], HomePage.prototype, "refresher", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\vikthoon.phan\DemoProject\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>To-Do List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="refreshPage()">\n    <ion-refresher-content pullingIcon="md-arrow-down" pullingText="pull to refresh" refreshingSpinner="circles"\n      refreshingText="refreshing">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <div>\n    <ion-list [hidden]="todoList?.length == 0" *ngFor="let todo of todoList; let i = index">\n      <ion-card class="card">\n        <ion-card-header class="rowHeader">\n          <b>{{todo.title}}</b>\n        </ion-card-header>\n\n        <ion-card-content>\n          <ion-row class="rowFirst">\n            <ion-col col-4>\n              <b>Start Date</b>\n            </ion-col>\n            <ion-col col-4>\n              <b>End Date</b>\n            </ion-col>\n            <ion-col col-4>\n              <b>Time Left</b>\n            </ion-col>\n          </ion-row>\n\n          <ion-row class="rowSecond">\n            <ion-col col-4>\n              {{todo.start | date: \'dd MMM yyyy\' }}\n            </ion-col>\n            <ion-col col-4>\n              {{todo.end | date: \'dd MMM yyyy\' }}\n            </ion-col>\n            <ion-col col-4>\n              {{todo.remaining}}\n            </ion-col>\n          </ion-row>\n        </ion-card-content>\n\n        <ion-row class="footer">\n          <ion-col col-1></ion-col>\n          <ion-col col-5 class="rowFirst">\n            <p>Status:<b color="black">Incomplete</b></p>\n          </ion-col>\n\n          <ion-col col-4>\n            <p>Tick if completed</p>\n          </ion-col>\n\n          <ion-col col-1>\n            <ion-checkbox mode="ios"></ion-checkbox>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-list>\n  </div>\n</ion-content>\n\n<ion-footer class="footerColor">\n    <ion-fab bottom center>\n      <button ion-fab color="danger" (click)="nextPage()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-fab>\n</ion-footer>'/*ion-inline-end:"C:\Users\vikthoon.phan\DemoProject\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(47);
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
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreatePage = /** @class */ (function () {
    function CreatePage(navCtrl, navParams, databaseP) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.databaseP = databaseP;
        this.title = '';
        this.todo = {
            title: this.title,
            start: new Date().toISOString().substring(0, 10),
            end: new Date().toISOString().substring(0, 10)
        };
    }
    CreatePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreatePage');
    };
    CreatePage.prototype.onSubmit = function () {
        console.log(this.todo);
        var sqlObj = this.databaseP.getSQLiteObject();
        this.upsertToDo(this.todo, sqlObj);
    };
    CreatePage.prototype.upsertToDo = function (a, sqlObj) {
        return sqlObj.transaction(function (tx) {
            tx.executeSql("INSERT OR IGNORE INTO tbDemo(title,start,end) VALUES('" + a.title + "','" + a.start + "','" + a.end + "')", []);
            console.log(tx);
        }).catch(function (e) {
            console.log(e);
        });
    };
    CreatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create',template:/*ion-inline-start:"C:\Users\vikthoon.phan\DemoProject\src\pages\create\create.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Add new To-Do List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div>\n    <ion-row class="rowHeader">\n      <b>To-Do Title</b>\n    </ion-row>\n    <ion-row>\n      <ion-item class="borderedInput">\n        <ion-textarea [(ngModel)]="todo.title" placeholder="Please key in your To-Do title here"></ion-textarea>\n      </ion-item>\n    </ion-row>\n\n    <ion-row class="rowHeader">\n      <b>Start Date</b>\n    </ion-row>\n\n    <ion-row class="rowHeader">\n      <ion-item class="borderedInputSmall">\n        <ion-datetime [(ngModel)]="todo.start"  placeholder="Select a date" displayFormat="D MMM YYYY">\n          {{todo.start}}\n        </ion-datetime>\n      </ion-item>\n    </ion-row>\n\n    <ion-row class="rowHeader">\n      <b>Estimate End Date</b>\n    </ion-row>\n\n    <ion-row class="rowHeader">\n      <ion-item class="borderedInputSmall">\n        <ion-datetime [(ngModel)]="todo.end" placeholder="Select a date" displayFormat="D MMM YYYY">\n          {{todo.end}}\n        </ion-datetime>\n      </ion-item>\n    </ion-row>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n  <ion-row>\n    <ion-col class="sendButtonCol" col-12>\n      <button ion-button color="dark" full (click)="onSubmit()">Create Now</button>\n    </ion-col>\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"C:\Users\vikthoon.phan\DemoProject\src\pages\create\create.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */]])
    ], CreatePage);
    return CreatePage;
}());

//# sourceMappingURL=create.js.map

/***/ }),

/***/ 113:
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
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/create/create.module": [
		409,
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
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(350);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_storage_storage__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_create_create__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_database_database__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_sqlite_porter__ = __webpack_require__(408);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_create_create__["a" /* CreatePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/create/create.module#CreatePageModule', name: 'CreatePage', segment: 'create', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_create_create__["a" /* CreatePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_storage_storage__["a" /* StorageProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_sqlite_porter__["a" /* SQLitePorter */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_database_database__ = __webpack_require__(47);
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
    function MyApp(platform, statusBar, splashScreen, databaseP) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            databaseP.initializeDB();
            statusBar.styleDefault();
            splashScreen.hide();
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
            _this.rootPage.loadToDolist();
        });
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\vikthoon.phan\DemoProject\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\vikthoon.phan\DemoProject\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__providers_database_database__["a" /* DatabaseProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToDoModel; });
var ToDoModel = /** @class */ (function () {
    function ToDoModel(title, start, end, remaining) {
        this.title = title;
        this.start = start;
        this.end = end;
        this.remaining = remaining;
    }
    return ToDoModel;
}());

//# sourceMappingURL=todolist.js.map

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 199,
	"./af.js": 199,
	"./ar": 200,
	"./ar-dz": 201,
	"./ar-dz.js": 201,
	"./ar-kw": 202,
	"./ar-kw.js": 202,
	"./ar-ly": 203,
	"./ar-ly.js": 203,
	"./ar-ma": 204,
	"./ar-ma.js": 204,
	"./ar-sa": 205,
	"./ar-sa.js": 205,
	"./ar-tn": 206,
	"./ar-tn.js": 206,
	"./ar.js": 200,
	"./az": 207,
	"./az.js": 207,
	"./be": 208,
	"./be.js": 208,
	"./bg": 209,
	"./bg.js": 209,
	"./bm": 210,
	"./bm.js": 210,
	"./bn": 211,
	"./bn.js": 211,
	"./bo": 212,
	"./bo.js": 212,
	"./br": 213,
	"./br.js": 213,
	"./bs": 214,
	"./bs.js": 214,
	"./ca": 215,
	"./ca.js": 215,
	"./cs": 216,
	"./cs.js": 216,
	"./cv": 217,
	"./cv.js": 217,
	"./cy": 218,
	"./cy.js": 218,
	"./da": 219,
	"./da.js": 219,
	"./de": 220,
	"./de-at": 221,
	"./de-at.js": 221,
	"./de-ch": 222,
	"./de-ch.js": 222,
	"./de.js": 220,
	"./dv": 223,
	"./dv.js": 223,
	"./el": 224,
	"./el.js": 224,
	"./en-SG": 225,
	"./en-SG.js": 225,
	"./en-au": 226,
	"./en-au.js": 226,
	"./en-ca": 227,
	"./en-ca.js": 227,
	"./en-gb": 228,
	"./en-gb.js": 228,
	"./en-ie": 229,
	"./en-ie.js": 229,
	"./en-il": 230,
	"./en-il.js": 230,
	"./en-nz": 231,
	"./en-nz.js": 231,
	"./eo": 232,
	"./eo.js": 232,
	"./es": 233,
	"./es-do": 234,
	"./es-do.js": 234,
	"./es-us": 235,
	"./es-us.js": 235,
	"./es.js": 233,
	"./et": 236,
	"./et.js": 236,
	"./eu": 237,
	"./eu.js": 237,
	"./fa": 238,
	"./fa.js": 238,
	"./fi": 239,
	"./fi.js": 239,
	"./fo": 240,
	"./fo.js": 240,
	"./fr": 241,
	"./fr-ca": 242,
	"./fr-ca.js": 242,
	"./fr-ch": 243,
	"./fr-ch.js": 243,
	"./fr.js": 241,
	"./fy": 244,
	"./fy.js": 244,
	"./ga": 245,
	"./ga.js": 245,
	"./gd": 246,
	"./gd.js": 246,
	"./gl": 247,
	"./gl.js": 247,
	"./gom-latn": 248,
	"./gom-latn.js": 248,
	"./gu": 249,
	"./gu.js": 249,
	"./he": 250,
	"./he.js": 250,
	"./hi": 251,
	"./hi.js": 251,
	"./hr": 252,
	"./hr.js": 252,
	"./hu": 253,
	"./hu.js": 253,
	"./hy-am": 254,
	"./hy-am.js": 254,
	"./id": 255,
	"./id.js": 255,
	"./is": 256,
	"./is.js": 256,
	"./it": 257,
	"./it-ch": 258,
	"./it-ch.js": 258,
	"./it.js": 257,
	"./ja": 259,
	"./ja.js": 259,
	"./jv": 260,
	"./jv.js": 260,
	"./ka": 261,
	"./ka.js": 261,
	"./kk": 262,
	"./kk.js": 262,
	"./km": 263,
	"./km.js": 263,
	"./kn": 264,
	"./kn.js": 264,
	"./ko": 265,
	"./ko.js": 265,
	"./ku": 266,
	"./ku.js": 266,
	"./ky": 267,
	"./ky.js": 267,
	"./lb": 268,
	"./lb.js": 268,
	"./lo": 269,
	"./lo.js": 269,
	"./lt": 270,
	"./lt.js": 270,
	"./lv": 271,
	"./lv.js": 271,
	"./me": 272,
	"./me.js": 272,
	"./mi": 273,
	"./mi.js": 273,
	"./mk": 274,
	"./mk.js": 274,
	"./ml": 275,
	"./ml.js": 275,
	"./mn": 276,
	"./mn.js": 276,
	"./mr": 277,
	"./mr.js": 277,
	"./ms": 278,
	"./ms-my": 279,
	"./ms-my.js": 279,
	"./ms.js": 278,
	"./mt": 280,
	"./mt.js": 280,
	"./my": 281,
	"./my.js": 281,
	"./nb": 282,
	"./nb.js": 282,
	"./ne": 283,
	"./ne.js": 283,
	"./nl": 284,
	"./nl-be": 285,
	"./nl-be.js": 285,
	"./nl.js": 284,
	"./nn": 286,
	"./nn.js": 286,
	"./pa-in": 287,
	"./pa-in.js": 287,
	"./pl": 288,
	"./pl.js": 288,
	"./pt": 289,
	"./pt-br": 290,
	"./pt-br.js": 290,
	"./pt.js": 289,
	"./ro": 291,
	"./ro.js": 291,
	"./ru": 292,
	"./ru.js": 292,
	"./sd": 293,
	"./sd.js": 293,
	"./se": 294,
	"./se.js": 294,
	"./si": 295,
	"./si.js": 295,
	"./sk": 296,
	"./sk.js": 296,
	"./sl": 297,
	"./sl.js": 297,
	"./sq": 298,
	"./sq.js": 298,
	"./sr": 299,
	"./sr-cyrl": 300,
	"./sr-cyrl.js": 300,
	"./sr.js": 299,
	"./ss": 301,
	"./ss.js": 301,
	"./sv": 302,
	"./sv.js": 302,
	"./sw": 303,
	"./sw.js": 303,
	"./ta": 304,
	"./ta.js": 304,
	"./te": 305,
	"./te.js": 305,
	"./tet": 306,
	"./tet.js": 306,
	"./tg": 307,
	"./tg.js": 307,
	"./th": 308,
	"./th.js": 308,
	"./tl-ph": 309,
	"./tl-ph.js": 309,
	"./tlh": 310,
	"./tlh.js": 310,
	"./tr": 311,
	"./tr.js": 311,
	"./tzl": 312,
	"./tzl.js": 312,
	"./tzm": 313,
	"./tzm-latn": 314,
	"./tzm-latn.js": 314,
	"./tzm.js": 313,
	"./ug-cn": 315,
	"./ug-cn.js": 315,
	"./uk": 316,
	"./uk.js": 316,
	"./ur": 317,
	"./ur.js": 317,
	"./uz": 318,
	"./uz-latn": 319,
	"./uz-latn.js": 319,
	"./uz.js": 318,
	"./vi": 320,
	"./vi.js": 320,
	"./x-pseudo": 321,
	"./x-pseudo.js": 321,
	"./yo": 322,
	"./yo.js": 322,
	"./zh-cn": 323,
	"./zh-cn.js": 323,
	"./zh-hk": 324,
	"./zh-hk.js": 324,
	"./zh-tw": 325,
	"./zh-tw.js": 325
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 403;

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\vikthoon.phan\DemoProject\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <!-- <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab> -->\n</ion-tabs>\n'/*ion-inline-end:"C:\Users\vikthoon.phan\DemoProject\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(406);
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
 * Read and set information in local storage.
 */
var StorageProvider = /** @class */ (function () {
    function StorageProvider(storage) {
        this.storage = storage;
    }
    StorageProvider_1 = StorageProvider;
    /**
     * Set value for key
     * @param key: Key
     * @param value: value
     */
    StorageProvider.prototype.setKeyValue = function (key, value) {
        return this.storage.ready().then(function (localForage) {
            if (value != null) {
                //Return void
                return localForage.setItem(key, value).then(function () { });
            }
            else {
                return localForage.removeItem(key);
            }
        });
    };
    /**
     * Get value for key
     * @param key: Key
     * @param defaultValue: default value
     * @return value for this key
     */
    StorageProvider.prototype.getKeyValue = function (key, defaultValue) {
        return this.storage.ready().then(function (localForage) {
            return localForage.getItem(key)
                .then(function (value) {
                if (value != null || defaultValue == null) {
                    return value;
                }
                else {
                    return defaultValue;
                }
            });
        });
    };
    /**
     * Clear local storage
     */
    StorageProvider.prototype.purgeStorage = function () {
        return this.storage.ready().then(function (localForage) {
            return localForage.clear();
        });
    };
    /**
     * Set value for table initialisation key
     */
    StorageProvider.prototype.setInitTables = function () {
        return this.setKeyValue(StorageProvider_1.KEY_INIT_TABLES, true);
    };
    /**
     * Get key for table initialisation
     * @return value for init table key
     */
    StorageProvider.prototype.getInitTables = function () {
        return this.getKeyValue(StorageProvider_1.KEY_INIT_TABLES, false);
    };
    /**
     * Set access token
     * @param accessToken access token for user
     */
    StorageProvider.prototype.setAccessToken = function (accessToken) {
        return this.setKeyValue(StorageProvider_1.KEY_ACCESS_TOKEN, accessToken);
    };
    /**
     * Get access token
     * @return  access token for user
     */
    StorageProvider.prototype.getAccessToken = function () {
        return this.getKeyValue(StorageProvider_1.KEY_ACCESS_TOKEN, '');
    };
    /**
     * Set user role
     * @param role user role
     */
    StorageProvider.prototype.setUserRole = function (role) {
        return this.setKeyValue(StorageProvider_1.KEY_ROLE, role);
    };
    /**
      * Get user role
      * @return  role for user
      */
    StorageProvider.prototype.getUserRole = function () {
        return this.getKeyValue(StorageProvider_1.KEY_ROLE, '');
    };
    /**
    * Set user role level
    * @param roleLevel user role level
    */
    StorageProvider.prototype.setUserRoleLevel = function (roleLevel) {
        return this.setKeyValue(StorageProvider_1.KEY_ROLE_LEVEL, roleLevel);
    };
    /**
     * Get user role level
     * @return user role level
     */
    StorageProvider.prototype.getUserRoleLevel = function () {
        return this.getKeyValue(StorageProvider_1.KEY_ROLE_LEVEL, '');
    };
    StorageProvider.KEY_ACCESS_TOKEN = "access_token";
    StorageProvider.KEY_ROLE = "role";
    StorageProvider.KEY_ROLE_LEVEL = "roleLevel";
    StorageProvider.KEY_INIT_TABLES = "initialiseTables";
    StorageProvider = StorageProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["a" /* Storage */]])
    ], StorageProvider);
    return StorageProvider;
    var StorageProvider_1;
}());

//# sourceMappingURL=storage.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(sqlite, platform) {
        this.sqlite = sqlite;
        this.platform = platform;
        this.initializeDB();
    }
    /**
     * 1. initialize sqlite db if have not been initialized yet
     * 2. create all local table for first time
     */
    DatabaseProvider.prototype.initializeDB = function () {
        var _this = this;
        var sqlString = "CREATE TABLE IF NOT EXISTS tbDemo(Id INTEGER PRIMARY KEY autoincrement,title TEXT,start TEXT, end TEXT)";
        return this.platform.ready()
            .then(function () {
            _this.sqlite.create({
                name: 'data.db',
                location: 'default'
            })
                .then(function (db) {
                _this.database = db;
                db.executeSql(sqlString, [])
                    .then(function () { return console.log('Executed SQL'); })
                    .catch(function (e) { return console.log(e); });
            })
                .catch(function (e) { return console.log(e); });
        });
    };
    /**
  * get SQL lite object reference
  */
    DatabaseProvider.prototype.getSQLiteObject = function () {
        return this.database;
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Platform */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ })

},[327]);
//# sourceMappingURL=main.js.map