import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Categorie } from '../models/categorie.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeTitleNav } from '../redux/ui.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  catSuscription: Subscription = new Subscription();
  docSuscription: Subscription = new Subscription();

  doctors = [];
  categories: Categorie[] = [];
  cat_Id;
  firstModal = true;
  constructor( private store: Store<AppState>, private authService: AuthService, private router: Router ) {
    this.catSuscription = store.select('categories').subscribe(c => {
      this.categories = c.data;
    });
    this.docSuscription = store.select('cdoctors').subscribe(cd =>{
      this.doctors = cd.data;
    })
   }

  ngOnInit() {
  }

  goCategorie(id, name){
    this.cat_Id = id;
    this.toogleCard(name);
    let data = {
      cat_id: id,
      time_zone: 'America/Regina'
    }

    let encryptData = {data : this.authService.encrypt(data, "public")};
    this.authService.getDoctors(encryptData);
  }

  toogleCard(id){
    var sections = document.querySelectorAll('.img-container');
        for (let i = 0; i < sections.length; i++){
          sections[i].classList.remove('active-categori');
        }
    document.querySelector(`#${id}`).classList.add('active-categori');
  }

  bookingNow(id){
    this.router.navigate(['panel/booking-now',id,this.cat_Id]);
  }

  ngOnDestroy(){
    this.catSuscription.unsubscribe();
    this.docSuscription.unsubscribe();
    this.store.dispatch( new ChangeTitleNav( "" ) );

  }

}
