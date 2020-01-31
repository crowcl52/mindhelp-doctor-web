import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Categorie } from '../models/categorie.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  doctors = [];
  categories: Categorie[] = [];

  constructor( private store: Store<AppState>, private authService: AuthService ) {
    store.select('categories').subscribe(c => {
      this.categories = c.data;
    });
    store.select('cdoctors').subscribe(cd =>{
      console.log(cd.data)
      this.doctors = cd.data
    })
   }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.goCategorie(5,"cat5");
  }


  goCategorie(id, name){
    this.toogleCard(name);
    let data = {
      cat_id: id,
      time_zone: "Asia/Kolkata"
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

}
