import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { APP } from '../app/app.config';
import { NativeStorage } from '@ionic-native/native-storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  isLoggedIn: boolean;
  token: string;

  constructor(private http: Http, private nativeStorage: NativeStorage) {
    this.isLoggedIn = false;
    this.token = localStorage.getItem('token');

    if (this.token)
      this.isLoggedIn = true;
  }

  login(email: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let options = new RequestOptions({ headers: headers });

    let body = `grant_type=password&username=${email}&password=${password}&client_id=${APP.CLIENT_ID}&client_secret=${APP.CLIENT_SECRET}`;

    return this.http.post(APP.URL_TOKEN, body, options)
      .map((response: Response) => {
        console.log(response.json());
        localStorage.setItem('token', JSON.stringify(response.json()));
        // this.isLoggedIn = true;
        // this.token = JSON.stringify(response.json());
        // return <any>response.json();
      })
      .catch((error: any) => Observable.throw(error.json() || 'Server error'))
      .toPromise();
  }

}
