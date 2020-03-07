import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import config from '../services/config';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { DeclineModalComponent } from '../ui/decline-modal/decline-modal.component';

@Component({
  selector: 'app-bookin',
  templateUrl: './bookin.component.html',
  styleUrls: ['./bookin.component.scss']
})

export class BookinComponent implements OnInit {

  bookingsUpcoming = [];
  bookingsPast = [];
  today = new Date();

  constructor(private service: AuthService, private router: Router, private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.getBookingsUpcoming("upcoming");
    this.getBookingsPast("past");
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
    this.router.navigate(['/panel/video']);
  }

  acceptBooking(status, app_id){

    let data = {
      status,
      app_id
    };

    if(status == 'declined'){
      this._bottomSheet.open(DeclineModalComponent, {data});

    }else{
      let encData = {data: this.service.encrypt(data,"private") }
      this.service.acceptBooking(encData).subscribe(d => {
        console.log(d)
      },err =>{
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: err.error.msg,
        });
      });
    }
    
  }



}
