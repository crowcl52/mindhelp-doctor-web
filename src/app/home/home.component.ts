import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import config from '../services/config';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  bookings = [];

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService) { }

  ngOnInit() {
    this.getBookings("today");
  }

  getBookings(type) {
    let data = {
      type,
      time_zone: 'America/Regina'
    }
    this.authService.getBookingList(data).subscribe((d: any) => {
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

  goSession(booking) {
    this.chatService.getOTBooking(booking.id).subscribe((d: any) => {
      if (d.data.items[0].appointmentId) {
        console.log(d.data.items[0])
        config.SESSION_ID = d.data.items[0].session;
        config.TOKEN =  d.data.items[0].doctor_token;
        console.log(config)
        this.router.navigate(['/panel/video']);
      } else {
        this.generateOTToken(booking);
      }
    })

  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  generateOTToken(booking) {

    this.authService.getOTToken(3).subscribe((d: any) => {
      let data = JSON.parse(this.authService.decrypt(d.data));
      console.log(data)
      let dataOT = {
        appointmentId: booking.id,
        userId: booking.user.id,
        doctorId: booking.doctor_details.id,
        session: data.session_id,
        user_token: data.user_token,
        doctor_token: data.doctor_token,
      }
      console.log(dataOT)
      this.chatService.saveOTBooking(dataOT).subscribe(d => {

        config.SESSION_ID = data.session_id;
        config.TOKEN = data.doctor_token;
        this.router.navigate(['/panel/video']);

      }, err => {
        console.log(err)
      });

    }, err => {
      console.log(err)
    })
  }

}
