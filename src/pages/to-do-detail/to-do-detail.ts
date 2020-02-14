import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ToDoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-to-do-detail',
  templateUrl: 'to-do-detail.html',
})
export class ToDoDetailPage {
  todo: any = this.navParams.data;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.todo;
    console.log(this.todo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToDoDetailPage');
  }

}
