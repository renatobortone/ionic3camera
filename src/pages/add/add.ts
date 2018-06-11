import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  event = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  addEvent(event) {
    this.storage.get('events').then((list) => {
      list.push(event)
      this.storage.set('events', list)
    }).catch(err => {
      console.log(err);
    });
  }
}
