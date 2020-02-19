import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import config from '../services/config';

@Component({
  selector: 'app-bookin',
  templateUrl: './bookin.component.html',
  styleUrls: ['./bookin.component.scss']
})

export class BookinComponent implements OnInit {

  bookings = [];
  bookingsUpcoming = [];
  bookingsPast = [];
  today = new Date();

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
    this.getBookings("today");
    this.getBookingsUpcoming("upcoming");
    this.getBookingsPast("past");
  }

  getBookings(type) {
    let data = {
      type,
      time_zone: 'America/Regina'
    }
    this.service.getBookingList(data).subscribe((d: any) => {
      console.log(d.appointments)
      this.bookings = d.appointments;
    }, err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: err.error.msg,
      });
    });

  }

  getBookingsUpcoming(type) {
    let data = {
      type,
      time_zone: 'America/Regina'
    }
    this.service.getBookingList(data).subscribe((d: any) => {
      console.log(d.appointments)
      this.bookingsUpcoming = d.appointments;
    }, err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: err.error.msg,
      });
    });

  }

  getBookingsPast(type) {
    let data = {
      type,
      time_zone: 'America/Regina'
    }
    this.service.getBookingList(data).subscribe((d: any) => {
      console.log(d.appointments)
      this.bookingsPast = d.appointments;
    }, err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: err.error.msg,
      });
    });

  }

  cheackDates(date: string = "") {
    return !(this.today >= new Date(date));
  }

  goSession() {

    this.service.getOTToken(3).subscribe((d: any) => {
      let data = JSON.parse(this.service.decrypt(d.data));
      console.log(data)
      // config.SESSION_ID = data.session_id;
      // config.TOKEN = data.user_token;
      console.log(config)
      this.router.navigate(['/panel/video']);
    }, err => {
      console.log(err)
    })

  }

}
