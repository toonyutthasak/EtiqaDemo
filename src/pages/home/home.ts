import { Component, ViewChild } from '@angular/core';
import { NavController, Refresher, DateTime } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { ToDo } from '../../providers/database/data/model';
import { DatabaseProvider } from '../../providers/database/database';
import { ToDoModel } from '../../providers/database/data/todolist';
import * as moment from 'moment';
import { } from '../create/create';
import { ToDoDetailPage } from '../to-do-detail/to-do-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  creationPage: any = CreatePage;
  todoDetail: any = ToDoDetailPage;
  todoList: any = [];

  @ViewChild(Refresher) refresher: Refresher;

  constructor(public navCtrl: NavController,
    private databaseP: DatabaseProvider) {
    this.todoList;
  }

  ionViewDidEnter() {
    this.loadToDolist();
  }

  nextPage() {
    this.navCtrl.push(this.creationPage);
  }

  loadToDolist() {
    return this.loadList()
      .then(data => {
        this.todoList = data;
        console.log(this.todoList);
      }).catch(e => {
        console.log(e);
      });
  }

  loadList(): Promise<ToDoModel[]> {
    var todoList: ToDoModel[] = [];
    return this.getToDoList().then(data => {
      if (data == null || data.rows.length == 0) {
        return Promise.resolve(null);
      } else {
        // if got to do - map to page model
        for (var i = 0; i < data.rows.length; i++) {
          let item = data.rows.item(i);
          let currentTime = new Date()
          let endTime = new Date(item.end);

          let diff = moment(endTime, 'H:m').diff(moment(currentTime, 'H:m'));
          let remaining: string = '';

          if (diff < 0) {
            remaining = '0 minutes'
          } else {
            let d = moment.duration(diff);
            remaining = Math.floor(d.asHours()) + " hours " + moment.utc(diff).format("mm") + " minutes";
          }


          let todo = new ToDoModel(item.title, item.start, item.end, remaining, false)
          todoList.push(todo);
        }
        return Promise.resolve(todoList)
      }
    });
  }

  getToDoList(): Promise<any> {
    let query = 'SELECT * from tbDemo';

    return this.databaseP.getSQLiteObject().executeSql(query, [])
      .then(leaves => {
        return Promise.resolve(leaves);
      }).catch((e) => {
        return e;
      });
  }

  refreshPage() {
    return this.loadList()
      .then(data => {
        this.todoList = data;
        console.log(this.todoList);
        this.refresher.complete();
      }).catch(e => {
        console.log(e);
      });
  }

  check(check: boolean) {
    if (check == false) {
      this.todoList.isChecked = true
    } else {
      this.todoList.isChecked = false
    }
  }

  onClick(todoInfo: any) {
    console.log(todoInfo);
    this.navCtrl.push(this.todoDetail, todoInfo)
  }
}