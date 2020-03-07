import { Component, OnInit, Inject } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-decline-modal',
  templateUrl: './decline-modal.component.html',
  styleUrls: ['./decline-modal.component.scss']
})
export class DeclineModalComponent implements OnInit {

  constructor( 
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, 
    private _bottomSheetRef: MatBottomSheetRef<DeclineModalComponent>,
    private service: AuthService ) { }

  ngOnInit() {
    console.log(this.data)
  }

  response(msg){

    let data = { ...this.data, msg }

    let encData = {data: this.service.encrypt(data,"private") }

    this.service.acceptBooking(encData).subscribe(d => {
      console.log(d)
    },err =>{
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        text: err.error.msg,
      });
    });
    
    this._bottomSheetRef.dismiss();
  }

  closeModal(){
    this._bottomSheetRef.dismiss();
  }
  

}
