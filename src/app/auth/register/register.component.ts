import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;

  public registerFG: FormGroup;


  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }


  ngOnInit() {
    this.store.select('user').subscribe( (data) => {
      console.log(data)
      if(data){
        this.router.navigate(['panel']);
      }
    } )
  }

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

    let encryptUSer = { data: this.authService.encrypt(user) }

    // console.log(encryptUSer)
    this.authService.register(encryptUSer);

  }


}
