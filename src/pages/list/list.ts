import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { AddPage } from '../add/add';
import { EventPage } from '../event/event';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private nativeStorage: NativeStorage, public events: Events) {
    this.nativeStorage.getItem('events')
      .then(data => {
          this.list = data;
          console.log(data);
        });

        this.events.subscribe('events:created', (data, time) => {
          this.list = data;
          console.log(data);
        });

  }

  goToAddEvent() {
    this.navCtrl.push(AddPage);
  }

  goToEvent(name: string) {
    this.navCtrl.push(AddPage, {
      name
    });
  }
}
