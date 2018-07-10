import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public loginForm = this.formBuilder.group({
    username: ["", Validators.compose([Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i), Validators.required])],
    password: ["", Validators.required]
  });

  constructor(public navCtrl: NavController,
    private camera: Camera, public formBuilder: FormBuilder, private authService: AuthService) {
    // this.takePhoto();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  login() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .then(() => {
        this.navCtrl.push(ListPage);
      }).catch((error: any) => {
        alert(error);
      });
  }

}
