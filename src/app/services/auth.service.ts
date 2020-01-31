import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetUserAction } from '../redux/user.actions';
import { Router } from '@angular/router';
import { SetCategorieAction } from '../redux/categories.actions';
import { SetCategorieDoctorsAction } from '../redux/categories-doctors.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private publicKey = "wd2yTcKPlW9qcXWiv8MhQ8rOGHjcrJuC";
  private secureIV = "sfsdfsdfsdf12345";
  private privateKey = "";
  token = "";

  private url = "https://test.mindhelp.mx/api/v1/";

  private user = null;

  constructor( private http: HttpClient, private store: Store<AppState>, private route: Router ) { }

  login(user) {
    let url = `${this.url}app_login`;
    this.http.post(url, user).subscribe((data:any) => {
      let user = JSON.parse(this.decrypt(data.user));
      this.store.dispatch(new SetUserAction({... user}))
      this.user = user;
      this.privateKey = user.enckey;
      this.token = user.token;
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

  /**
   *
   *
   * @param {*} data la informacion que encriptaras
   * @param {string} [type="public"] si la llave que usaras sera publica o privada
   * @returns retorna la data encryptada
   * @memberof AuthService
   */
  encrypt(data: any, type: string = "public") {
    let _key = type == "public" ? CryptoJS.enc.Utf8.parse(this.publicKey) : CryptoJS.enc.Utf8.parse(this.privateKey) ;
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

  /**
   *
   *
   * @param {*} data la informacion que desencriptaras
   * @param {string} [type="public"] si la llave que usaras sera publica o privada
   * @returns retorna la data desencryptada
   * @memberof AuthService
   */
  decrypt(data: any, type: string = "public") {
    let _key = type == "public" ? CryptoJS.enc.Utf8.parse(this.publicKey) : CryptoJS.enc.Utf8.parse(this.privateKey) ;
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

  getCategories(){
    let url = `${this.url}categories`;
    this.http.post(url,{}).subscribe((data:any) => {
      let c = JSON.parse(this.decrypt(data.data));
      this.store.dispatch(new SetCategorieAction([...c.categlories]))
    }, err => {
      console.log(err)
      // this.presentAlert(err.error.msg);
    })
  }

  getDoctors(data){
    let url = `${this.url}doctors`;
    this.http.post(url,data).subscribe((data:any) => {
      let doctors = JSON.parse(this.decrypt(data.data, "public"));
      this.store.dispatch(new SetCategorieDoctorsAction([...doctors.doctors]))
    }, err => {
      console.log(err)
      // this.presentAlert(err.error.msg);
    })
  }

}
