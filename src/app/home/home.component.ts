import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  bookings = [];

  constructor( private store: Store<AppState>, private authService: AuthService, private router: Router ) {}

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

  ngAfterViewInit(){
  }

  ngOnDestroy(){

  }

}
