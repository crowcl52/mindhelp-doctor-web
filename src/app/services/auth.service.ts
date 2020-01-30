import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetUserAction } from '../redux/user.actions';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  publicKey = "wd2yTcKPlW9qcXWiv8MhQ8rOGHjcrJuC";
  secureIV = "sfsdfsdfsdf12345";

  private url = "https://test.mindhelp.mx/api/v1/";

  private user = null;

  constructor( private http: HttpClient, private store: Store<AppState>, private route: Router ) { }

  login(user) {
    let url = `${this.url}app_login`;
    this.http.post(url, user).subscribe((data:any) => {
      console.log(data)
      let user = JSON.parse(this.decrypt(data.user));
      this.store.dispatch(new SetUserAction({... user}))
      this.user = user;
      this.route.navigate(['panel']);
    }, err => {
      console.log(err.error.msg);
      // this.presentAlert(err.error.msg);
    })
  }

  register(user){
    let url = `${this.url}register`;
    this.http.post(url, user).subscribe((data:any) => {
      let user = JSON.parse(this.decrypt(data.user));
      this.store.dispatch(new SetUserAction({... user}))
      this.user = user;
      this.route.navigate(['panel']);
    }, err => {
      console.log(err.error.msg);
      // this.presentAlert(err.error.msg);
    })
  }

  isAuth(): boolean {
    console.log(this.user)
    if (this.user != null) {
      return true;
    } else {
      this.route.navigate(['login']);
      return false;
    }
  }

  encrypt(data) {
    let _key = CryptoJS.enc.Utf8.parse(this.publicKey);
    let _iv = CryptoJS.enc.Utf8.parse(this.secureIV);

    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data), _key, {
        keySize: 128,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }

  decrypt(data) {
    let _key = CryptoJS.enc.Utf8.parse(this.publicKey);
    let _iv = CryptoJS.enc.Utf8.parse(this.secureIV);

    let decrypted = CryptoJS.AES.decrypt(
     data, _key, {
        keySize: 128,
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8)
    return decrypted;
  }


}
