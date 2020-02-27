import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SetUserAction } from '../redux/user.actions';
import { Router } from '@angular/router';
import { SetCategorieAction } from '../redux/categories.actions';
import { SetCategorieDoctorsAction } from '../redux/categories-doctors.actions';
import { ChangeTitleNav } from '../redux/ui.actions';
import { GetChatHistory } from '../redux/chat-history.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private publicKey = "wd2yTcKPlW9qcXWiv8MhQ8rOGHjcrJuC";
  private secureIV = "sfsdfsdfsdf12345";
  private privateKey = "";
  token = "";

  private url = "https://mindhelp.mx/api/v1/";

  private user = null;

  constructor(private http: HttpClient, private store: Store<AppState>, private route: Router) { }

  login(user) {
    let url = `${this.url}app_login`;
    this.http.post(url, user).subscribe((data: any) => {
      let user = JSON.parse(this.decrypt(data.user));
      this.store.dispatch(new SetUserAction({ ...user }))
      this.user = user;
      this.privateKey = user.enckey;
      this.token = user.token;
      this.route.navigate(['panel']);
    }, err => {
      console.log(err.error.msg);
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: err.error.msg,
      });
      // this.presentAlert(err.error.msg);
    })
  }

  register(user) {
    let url = `${this.url}register`;
    this.http.post(url, user).subscribe((data: any) => {
      let user = JSON.parse(this.decrypt(data.user));
      this.store.dispatch(new SetUserAction({ ...user }))
      this.user = user;
      this.route.navigate(['panel']);
    }, err => {
      console.log(err.error.msg);
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: err.error.msg,
      });
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
    let _key = (type == "public") ? CryptoJS.enc.Utf8.parse(this.publicKey) : CryptoJS.enc.Utf8.parse(this.privateKey);
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
    let _key = (type == "public") ? CryptoJS.enc.Utf8.parse(this.publicKey) : CryptoJS.enc.Utf8.parse(this.privateKey);
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

  getCategories() {
    let url = `${this.url}categories`;
    this.http.post(url, {}).subscribe((data: any) => {
      let c = JSON.parse(this.decrypt(data.data));
      this.store.dispatch(new SetCategorieAction([...c.categlories]))
    }, err => {
      console.log(err)
      // this.presentAlert(err.error.msg);
    })
  }

  getDoctors(data) {
    let url = `${this.url}doctors`;
    this.http.post(url, data).subscribe((data: any) => {
      let doctors = JSON.parse(this.decrypt(data.data, "public"));
      this.store.dispatch(new SetCategorieDoctorsAction([...doctors.doctors]))
      let textTitle = `Hay ${doctors.doctors.length} doctores disponible en esta categoria`;
      this.store.dispatch(new ChangeTitleNav(textTitle));
    }, err => {
      console.log(err)
      // this.presentAlert(err.error.msg);
    })
  }

  getDoctorDetail(data) {
    let url = `${this.url}doctor_details`;
    return this.http.post(url, data);
  }

  getDoctorAppointmentsList(data) {
    let url = `${this.url}doc_appointments_list`;
    return this.http.post(url, data);
  }

  getDoctorTimeList(data) {
    let url = `${this.url}doc_time_slots_list`;
    return this.http.post(url, data);
  }

  getDoctorFee(data) {
    let url = `${this.url}doc_fee`;
    return this.http.post(url, data);
  }

  applyCupon(data) {
    let url = `${this.url}apply_coupon`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers });
  }

  saveBooking(data) {
    let url = `${this.url}save_appointment`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers });
  }

  getBookingList(data) {
    let url = `${this.url}all_appointment`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers });
  }

  getBookinDetail(data) {
    let url = `${this.url}appointment_detail`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers });
  }

  getOTToken(id) {
    let url = `${this.url}create_token/${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.get(url, { headers });
  }

  editProfile(data) {
    let url = `${this.url}edit_profile`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers });
  }

  getChats(data) {
    let url = `${this.url}chats`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers });
  }

  getChatHistory(data) {
    let url = `${this.url}chat_history`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.http.post(url, data, { headers }).subscribe((d: any) => {
      let data = JSON.parse(this.decrypt(d.data, "private"));
      this.store.dispatch(new GetChatHistory([...data.chat_history]))
    }, err => {
      console.log(err)
    });
  }

  saveChat(data) {
    let url = `${this.url}save_chat`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post(url, data, { headers })
  }

}
