import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  categorias = [];

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.select('categories').subscribe(d =>{
      this.categorias = d.data;
      console.log(this.categorias)

    })
  }

}
