import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {
  private database: SQLiteObject;

  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {
    this.initializeDB();
  }

  /**
   * 1. initialize sqlite db if have not been initialized yet
   * 2. create all local table for first time
   */
  initializeDB() {
    let sqlString = "CREATE TABLE IF NOT EXISTS tbDemo(Id INTEGER PRIMARY KEY autoincrement,title TEXT,start TEXT, end TEXT)";

    return this.platform.ready()
      .then(() => {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {

            this.database = db;

            db.executeSql(sqlString, [])
              .then(() => console.log('Executed SQL'))
              .catch(e => console.log(e));

          })
          .catch(e => console.log(e));
      });
  }

  /**
* get SQL lite object reference
*/
  getSQLiteObject() {
    return this.database;
  }

}
