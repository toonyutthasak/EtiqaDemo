import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { ToDo } from '../../providers/database/data/model';
import { DatabaseProvider } from '../../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {
  title: string = '';

  todo: ToDo = {
    title: this.title,
    start: new Date().toISOString().substring(0, 10),
    end: new Date().toISOString().substring(0, 10)
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private databaseP: DatabaseProvider,private nav:Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  onSubmit() {
    console.log(this.todo);
    let sqlObj = this.databaseP.getSQLiteObject();
    this.upsertToDo(this.todo,sqlObj);
    this.nav.pop()
  }

  upsertToDo(a: ToDo,sqlObj:SQLiteObject) {
    return sqlObj.transaction((tx) => {
      tx.executeSql("INSERT OR IGNORE INTO tbDemo(title,start,end) VALUES('" + a.title + "','" + a.start + "','" + a.end+"')", []);
      console.log(tx);
    }).catch(e => {
      console.log(e)
    })

  }

}
