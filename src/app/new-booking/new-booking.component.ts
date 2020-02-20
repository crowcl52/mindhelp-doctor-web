import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit {

  doctorId = "";
  doctorCatId = "";
  minDate = new Date();
  doctorTimeSlots = [];
  doctorDate = "";
  doctorTime = "";
  doctorFee = 0;
  cupon = "";
  cuponText = "";
  cuponValid = false;
  totalFee = 0;
  promo = 0;

  doctor = {
    id: 326,
    email: "",
    first_name: "",
    last_name: "",
    fcm_id: "",
    name: "",
    age: 38,
    profile_image: "",
    profile_image_url: "",
    created_atz: "",
    doctor: {
      id: 144,
      user_id: 326,
      resume: "",
      description: "",
      speciality: "",
      working_since: 15,
      speciality_name: "",
      total_reviews: 0,
      total_star: 0,
      reviews: [],
    }
  }

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private service: AuthService, private router: Router) { }

  ngOnInit() {
    this.doctorId = this.route.snapshot.paramMap.get("id");
    this.doctorCatId = this.route.snapshot.paramMap.get("cat_id");
    this.getDoctorDetail(this.doctorId, this.doctorCatId);
  }

  getDoctorDetail(doc_id, cat_id) {
    let data = {
      doc_id,
      cat_id,
      time_zone: 'America/Regina'
    }

    let encData = { data: this.service.encrypt(data) };
    this.service.getDoctorDetail(encData).subscribe((data: any) => {
      let d = JSON.parse(this.service.decrypt(data.data))
      console.log(d.doctor)
      this.doctor = d.doctor;
    }, err => {
      console.log(err)
      // this.presentAlert(err.error.msg);
    })
  }

  getDate(date) {
    let day = date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate();
    let month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let year = date.getFullYear();
    this.doctorDate = `${year}-${month}-${day}`;

    let data = {
      doc_id: this.doctorId,
      date: this.doctorDate,
      time_zone: 'America/Regina'
    }

    let encData = { data: this.service.encrypt(data) };

    this.service.getDoctorTimeList(encData).subscribe((d: any) => {
      let data = JSON.parse(this.service.decrypt(d.data))
      console.log(data.time_slots)
      this.doctorTimeSlots = data.time_slots;
    }, err => {
      console.log(err)
    });

  }

  getFee() {

    let time = (this.doctorTime.split(" ")[0]) + ":00";
    let date = this.doctorDate + " " + time;

    let data = {
      doc_id: this.doctorId,
      date: date,
      cat_id: this.doctorCatId,
      time_zone: 'America/Regina'
    }

    let encData = { data: this.service.encrypt(data) };

    this.service.getDoctorFee(encData).subscribe((d: any) => {
      let fee = JSON.parse(this.service.decrypt(d.data));
      console.log(fee)
      this.doctorFee = fee.booking.user.doctor.consultation_fee;
      this.totalFee = this.doctorFee;
    }, err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: err.error.msg,
      });
    });

  }

  applyCupon() {

    let data = {
      promo_code: this.cupon,
      speciality_id: this.doctorCatId
    }
    console.log(data)

    let encData = { data: this.service.encrypt(data, "private") };

    this.service.applyCupon(data).subscribe((d: any) => {
      console.log(d)
      this.cuponText = d.msg;
      this.cuponValid = true;

      this.promo = JSON.parse(d.data).calculatePrice;
      console.log(this.promo)

      this.totalFee -= this.promo;

    }, err => {
      console.log(err)
      this.cuponText = err.error.msg;
      this.cuponValid = false;
      this.totalFee = this.doctorFee;
    })

  }

  saveBooking() {
    let time = (this.doctorTime.split(" ")[0]) + ":00";
    let date = this.doctorDate + " " + time;

    let data = {
      doc_id: this.doctorId,
      date,
      orderId: 1,
      promo_code: this.cupon,
      time_zone: 'America/Regina'
    }

    console.log(data)

    let encData = { data: this.service.encrypt(data, "private") };

    this.service.saveBooking(encData).subscribe((d: any) => {
      console.log(d)
      this.router.navigate(['/panel/booking']);
    }, err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: err.error.message,
      });
    });
  }
}
