import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


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

  constructor(private service: AuthService) { }

  ngOnInit() {
    this.getBookings("today");
    this.getBookingsUpcoming("upcoming");
    this.getBookingsPast("past");
  }

  getBookings(type) {
    let data = {
      type,
      time_zone: "Asia/Kolkata"
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
      time_zone: "Asia/Kolkata"
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
      time_zone: "Asia/Kolkata"
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

}
