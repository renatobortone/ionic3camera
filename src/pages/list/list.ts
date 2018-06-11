import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPage } from '../add/add';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  goToAddEvent() {
    this.navCtrl.push(AddPage);
  }
}
