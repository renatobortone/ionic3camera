import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  name = null;
  event = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private nativeStorage: NativeStorage, public events: Events) {
      this.name = this.navParams.get('name');
      if(this.name){
        this.nativeStorage.getItem('events')
        .then(
          data => {
            console.log(data);
            this.event = data.find(item => item.name === this.name);
          })
      }
  }

  addEvent() {
    this.nativeStorage.getItem('events')
      .then(
        data => {
          data.push(this.event);
          this.events.publish('events:created', data, Date.now());
          this.nativeStorage.setItem('events', data)
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
        },
        () => {
          let array = []
          array.push(this.event);
          this.events.publish('events:created', array, Date.now());
          this.nativeStorage.setItem('events', array)
            .then(
              () => console.log('Stored item!'),
              error => console.error('Error storing item', error)
            );
        });
      }
}
