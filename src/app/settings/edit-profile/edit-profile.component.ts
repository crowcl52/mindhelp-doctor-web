import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public registerFG: FormGroup;
  hide = true;
  userImg = "";

  constructor( private _formBuilder: FormBuilder ) { }

  ngOnInit() {

    this.registerFG = this._formBuilder.group({
      role_id: ['3', Validators.required],
      first_name: ['Eduardo', Validators.required],
      last_name: ['Sanchez', Validators.required],
      email: ['crowcl52@hotmail.com', Validators.required],
      password: ['12345678', Validators.required],
      country_code: ['+52', Validators.required],
      phone_number: ['3339010165', Validators.required],
      country: ['MX', Validators.required],
      date_of_birth: [new Date(), Validators.required],
      gender: ['Male', Validators.required],
      time_zone: ['Asia/Kolkata', Validators.required],
    });

  }

  register() {

    // let userData = new FormData();
    let date = this.registerFG.value.date_of_birth;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let user = {
      "role_id": (this.registerFG.value.role_id),
      "first_name": (this.registerFG.value.first_name),
      "last_name": (this.registerFG.value.last_name),
      "email": (this.registerFG.value.email),
      "password": (this.registerFG.value.password),
      "country_code": (this.registerFG.value.country_code),
      "phone_number": (this.registerFG.value.phone_number),
      "country": (this.registerFG.value.country),
      "date_of_birth": ( `${day}-${month}-${year}` ),
      "gender": (this.registerFG.value.gender),
      "time_zone": (this.registerFG.value.time_zone)
    }

    console.log(user)
  }

  clickFile(id) {
    document.getElementById(id).click();
  }

  getFile(event) {
    let file = event.target.files[0];
    this.userImg = file;
    let reader = new FileReader();
    reader.onload = this.fileOnload;
    reader.readAsDataURL(file);
  }

  fileOnload(e) {
    let result = e.target.result;
    document.getElementById("imgTag").setAttribute("src", result)
  }

}
