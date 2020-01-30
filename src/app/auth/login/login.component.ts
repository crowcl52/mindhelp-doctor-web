import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  email = "aperezsandid@gmail.com";
  password = "12345678";

  constructor( private authService:AuthService, private store: Store<AppState>, private router: Router ) { }

  ngOnInit() {
    this.store.select('user').subscribe( (data) => {
      console.log(data)
      if(data){
        this.router.navigate(['panel']);
      }
    } )
  }

  login() {

    // [routerLink]="'/app'"

    let user = {"email": (this.email),"password": (this.password),"time_zone": "Asia/Kolkata","role_id": "3"};
    
    let encryptUser = {data: this.authService.encrypt(user)};

    this.authService.login(encryptUser);
  }

}
