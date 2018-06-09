import { Component } from '@angular/core';
import { NavController, NavParams, FabContainer } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  goToAddEvent(fab: FabContainer) {
    fab.close();
    console.log("Sharing in");
  }
}
